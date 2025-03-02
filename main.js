import * as THREE from 'three';
import { GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0,0,20);
//camera.up.set(0,0,1);
//camera.lookAt(0,0,0);
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
//renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
//scene.add( cube );

// Line material
// Hello World ! 
const lmat = new THREE.LineBasicMaterial({color:0x00ff00});

const pts = [];
pts.push(new THREE.Vector3(0, 3*5, 0));
pts.push(new THREE.Vector3(-3*5,0, 0));
pts.push(new THREE.Vector3(0, -3*5, 0));
pts.push(new THREE.Vector3(3*5, 0, 0));
pts.push(new THREE.Vector3(0, 3*5, 0));

const light  = new THREE.PointLight(0xFFFFFF, 50);
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
const objects = [];
 
// use just one sphere for everything
const radius = 1;
const widthSegments = 6;
const heightSegments = 6;
const sphereGeometry = new THREE.SphereGeometry(
    radius, widthSegments, heightSegments);
 
const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(1, 1, 1);  // make the sun large
scene.add(sunMesh);
objects.push(sunMesh);
      const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthMesh.position.x = 10;
    //scene.add(earthMesh);
    objects.push(earthMesh);
	sunMesh.add(earthMesh);
sunMesh.add(line);
    renderer.setAnimationLoop(animate);
function animate() {
objects.forEach((i) => {
i.rotation.z += 0.01;
});
//	spheremesh.rotation.z +=0.009;
//	mon.rotation.x += 0.01;
//	line.rotation.z +=0.007;
//	cube.rotation.x += 0.01;
//	cube.rotation.y += 0.01;
	renderer.render( scene, camera );

}
