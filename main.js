import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
//import { GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
//const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,0,20);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


// Line material
// Hello World ! 
const lmat = new THREE.LineBasicMaterial({color:0x00ff00});

const pts = [];
pts.push(new THREE.Vector3(0, 3*5, 0));
pts.push(new THREE.Vector3(-3*5,0, 0));
pts.push(new THREE.Vector3(0, -3*5, 0));
pts.push(new THREE.Vector3(3*5, 0, 0));
pts.push(new THREE.Vector3(0, 3*5, 0));

const light  = new THREE.PointLight(0xFFFFFF, 3);
const lgeom = new THREE.BufferGeometry().setFromPoints(pts);
const line = new THREE.Line(lgeom, lmat);

scene.add(line);
scene.add(light);
//camera.position.z = 5;
/*var mon;
const loader = new GLTFLoader();

loader.load( 'public/monkey.glb', function(gltf){
mon = gltf.scene;
scene.add(gltf.scene);
renderer.setAnimationLoop(animate);

}, undefined, function(err){
console.error(err);
});*/
const subroot = new THREE.Object3D();
scene.add(subroot);

const objects = [];
 objects.push(subroot);
// use just one sphere for everything
const radius = 1;
const widthSegments = 12;
const heightSegments = 12;
const sphereGeometry = new THREE.SphereGeometry(
    radius, widthSegments, heightSegments);
const earthorbit = new THREE.Object3D();
earthorbit.position.x = 10;
subroot.add(earthorbit); 
const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(3, 3, 3);  // make the sun large
subroot.add(sunMesh);

const moonmaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFFFF});
const moonMesh= new THREE.Mesh(sphereGeometry, moonmaterial);
moonMesh.scale.set(0.3,0.3,0.3);
//objects.push(sunMesh);
      const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthorbit.add(earthMesh);

const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = -2;
moonOrbit.add(moonMesh);
earthorbit.add(moonOrbit);
//sunMesh.add(line);
objects.push(earthorbit);
objects.push(moonOrbit);

   renderer.setAnimationLoop(animate);
function animate() {
objects.forEach((i) => {
i.rotation.z += 0.01;
const axes = new THREE.AxesHelper();
axes.material.depthTest = false;
axes.renderOrder = 1;
i.add(axes);
});
	renderer.render( scene, camera );

}
