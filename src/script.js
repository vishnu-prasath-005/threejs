import * as THREE from "three";
import GUI from "lil-gui";
import gsap from "gsap";

const CANVAS_SIZE = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const CURSOR = {
  x: 0,
  y: 0,
};

// Canvas
const canvas = document.getElementById("webgl");

// Lil Gui
const gui = new GUI();
const debugObject = {};
debugObject.color = "red";
debugObject.spin = () => {
  gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 });
};
debugObject.rotate = false;
debugObject.rotation = () => {
  debugObject.rotate = !debugObject.rotate;
};

gui.addColor(debugObject, "color").onChange(() => {
  material.color.set(debugObject.color);
});

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  CANVAS_SIZE.width / CANVAS_SIZE.height
);

camera.position.z = 4;

// Object
const material = new THREE.MeshBasicMaterial({ color: debugObject.color });
const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
scene.add(mesh);
scene.add(camera);

// gui.add(mesh.position, "x").min(0).max(10).step(1).name("x");
// gui.add(mesh.position, "y").min(0).max(10).step(1).name("y");
// gui.add(mesh.position, "z").min(0).max(10).step(1).name("z");

gui.add(debugObject, "spin");

gui.add(debugObject, "rotation");

// Controls
// const controls = new OrbitControls(camera, canvas)
// camera.lookAt(mesh.position)

// Render
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(CANVAS_SIZE.width, CANVAS_SIZE.height);
renderer.render(scene, camera);

// Event listeners

// Resize
window.addEventListener("resize", () => {
  CANVAS_SIZE.width = window.innerWidth;
  CANVAS_SIZE.height = window.innerHeight;

  // Update camera
  camera.aspect = CANVAS_SIZE.width / CANVAS_SIZE.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(CANVAS_SIZE.width, CANVAS_SIZE.height);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Mouse movement
window.addEventListener("mousemove", (event) => {
  CURSOR.x = -(event.clientX / CANVAS_SIZE.width - 0.5);
  CURSOR.y = event.clientY / CANVAS_SIZE.width - 0.5;
});

// Clock
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  if (debugObject.rotate) {
    console.log(debugObject.rotate);

    camera.position.y = Math.sin(elapsedTime * Math.PI);
    camera.position.x = Math.cos(elapsedTime * Math.PI );
  } else {
    camera.position.x = CURSOR.x * 4;
    camera.position.y = CURSOR.y * 4;
    camera.lookAt(mesh.position);
  }

  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
