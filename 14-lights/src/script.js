import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


const CANVAS_SIZE = {
  WIDTH: window.innerWidth,
  HEIGHT: window.innerHeight,
};

const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  CANVAS_SIZE.WIDTH / CANVAS_SIZE.HEIGHT
);
camera.position.z = 5;
camera.position.y = 1.5;
scene.add(camera);

// Cointols
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Light
// Ambient Light
const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

// Directional Light
const directionalLight= new THREE.DirectionalLight(0x00fffc, 3);
scene.add(directionalLight);

// Hemisphere light
const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 3);
scene.add(hemisphereLight);

// Point light
const pointLight = new THREE.PointLight(0xff9000, 1.5)
scene.add(pointLight);

// React area light
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 0.5)
scene.add(rectAreaLight);

// Spot light
const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight);


// Camera helpers 
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

// Object
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);
scene.add(sphere, cube, torus, plane);


const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);

renderer.render(scene, camera);

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // Update controls
  controls.update();

  camera.aspect = CANVAS_SIZE.WIDTH / CANVAS_SIZE.HEIGHT;
  camera.updateProjectionMatrix();

  // Update object
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("resize", () => {
  CANVAS_SIZE.WIDTH = window.innerWidth;
  CANVAS_SIZE.HEIGHT = window.innerHeight;

  renderer.setSize(CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
  renderer.render(scene, camera);
});
