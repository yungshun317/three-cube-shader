precision mediump float;

varying vec2 v_uv;

void main() {
    /*
    vec2 copy_uv = v_uv;

    if (copy_uv.x > 0.5) {
        copy_uv.x = 0.0;
    } else {
        copy_uv.x = 1.0;
    }

    gl_FragColor = vec4(copy_uv, 1.0, 1.0);
    */

    float copy_uvx = step(v_uv.x, 0.5);
    gl_FragColor = vec4(copy_uvx, v_uv.y, 1.0, 1.0);
}