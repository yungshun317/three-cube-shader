import "./styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vShader from "./shaders/vertex.glsl";
import fShader from "./shaders/fragment.glsl";

// [1] Scene
const scene = new THREE.Scene();

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
    vertexShader: vShader,
    fragmentShader: fShader
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

// [3] Camera
const aspect = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
camera.position.z = 3;
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

    // Update orbitControls
    orbitControls.update();

    // Renderer
    renderer.render(scene, camera);

    // RequestAnimationFrame
    window.requestAnimationFrame(animate);
}
animate();