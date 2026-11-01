#version 330
uniform mat4 ModelViewMat;
uniform mat4 ProjMat;
uniform vec2 size;
uniform vec2 scrollOffset;
uniform vec2 scrollSize;
uniform float time;
uniform float zoom;
in vec2 texCoord0;
out vec4 fragColor;
#define BACKGROUND_GAIN 1.25
#define GEAR_SPEED      0.020
float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}
vec2 hash22(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.xx + p3.yz) * p3.zy);
}
float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash12(i + vec2(0.0, 0.0)), hash12(i + vec2(1.0, 0.0)), u.x),
        mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}
float fbm2(vec2 p) {
    float v = 0.5 * vnoise(p)
            + 0.25 * vnoise(mat2(0.80, 0.60, -0.60, 0.80) * p * 2.03 + 17.7);
    return v / 0.75;
}
vec2 normalizedScroll() {
    vec2 s = vec2(0.0);
    if (scrollSize.x > 0.0) s.x = scrollOffset.x / scrollSize.x;
    if (scrollSize.y > 0.0) s.y = scrollOffset.y / scrollSize.y;
    return s;
}
mat2 rot2(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, s, -s, c);
}
float magicCircle(vec2 p, vec2 c, float R, float rot, float aa) {
    vec2 d = p - c;
    float r = length(d);
    float a = atan(d.y, d.x) + rot;
    float ring1 = exp(-pow((r - R) / aa, 2.0));
    float ring2 = exp(-pow((r - R * 0.86) / (aa * 1.4), 2.0)) * 0.55;
    float tick = smoothstep(0.86, 0.98, abs(cos(a * 96.0)));
    float band = smoothstep(R * 0.90, R * 0.91, r)
               * smoothstep(R * 0.99, R * 0.98, r);
    float ticks = tick * band * 0.30;
    float runeCell = floor(a / 6.2831853 * 72.0);
    float rune = step(0.86, hash12(vec2(runeCell, R * 97.0)))
               * smoothstep(R * 0.91, R * 0.92, r)
               * smoothstep(R * 0.945, R * 0.935, r) * 0.20;
    return ring1 + ring2 + ticks + rune;
}
vec3 crystal(vec2 p, vec2 c, float w, float h, float rot, vec3 tint) {
    vec2 d = rot2(-rot) * (p - c);
    d.x /= w;
    d.y /= h;
    float diamond = abs(d.x) + abs(d.y);
    float body = smoothstep(1.0, 0.90, diamond);
    float rim  = exp(-pow((diamond - 1.0) * 11.0, 2.0));
    float inner = exp(-diamond * diamond * 2.2);
    float halo = exp(-diamond * diamond * 0.7);
    float facet = exp(-pow(d.x * 5.0, 2.0)) * body * 0.22;
    return tint * (body * 0.055 + rim * 0.30 + inner * 0.045 + facet * 0.14 + halo * 0.022);
}
vec3 emberLayer(vec2 p, float scale, float seed, float speed,
                float radius, float brightness) {
    vec2 sp = p * scale + vec2(seed, -time * speed)
            + normalizedScroll() * 0.006 * scale;
    vec2 cell = floor(sp);
    vec2 f = fract(sp) - 0.5;
    float h = hash12(cell + seed);
    float presence = step(0.90, h);
    vec2 offset = (hash22(cell + seed * 1.7) - 0.5) * 0.7;
    vec2 d = f - offset;
    float rr = radius * (0.55 + 0.9 * fract(h * 57.3));
    float glow = exp(-dot(d, d) / (rr * rr));
    float heightFade = smoothstep(0.55, -0.42, p.y);
    float twinkle = 0.78 + 0.22 * sin(time * 2.1 + h * 39.0);
    vec3 tint = mix(vec3(1.0, 0.42, 0.72), vec3(0.82, 0.55, 1.0), fract(h * 7.3));
    return tint * glow * presence * heightFade * twinkle * brightness;
}
void main() {
    vec2 uv = vec2(texCoord0.x, 1.0 - texCoord0.y);
    float aspect = size.x / size.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    vec2 scroll = normalizedScroll();
    vec3 col = mix(vec3(0.035, 0.010, 0.050),
                   vec3(0.012, 0.006, 0.022),
                   smoothstep(-0.4, 0.7, p.y));
    col += vec3(0.030, 0.008, 0.040) * smoothstep(0.4, -0.7, p.y);
    col += vec3(0.020, 0.030, 0.075) * smoothstep(-0.2, 0.75, p.y);
    vec2 smokeUV = vec2(p.x * 1.25, p.y * 1.8) + vec2(0.0, -time * 0.006);
    float smoke = fbm2(smokeUV + vec2(2.7, 1.3));
    float smoke2 = fbm2(p * 2.6 + vec2(-1.4, 4.1) + time * 0.003);
    col += vec3(0.10, 0.030, 0.13) * pow(smoke, 2.2) * 0.55;
    col += vec3(0.16, 0.045, 0.15) * pow(smoke2, 3.0) * 0.35
         * smoothstep(0.5, -0.6, p.y);
    vec2 fpos = vec2(-0.06, -0.62);
    float fd = length((p - fpos) * vec2(1.0, 1.45));
    float furnace = exp(-fd * 2.4);
    float furnaceWide = exp(-fd * 0.85);
    col += vec3(0.95, 0.32, 0.62) * furnace * 0.34;
    col += vec3(0.50, 0.14, 0.50) * furnaceWide * 0.22;
    col += vec3(0.22, 0.06, 0.26) * exp(-fd * 0.45) * 0.10;
    float pool = exp(-pow((p.y + 0.62) * 7.5, 2.0))
               * exp(-pow((p.x + 0.06) * 1.5, 2.0));
    col += vec3(1.0, 0.38, 0.66) * pool * 0.16;
    float seam = exp(-pow((p.y + 0.665) * 38.0, 2.0))
               * exp(-pow((p.x + 0.06) * 0.75, 2.0));
    col += vec3(1.0, 0.45, 0.72) * seam * 0.30;
    float shaft = exp(-abs(p.x + 0.06) * 2.2)
                * smoothstep(0.25, -0.65, p.y)
                * (0.55 + 0.45 * fbm2(vec2(p.x * 4.0, p.y * 2.0 - time * 0.02)));
    col += vec3(0.55, 0.16, 0.42) * shaft * 0.10;
    float starFade = smoothstep(-0.45, 0.15, p.y);
    vec2 ssp = p;
    vec3 stars = vec3(0.0);
    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        float scale = 120.0 + fi * 70.0;
        vec2 sp = ssp * scale + fi * 37.0 + normalizedScroll() * (0.004 + fi * 0.006) * scale;
        vec2 cell = floor(sp);
        vec2 f = fract(sp) - 0.5;
        float h = hash12(cell + fi * 11.0);
        float thresh = (i == 0) ? 0.734 : 0.62;
        float presence = step(thresh, h);
        vec2 off = (hash22(cell + fi * 5.0) - 0.5) * 0.72;
        vec2 d = f - off;
        float rr = (0.05 - fi * 0.008) * (0.7 + 0.6 * fract(h * 43.0));
        float core = exp(-dot(d, d) / (rr * rr));
        float tw = 0.8 + 0.2 * sin(time * 0.7 + h * 51.0);
        stars += vec3(0.86, 0.82, 1.0) * core * presence * tw * (0.06 + 0.5 * h * h * h);
    }
    col += stars * starFade * 0.55;
    {
        vec2 c = vec2(0.0, -0.68);
        float m = magicCircle(p, c, 0.58, time * 0.012, 0.0018);
        col += mix(vec3(0.75, 0.30, 0.55), vec3(0.55, 0.35, 0.85),
                   smoothstep(-0.4, 0.4, p.y)) * m * 0.065;
    }
    {
        vec2 c = vec2(-0.47, 0.33);
        float m = magicCircle(p, c, 0.28, -time * 0.020, 0.0014);
        col += mix(vec3(0.70, 0.32, 0.58), vec3(0.50, 0.35, 0.88),
                   smoothstep(0.0, 0.6, p.y)) * m * 0.050;
    }
    {
        vec2 c = vec2(0.60, -0.12);
        float m = magicCircle(p, c, 0.16, time * 0.028, 0.0012);
        col += vec3(0.62, 0.32, 0.82) * m * 0.040;
    }
    {
        vec3 t = vec3(1.00, 0.48, 0.76);
        col += crystal(p, vec2(-0.50, 0.16 + 0.010 * sin(time * 0.42 + 0.5)),
                       0.030, 0.088, 0.32, t);
    }
    {
        vec3 t = vec3(0.78, 0.58, 1.00);
        col += crystal(p, vec2(0.44, 0.16 + 0.013 * sin(time * 0.36 + 2.1)),
                       0.024, 0.070, -0.22, t);
    }
    {
        vec3 t = vec3(1.00, 0.62, 0.86);
        col += crystal(p, vec2(-0.26, 0.36 + 0.008 * sin(time * 0.50 + 4.0)),
                       0.017, 0.046, 0.58, t);
    }
    {
        vec3 t = vec3(0.72, 0.52, 1.00);
        col += crystal(p, vec2(0.18, 0.40 + 0.007 * sin(time * 0.46 + 1.2)),
                       0.014, 0.038, -0.42, t);
    }
    {
        vec3 t = vec3(1.00, 0.42, 0.70);
        col += crystal(p, vec2(0.30, -0.30 + 0.009 * sin(time * 0.40 + 3.2)),
                       0.022, 0.060, 0.14, t);
    }
    {
        vec3 t = vec3(0.84, 0.60, 1.00);
        col += crystal(p, vec2(-0.36, -0.18 + 0.011 * sin(time * 0.38 + 5.0)),
                       0.020, 0.055, -0.55, t);
    }
    {
        vec3 t = vec3(1.00, 0.55, 0.82);
        col += crystal(p, vec2(-0.66, -0.02 + 0.008 * sin(time * 0.44 + 2.7)),
                       0.016, 0.044, 0.40, t);
    }
    {
        vec3 t = vec3(0.78, 0.55, 1.00);
        col += crystal(p, vec2(0.57, -0.28 + 0.010 * sin(time * 0.34 + 0.9)),
                       0.016, 0.042, -0.30, t);
    }
    {
        vec2 d = p - vec2(0.0, -0.52);
        float rr = length(d) - 0.66;
        float ring = exp(-rr * rr * 900.0);
        col += vec3(0.35, 0.12, 0.40) * ring * 0.05;
    }
    col += emberLayer(p, 26.0, 13.0, 0.030, 0.060, 1.00);
    col += emberLayer(p, 9.0, 41.0, 0.022, 0.030, 1.20);
    col += emberLayer(p, 15.0, 71.0, 0.018, 0.075, 0.75);
    vec2 v = (uv - 0.5) * vec2(aspect * 0.84, 1.0);
    float vig = 1.0 - smoothstep(0.28, 0.95, length(v));
    col *= mix(0.46, 1.0, vig);
    col *= BACKGROUND_GAIN;
    col += (hash12(gl_FragCoord.xy) - 0.5) * (1.0 / 255.0);
    fragColor = vec4(max(col, 0.0), 1.0);
}
