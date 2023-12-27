import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
// import Stats from 'three/addons/libs/stats.module.js';
const {sin,cos,max,min,abs,floor,ceil,round,random,PI,pow} = Math

init()
animate()

function init() {
    new EventSource('/esbuild').addEventListener('change', () => location.reload())

    addEventListener('resize', () => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( innerWidth, innerHeight );
    });

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio( devicePixelRatio );
    renderer.setSize( innerWidth, innerHeight )
    document.body.appendChild( renderer.domElement )

    scene = new THREE.Scene()
    // scene.background = new THREE.Color('white');

    {// camera
        camera = new THREE.PerspectiveCamera( 75, innerWidth/innerHeight, 1, 1000 );
        camera.position.z = 50;
    }

    {// controls
        orbit = new OrbitControls( camera, renderer.domElement );
    }

    {// light
        // light = new THREE.AmbientLight( 0xffffff, 1 );
        // scene.add( light );

        const light = new THREE.PointLight( 0xffffff, 500, 0 );
        light.position.set( 20, 20, 20 );
        scene.add( light );

        // const lights = [];
        // lights[0] = new THREE.DirectionalLight( 0xffffff, 3 );
        // lights[1] = new THREE.DirectionalLight( 0xffffff, 3 );
        // lights[2] = new THREE.DirectionalLight( 0xffffff, 3 );

        // lights[0].position.set( 0, 200, 0 );
        // lights[1].position.set( 100, 200, 100 );
        // lights[2].position.set( -100, -200, -100 );

        // scene.add( lights[0] );
        // scene.add( lights[1] );
        // scene.add( lights[2] );
    }

    const loader = new THREE.TextureLoader();
    const texture = loader.load('/textures/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats =  16;
    texture.repeat.set(repeats, repeats);

    {// mesh
        mat = new THREE.MeshPhongMaterial({
            map: texture,
            roughness: 1,
            // flatShading: true,
        });
        // mat.color.setRGB(1.5, 1.5, 1.5);
        mesh = new THREE.Mesh(
            // new THREE.BoxGeometry( 15, 15, 15 ),
            new THREE.SphereGeometry( 15),
            mat
        );
        scene.add( mesh );
    }
}

function animate() {
    // const t = Date.now() * .0001;
    // mesh.rotation.x += 0.005;
    // mesh.rotation.y += 0.005;

    renderer.render( scene, camera )
    requestAnimationFrame( animate )
}
