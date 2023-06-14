precision mediump float;

uniform sampler2D u_texture;

varying vec2 v_uv;

void main() {
    // vec4 texture_ = texture2D(u_texture, v_uv);
    // gl_FragColor = texture_;

    // vec3 color_texture = texture2D(u_texture, v_uv).grb;
    // vec3 color_texture = texture2D(u_texture, v_uv).brg;
    vec2 new_uv = vec2(1.0 - v_uv.x, 1.0 - v_uv.y);
    vec3 color_texture = texture2D(u_texture, new_uv).rgb;
    gl_FragColor = vec4(color_texture, 1.0);
}