import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg'); 
const doorAmbientTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg'); 
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg'); 
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg'); 
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg'); 
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg'); 
const matcapTextures = textureLoader.load('./textures/matcaps/1.jpg'); 
const gradientTextures = textureLoader.load('./textures/gradients/3.jpg'); 

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
matcapTextures.colorSpace = THREE.SRGBColorSpace;


 

/**
 * Mesh group
 */
const meshGroup = new THREE.Group();
/**
 * Objects
 */
// Material
// const material = new THREE.MeshBasicMaterial();
// material.map= doorColorTexture;
// material.color = new THREE.Color("green");
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.side  = THREE.DoubleSide

// Mesh Normal material
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

const material = new THREE.MeshMatcapMaterial()
material.flatShading = true

const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), material);
sphere.position.x = -3;
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 2), material);
const tours = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
);
tours.position.x = 1.5;
meshGroup.add(sphere);
meshGroup.add(plane);
meshGroup.add(tours);





scene.add(meshGroup);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  tours.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = -0.15 * elapsedTime;
  plane.rotation.x = -0.15 * elapsedTime;
  tours.rotation.y = -0.15 * elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
