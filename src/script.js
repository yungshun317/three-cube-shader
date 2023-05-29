import "./styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vShader from "./shaders/vertex.glsl";
import fShader from "./shaders/fragment.glsl";

// [1] Scene
const scene = new THREE.Scene();

// Cursor
const cursor = {
    x: 0, y: 0
};
window.addEventListener("mouseover", (e) => {
   cursor.x = e.clientX / window.innerWidth;
   cursor.y = e.clientY / window.innerHeight;
});

// Responsive
window.addEventListener("resize", () => {
    // Update size
    aspect.width = window.innerWidth;
    aspect.height = window.innerHeight;

    // New aspect ratio
    camera.aspect = aspect.width / aspect.height;
    camera.updateProjectionMatrix();

    // New render size
    renderer.setSize(aspect.width, aspect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

// [2] Mesh
const geometry = new THREE.PlaneGeometry(0.75, 0.75, 64, 64);
console.log(geometry);
const material = new THREE.RawShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader: vShader,
    fragmentShader: fShader,
    uniforms: {
        u_amplitude: { value: 12.0 },
        u_time: { value: 0.0 },
        u_color: { value: new THREE.Color("purple") },
        u_timecolor: { value: 0 },
        u_cursorcolor: { value: new THREE.Vector2(cursor.x, cursor.y) }
    }
});
console.log(material);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Attribute
const amount = geometry.attributes.position.count;
const newAttributeArray = new Float32Array(amount);
for (let i = 0; i < amount; i++) {
    newAttributeArray[i] = Math.random();
}
geometry.setAttribute(
    "a_modulus",
    new THREE.BufferAttribute(newAttributeArray, 1)
);
console.log(newAttributeArray);

// [3] Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 1;
scene.add(camera);

// [4] Renderer
const canvas = document.querySelector("#draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(aspect.width, aspect.height);

// OrbitControls
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

// Clock
const clock = new THREE.Clock();

const animate = () => {
    // GetElapsedTime
    const elapsedTime = clock.getElapsedTime();

    // Update `u_time`
    material.uniforms.u_time.value = elapsedTime;

    // Update `u_timecolor`
    material.uniforms.u_timecolor.value = elapsedTime;

    // Update `u_cursorcolor`
    material.uniforms.u_cursorcolor.value.x = cursor.x;
    material.uniforms.u_cursorcolor.value.y = cursor.y;

    // Update orbitControls
    orbitControls.update();

    // Renderer
    renderer.render(scene, camera);

    // RequestAnimationFrame
    window.requestAnimationFrame(animate);
}
animate();