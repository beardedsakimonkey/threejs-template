new EventSource('/esbuild').addEventListener('change', () => location.reload())
import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
const {sin,cos,max,min,abs,floor,ceil,random,PI,pow} = Math

addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( innerWidth, innerHeight );
});

// gui
// const gui = new GUI()
// const p = {}

init()
animate()

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio( devicePixelRatio );
    renderer.setSize( innerWidth, innerHeight )
    document.body.appendChild( renderer.domElement )

    scene = new THREE.Scene()
    scene.background = new THREE.Color( 0x444444 );

    {// camera
        camera = new THREE.PerspectiveCamera( 75, innerWidth/innerHeight, 0.1, 50 );
        camera.position.z = 30;
    }

    {// controls
        orbit = new OrbitControls( camera, renderer.domElement );
    }

    {// light
        const lights = [];
        lights[0] = new THREE.DirectionalLight( 0xffffff, 3 );
        lights[1] = new THREE.DirectionalLight( 0xffffff, 3 );
        lights[2] = new THREE.DirectionalLight( 0xffffff, 3 );

        lights[0].position.set( 0, 200, 0 );
        lights[1].position.set( 100, 200, 100 );
        lights[2].position.set( - 100, - 200, - 100 );

        scene.add( lights[0] );
        scene.add( lights[1] );
        scene.add( lights[2] );
    }

    {// mesh
        mesh = new THREE.Mesh(
            new THREE.BoxGeometry( 15, 15, 15 ),
            new THREE.MeshPhongMaterial({
                color: 0x156289,
                emissive: 0x072534,
                side: THREE.FrontSide,
                flatShading: true,
            })
        );
        scene.add( mesh );
    }
}

function animate() {
    // const t = Date.now() * .0001;
    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.005;

    renderer.render( scene, camera )
    requestAnimationFrame( animate )
}
