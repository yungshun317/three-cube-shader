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

    // `step`
    // float copy_uvx = step(v_uv.x, 0.5);
    // gl_FragColor = vec4(copy_uvx, v_uv.y, 1.0, 1.0);

    // `mix`
    // vec3 mixing = mix(vec3(0.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0), v_uv.x);
    // gl_FragColor = vec4(mixing, 1.0);

    // `clamp`
    vec3 color = vec3(1.0, 1.0, 1.0);
    color.r = clamp(v_uv.y, 0.0, 1.0);
    color.g = clamp(v_uv.x, 0.0, 1.0);
    color.b = clamp(v_uv.x, 0.0, 1.0);
    gl_FragColor = vec4(color, 1.0);
}