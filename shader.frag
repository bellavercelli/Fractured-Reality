#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D uTexture;
uniform sampler2D uScratch;
uniform float uTime;

varying vec2 vTexCoord;

void main() {
    vec2 uv = vTexCoord;

    vec2 uvFlipped = vec2(uv.x, 1.0 - uv.y);

    float mask = 1.0 - texture2D(uScratch, uvFlipped).a;

    vec2 glitchOffset = vec2(sin(uTime*10.0)*0.005, cos(uTime*10.0)*0.005);

    vec4 rQR = texture2D(uTexture, uv + glitchOffset);
    vec4 gQR = texture2D(uTexture, uv);
    vec4 bQR = texture2D(uTexture, uv - glitchOffset);

    vec4 qrColor = vec4(rQR.r, gQR.g, bQR.b, 1.0);

    vec4 topColor = texture2D(uScratch, uvFlipped);

    vec2 textOffset = vec2(sin(uTime*15.0)*0.003, 0.0);
    vec4 rText = texture2D(uScratch, uvFlipped + textOffset);
    vec4 gText = texture2D(uScratch, uvFlipped);
    vec4 bText = texture2D(uScratch, uvFlipped - textOffset);
    vec4 textColor = vec4(rText.r, gText.g, bText.b, topColor.a);

    gl_FragColor = mix(textColor, qrColor, mask);
}