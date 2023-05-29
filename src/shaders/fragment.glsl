precision mediump float;
uniform vec3 u_color;
uniform float u_timecolor;
uniform vec2 u_cursorcolor;

void main() {
    gl_FragColor = vec4(u_color, 1.0);

    // Change color depending on `elapsedTime`
    gl_FragColor.r = 1.0 + sin(u_timecolor);
    gl_FragColor.g = cos(u_timecolor);
    gl_FragColor.b = -sin(u_timecolor);
}