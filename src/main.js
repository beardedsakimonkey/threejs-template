new EventSource('/esbuild').addEventListener('change', () => location.reload())
import * as THREE from 'three';
const {sin,cos,max,min,abs,floor,ceil,random,PI,pow} = Math

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color("hsl(12,25%,0%)");
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, .1, 1000);
camera.position.z = 5;

const geo = new THREE.SphereGeometry(1);
const mat = new THREE.MeshBasicMaterial({color: 0x00ff00});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh)

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
