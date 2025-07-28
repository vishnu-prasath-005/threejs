import * as THREE from "three";
import GUI from "lil-gui";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const CANVAS_SIZE = {
  WIDTH: window.innerWidth,
  HEIGHT: window.innerHeight,
};
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  CANVAS_SIZE.WIDTH / CANVAS_SIZE.HEIGHT,
  0.1,
  100
);
camera.position.z = 4;
scene.add(camera);

// Texture loader
const textureLoader = new THREE.TextureLoader();

// Object
// const material = new THREE.MeshBasicMaterial();
// const geometry = new THREE.SphereGeometry(0.5);
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh)

// Font
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const texture = textureLoader.load("/textures/matcaps/8.png", () => {
    console.log("laoded");
  });

  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshMatcapMaterial({ matcap: texture });

  const textGeometry = new TextGeometry("Hello vishnu", {
    font,
    size: 1,
    depth: 0.2,
    bevelEnabled: true,
    curveSegments: 6,
    bevelOffset: 0,
    bevelSegments: 5,
    bevelThickness: 0.03,
    bevelSize: 0.02,
  });

  const text = new THREE.Mesh(textGeometry, material);
  textGeometry.center();

  scene.add(text);

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64);

  for (let initial = 0; initial < 200; initial++) {
    const donut = new THREE.Mesh(donutGeometry, material);

    // Position of the Object
    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;

    // Motion of the object
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();

    // Size of the object
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
});

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();

// Event listeners
// Resize
window.addEventListener("resize", () => {
  CANVAS_SIZE.WIDTH = window.innerWidth;
  CANVAS_SIZE.HEIGHT = window.innerHeight;

  camera.aspect = CANVAS_SIZE.WIDTH / CANVAS_SIZE.HEIGHT;
  camera.updateProjectionMatrix();

  renderer.setSize(CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
