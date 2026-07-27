#ifdef CQA_RENDER_PIPELINE
layout(std140) uniform Globals {
    ivec3 CameraBlockPos;
    vec3 CameraOffset;
    vec2 ScreenSize;
    float GlintAlpha;
    float GameTime;
    int MenuBlurRadius;
    int UseRgss;
};

in vec4 vertexColor;

vec2 cqaLocalSize() {
    float width = abs(dFdx(texCoord0.x)) > 0.000001 ? 1.0 / abs(dFdx(texCoord0.x)) : ScreenSize.x;
    float height = abs(dFdy(texCoord0.y)) > 0.000001 ? 1.0 / abs(dFdy(texCoord0.y)) : ScreenSize.y;
    return vec2(width, height);
}

#define size cqaLocalSize()
#define scrollOffset vertexColor.rg
#define scrollSize vec2(1.0)
#define time (GameTime * 1200.0)
#define zoom (4.0 + vertexColor.b * 24.0)
#else
uniform mat4 ModelViewMat;
uniform mat4 ProjMat;
uniform vec2 size;
uniform vec2 scrollOffset;
uniform vec2 scrollSize;
uniform float time;
uniform float zoom;
#endif
