precision mediump float;

varying vec2 v_uv;
varying vec3 v_position;

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
    /*
    vec3 color = vec3(1.0, 1.0, 1.0);
    color.r = step(0.0, v_position.x);
    color.g = step(0.0, v_position.y);
    gl_FragColor = vec4(color, 1.0);
    */

    // `smoothstep`
    /*
    vec3 color = vec3(1.0, 1.0, 1.0);
    color.r = smoothstep(0.0, 0.04, v_position.x);
    color.g = smoothstep(0.0, 0.04, v_position.y);
    gl_FragColor = vec4(color, 1.0);
    */

    // `mix`
    // vec3 mixing = mix(vec3(0.0, 0.0, 1.0), vec3(0.0, 1.0, 0.0), v_uv.x);
    // gl_FragColor = vec4(mixing, 1.0);

    // `clamp`
    /*
    vec3 color = vec3(1.0, 1.0, 1.0);
    color.r = clamp(v_uv.y, 0.0, 1.0);
    color.g = clamp(v_uv.x, 0.0, 1.0);
    color.b = clamp(v_uv.x, 0.0, 1.0);
    gl_FragColor = vec4(color, 1.0);
    */

    // `mod`
    // vec3 color = vec3(1.0, 1.0, 1.0);
    // float mod_ = mod(v_uv.y * 5.0, 1.0);
    // gl_FragColor = vec4(mod_, mod_, mod_, 1.0);

    // `length`
    // gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    // float vector_length = length(vec2(0.4, 0.3));
    // gl_FragColor.r = vector_length;

    // `distance`
    float distance_ = distance(v_uv, vec2(0.5));
    gl_FragColor = vec4(distance_, distance_, distance_, 1.0);
}