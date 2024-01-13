import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// import Stats from 'three/addons/libs/stats.module.js';

new EventSource('/esbuild').addEventListener('change', () => location.reload());

window.addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xababab);

// Camera

const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, .1, 100);
camera.position.z = 10;
new OrbitControls(camera, renderer.domElement);

// Light

const light = new THREE.PointLight(0xffffff, 400);
light.position.set(8, 8, 8);
scene.add(light);

// Mesh

const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(1),
    new THREE.MeshStandardMaterial({
        color: 'blue',
    }),
);
scene.add(mesh);

function update(ts: number) {
    renderer.render(scene, camera);
    requestAnimationFrame(update);
}

update(0);
