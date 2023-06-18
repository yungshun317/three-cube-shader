import "./styles.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vShader from "./shaders/vertex.glsl";
import fShader from "./shaders/fragment.glsl";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { LuminosityShader } from "three/examples/jsm/shaders/LuminosityShader";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader";
import * as dat from "dat.gui";

// [1] Scene
const scene = new THREE.Scene();

// GUI
const gui = new dat.GUI();

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.position.z = 2;
scene.add(ambientLight, directionalLight);

// Environment map
const cubeTextureLoader = new THREE.CubeTextureLoader();
const envTexture = cubeTextureLoader.load([
    "/static/textures/cube-images/px.png",
    "/static/textures/cube-images/nx.png",
    "/static/textures/cube-images/py.png",
    "/static/textures/cube-images/ny.png",
    "/static/textures/cube-images/pz.png",
    "/static/textures/cube-images/nz.png",
]);
scene.background = envTexture;

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
const geometry = new THREE.SphereGeometry(0.8, 32, 32);
console.log(geometry);
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.1;
material.envMap = envTexture;
console.log(material);
const mesh = new THREE.Mesh(geometry, material);
mesh.position.z = -1.6;
scene.add(mesh);

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
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(aspect.width, aspect.height);

// `EffectComposer`
const effectComposer = new EffectComposer(renderer);
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
effectComposer.setSize(aspect.width, aspect.height);

// `RenderPass`
const renderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);

// Passes
// `UnrealBloomPass`
/*
const unrealBloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight)
);
unrealBloomPass.strength = 0.35;
unrealBloomPass.radius = 0.0;
unrealBloomPass.threshold = 0.45;
unrealBloomPass.enabled = false;
effectComposer.addPass(unrealBloomPass);
gui.add(unrealBloomPass, "strength").min(0.0).max(1.0).step(0.001);
gui.add(unrealBloomPass, "threshold").min(0.0).max(1.0).step(0.001);
gui.add(unrealBloomPass, "enabled");
*/

// `GlitchPass`
/*
const glitchPass = new GlitchPass();
effectComposer.addPass(glitchPass);
*/

// `DotScreenPass`
/*
const dotScreenPass = new DotScreenPass();
effectComposer.addPass(dotScreenPass);
*/

// `FilmPass`
/*
const filmPass = new FilmPass();
effectComposer.addPass(filmPass);
*/

// `AfterimagePass`
/*
const afterimagePass = new AfterimagePass();
effectComposer.addPass(afterimagePass);
*/

// `LuminosityShader`
/*
const luminosityShader = new ShaderPass(LuminosityShader);
effectComposer.addPass(luminosityShader);
*/

// `RGBShiftShader`
/*
const rgbShiftShader = new ShaderPass(RGBShiftShader);
effectComposer.addPass(rgbShiftShader)
*/

// Custom Pass
const customShader = {
    uniforms: {
        tDiffuse: { value: null }
    },
    vertexShader: vShader,
    fragmentShader: fShader
}
const customPass = new ShaderPass(customShader);
effectComposer.addPass(customPass);

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
    // renderer.render(scene, camera);
    effectComposer.render();

    // RequestAnimationFrame
    window.requestAnimationFrame(animate);
}
animate();