import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// let time = Date.now();

const clock = new THREE.Clock()

// Animations
const tick = () => {
  /** 
  This is the method for the update the object ir relation with the frame rate , which will be updated all same rate in all the computer
  const currentTime = Date.now();
  const delta = currentTime - time;
  time = currentTime;
  mesh.rotation.y += 0.002 * delta;
**/


// /**
//  Update the object using the three js library Clock method instead of time.
 const elapsedTime = clock.getElapsedTime();
 mesh.position.x = Math.sin(elapsedTime);
 mesh.position.y = Math.tan(elapsedTime);
//  mesh.position.z += 0.009 * elapsedTime
//  mesh.scale.z += 1

//   */


  // Update Object
  // mesh.position.y += 0.01;
//   mesh.position.z += 0.01;

  // mesh.rotation.x += 0.01;
//   mesh.rotation.y += 0.002 * delta;

  camera.position.z += 0.1;

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
