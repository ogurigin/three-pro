<template>
  <canvas ref="canvasRef" id="myCanvas"></canvas>
</template>

<script setup>
import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvasRef = ref(null);
let camera, scene,renderer;

const sizes = {
  width:window.innerWidth,
  height:window.innerHeight,
}

const init = ()=>{
  const canvas = canvasRef.value;
  camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height,1,100);
  camera.position.z = 6;
  scene = new THREE.Scene();
  scene.add(camera);
    
  renderer = new THREE.WebGLRenderer({canvas});
  renderer.setSize(sizes.width, sizes.height);

  const textureLoader = new THREE.TextureLoader();
  const matcapTexture = textureLoader.load('/texture/1.png');
  const material = new THREE.MeshMatcapMaterial({matcap:matcapTexture});
       
  const loader = new FontLoader();
  loader.load('/fonts/helvetiker_bold.typeface.json',font=>{
    const geometry = new TextGeometry('Hello three.js !',{
      font,
      size:0.4,
      depth:0.02,
      height:1,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 10
    })
    const text = new THREE.Mesh(geometry,material);
    geometry.center();
    
    scene.add(text);

    for(let i=0;i<=100;i++){
        const torusGeometry = new THREE.TorusGeometry(0.3,0.2,20,45);
        const torus = new THREE.Mesh(torusGeometry,material);

        torus.position.x = (Math.random() - 0.5) * 10;  
        torus.position.y = (Math.random() - 0.5) * 10;
        torus.position.z = (Math.random() - 0.5) * 10;

        torus.rotation.x = Math.random() * Math.PI;
        torus.rotation.y = Math.random() * Math.PI;

        const scale = Math.random();
        torus.scale.set(scale,scale,scale);

        scene.add(torus);
    }
  })

 
  const controls = new OrbitControls(camera, canvasRef.value);
  scene.add(controls)


}
const animate = () => {  
  requestAnimationFrame(animate);  
  renderer.render(scene, camera);
}
onMounted(() => { 
  init();
  animate()

  window.addEventListener('resize', ()=>{
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
  })
})
</script>

<style scoped>
/* 画布 */
#myCanvas{
     position:fixed;
     top:0;
     left:0;
     bottom: 0;
     right: 0;
     outline:none;/* 取消部分浏览器窗口的蓝色边框 */
}
</style>
