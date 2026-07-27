#version 330

#define parallaxIntensity 3.0

uniform mat4 ModelViewMat;
uniform mat4 ProjMat;
uniform vec2 size;
uniform vec2 scrollOffset;
uniform vec2 scrollSize;
uniform float time;
uniform float zoom;

in vec2 texCoord0;
out vec4 fragColor;

uint hash(uint x) {
    x += (x << 10u);
    x ^= (x >> 6u);
    x += (x << 3u);
    x ^= (x >> 11u);
    x += (x << 15u);
    return x;
}
uint hash(uvec2 v) { return hash(v.x ^ hash(v.y)); }

float floatConstruct(uint m) {
    const uint ieeeMantissa = 0x007FFFFFu;
    const uint ieeeOne = 0x3F800000u;
    m &= ieeeMantissa;
    m |= ieeeOne;
    float f = uintBitsToFloat(m);
    return f - 1.0;
}

float random(vec2 v) { return floatConstruct(hash(floatBitsToUint(v))); }
vec2 random2(vec2 v) {
    return vec2(
        floatConstruct(hash(floatBitsToUint(v))),
        floatConstruct(hash(floatBitsToUint(v * 2.0)))
    ) * 2.0 - 1.0;
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(dot(random2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
            dot(random2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
        mix(dot(random2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
            dot(random2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
        u.y
    ) * 0.40 + 0.02;
}

float fbm(vec2 p) {
    float value = 0.0;
    float amp = 0.5;
    float freq = 1.0;
    for (int i = 0; i < 5; i++) {
        value += amp * noise(p * freq);
        amp *= 0.5;
        freq *= 2.0;
    }
    return value * 0.5 + 0.5;
}

void main() {
    vec2 uv = texCoord0;

    float aspect = size.x / size.y;
    vec2 aspect_uv = uv;
    aspect_uv.x *= aspect;

    vec2 scrollPos = vec2(0.0);
    if (scrollSize.x > 0.0) scrollPos.x = scrollOffset.x / scrollSize.x;
    if (scrollSize.y > 0.0) scrollPos.y = scrollOffset.y / scrollSize.y;

    vec3 bgColor = mix(
        vec3(0.06, 0.02, 0.15),
        vec3(0.12, 0.04, 0.26),
        uv.y * 0.8 + 0.2
    );
    fragColor = vec4(bgColor, 1.0);

    float t = time * 0.005;

    vec2 centerPos = aspect_uv - 0.5;
    float radius = length(centerPos);
    float angle = atan(centerPos.y, centerPos.x);

    float rotStrength = 3.0 + radius * 2.0;
    float cosA = cos(rotStrength);
    float sinA = sin(rotStrength);

    vec2 rotPos = vec2(
        centerPos.x * cosA - centerPos.y * sinA,
        centerPos.x * sinA + centerPos.y * cosA
    );

    vec2 spiralCoord = rotPos * 1.5 + vec2(t * 0.3, t * 0.2) - radius * 1.0;

    float spiral = fbm(spiralCoord);
    spiral = smoothstep(0.3, 0.7, spiral);

    float ringDist = radius;
    float ringWave = sin(ringDist * 20.0 - t * 2.0) * 0.5 + 0.5;
    float ringFade = 1.0 - exp(-ringDist * 8.0);
    float ring = ringFade * ringWave * 0.14;

    vec2 dustUv = aspect_uv * 2.5 + vec2(t * 0.2, t * 0.1);
    float dust1 = fbm(dustUv + vec2(1.3, 2.7));
    float dust2 = fbm(dustUv * 1.7 - vec2(0.5, 1.3) + vec2(t * 0.15, 0.0));
    float dust = (dust1 * 0.6 + dust2 * 0.4) * 0.5;

    float glow1 = exp(-pow(radius - 0.15, 2.0) * 80.0) * 0.55;
    float glow2 = exp(-pow(radius - 0.35, 2.0) * 100.0) * 0.35;
    float glow3 = exp(-pow(radius - 0.55, 2.0) * 120.0) * 0.20;

    float pulse = sin(t * 0.5) * 0.15 + 0.85;

    vec3 colorSpiral = vec3(0.9, 0.3, 0.9) * spiral * 0.45 * pulse;
    vec3 colorRing = vec3(0.4, 0.2, 0.9) * ring * 0.55;
    vec3 colorDust = mix(
        vec3(0.8, 0.2, 0.8),
        vec3(0.3, 0.1, 0.8),
        dust
    ) * dust * 0.35;

    vec3 colorGlow1 = vec3(1.0, 0.4, 1.0) * glow1 * 0.65;
    vec3 colorGlow2 = vec3(0.5, 0.3, 1.0) * glow2 * 0.55;
    vec3 colorGlow3 = vec3(0.9, 0.2, 0.8) * glow3 * 0.45;

    vec3 nebula = colorSpiral + colorRing + colorDust + colorGlow1 + colorGlow2 + colorGlow3;
    fragColor += vec4(nebula, 0.0);

    for (int i = 0; i < 5; i++) {
        float fi = float(i);
        float rad = 0.08 + fi * 0.09 + 0.05 * sin(t * 0.3 + fi * 1.2);
        float ang = t * (0.2 + fi * 0.05) + fi * 1.8;
        vec2 pos = vec2(0.5 + rad * cos(ang), 0.5 + rad * sin(ang) * 0.6);
        pos += scrollPos * 0.03;

        float sz = 0.04 + 0.02 * sin(t * 0.5 + fi * 2.0);
        float g = exp(-pow(length(aspect_uv - pos), 2.0) / (sz * sz));
        float bright = 0.3 + 0.7 * (sin(t * 0.4 + fi * 1.3) * 0.5 + 0.5);

        vec3 col = mix(
            vec3(0.9, 0.2, 0.9),
            vec3(0.3, 0.2, 1.0),
            sin(fi * 0.7 + t * 0.2) * 0.5 + 0.5
        );
        fragColor += vec4(col * g * bright * 0.55, 0.0);
    }

    vec4 stars = vec4(0.0);
    for (float starsize = 4.0; starsize > 0.0; starsize -= 0.5) {
        float cellsize = starsize * 120.0;
        float ratio = starsize / cellsize;

        float c1 = random(vec2(starsize)) * 500.0;
        float c2 = 40.0 * starsize + 20.0;

        vec2 coord = uv * size + vec2(c1, c1) + (scrollPos * vec2(c2, c2) * parallaxIntensity);
        vec2 luv = mod(coord, cellsize) / cellsize;
        vec2 cell = floor(coord / cellsize);

        float r1 = random(cell + vec2(1.0));
        float r2 = random(cell);

        vec2 col = luv - clamp(vec2(r1, r2), ratio, 1.0 - ratio);
        col /= max(ratio * 0.7, 0.001);
        float lensq = dot(col, col);
        float core = exp(-lensq);
        float glow = 1.0 / (1.0 + lensq);
        float intensity = core + 0.3 * glow;

        float colorSeed = random(cell + vec2(0.5));
        vec3 starColor = mix(
            vec3(1.0, 0.9, 1.0),
            mix(
                vec3(0.6, 0.8, 1.0),
                vec3(1.0, 0.7, 0.9),
                colorSeed
            ),
            0.5
        );

        float twinkle = sin(time * 0.9 + cell.x * 73.0 + cell.y * 51.0 + starsize * 31.0) * 0.5 + 0.5;
        twinkle = twinkle * twinkle * twinkle;
        intensity *= (0.1 + 0.9 * twinkle);

        stars += vec4(starColor * intensity, 1.0);
    }
    fragColor += stars * 0.95;

    float meteor = 0.0;
    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        float meteorTime = fract(time * 0.02 + fi * 0.3);

        float startX = 0.1 + fi * 0.3;
        float startY = 0.1 + fi * 0.2;
        float speed = 0.6 + fi * 0.1;

        vec2 meteorPos = vec2(
            startX + meteorTime * speed * 0.5,
            startY + meteorTime * speed * 0.3
        );

        float trailLength = 0.08;
        float distToMeteor = length(aspect_uv - meteorPos);
        float trail = exp(-distToMeteor * distToMeteor / (trailLength * trailLength));

        float fadeIn = smoothstep(0.0, 0.1, meteorTime);
        float fadeOut = 1.0 - smoothstep(0.7, 1.0, meteorTime);
        float meteorAlpha = fadeIn * fadeOut;

        meteor += trail * meteorAlpha * 0.55;
    }
    fragColor += vec4(vec3(1.0, 0.9, 1.0) * meteor, 0.0);

    vec2 vigUV = texCoord0 - 0.5;
    float vig = 1.0 - dot(vigUV, vigUV) * 1.0;
    vig = max(vig, 0.0);
    fragColor *= vec4(vec3(vig * 0.55 + 0.45), 1.0);

    fragColor = mix(fragColor, fragColor * vec4(0.95, 0.85, 1.0, 1.0), 0.15);

    float bloom = max(max(fragColor.r, fragColor.g), fragColor.b);
    vec3 bloomColor = vec3(0.3, 0.2, 0.5) * bloom * bloom * 0.25;
    fragColor += vec4(bloomColor, 0.0);
}