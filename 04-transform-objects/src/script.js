import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene();

// Group
const group = new THREE.Group();

scene.add(group);

const cube1 = new THREE.Mesh(new THREE.BoxGeometry(2,0.5,1), new THREE.MeshBasicMaterial({color:0xff0000}));
cube1.position.x = -0.5;
group.add(cube1)

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(2,0.5,1), new THREE.MeshBasicMaterial({color:0x000ff0}));
cube2.position.x = 1;
group.add(cube2)

const cube3 = new THREE.Mesh(new THREE.BoxGeometry(2,0.5,1), new THREE.MeshBasicMaterial({color:0x00bb00}));
cube2.position.y = 0.5;
group.add(cube3)

group.position.y= 1;
group.scale.y= 1;


/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material);

mesh.position.x = 1;
mesh.position.y = 2;
mesh.position.z = -3;

mesh.scale.set(1,2,3);

mesh.rotation.reorder("YXZ")
mesh.rotateX(Math.PI)
mesh.rotateY(Math.PI/2)
scene.add(mesh);

// Axes helper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3;
camera.position.x = 0.5;
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)