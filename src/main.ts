import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

new EventSource('/esbuild').addEventListener('change', () => location.reload());

addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xababab);

/// CAMERA

const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000);
camera.position.z = 10;
new OrbitControls(camera, renderer.domElement);

/// LIGHT

const light = new THREE.PointLight(0xffffff, 400);
light.position.set(8, 8, 8);
scene.add(light);

/// SPHERE

const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshStandardMaterial({
        color: 'blue',
    }),
);
scene.add(mesh);

function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();
