import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'


export default class Sketch{
    constructor(options){
        /**
         * * create scene
         */
        this.scene = new THREE.Scene();

        /**
         * * get dom width and hight
         */
        this.container = options.container;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        /**
         * * camera
         */
        this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 );
        this.camera.position.z = 2;
   
        /**
         * * renderer
         */
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( this.width, this.height );
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        this.container.appendChild( this.renderer.domElement );
        this.renderer.setClearColor('#434C4D')//6B5C5A

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
        this.controls.enableZoom = false
        this.controls.enablePan = false

        //clock
        this.clock = new THREE.Clock();
        // this.time = 0;

        /**
         * * recall methods
         */
        this.createObjects()
        this.catchEvents()
        this.resize()
        this.render()
    }

    createObjects(){
        this.geometry = new THREE.PlaneBufferGeometry( 5, 5, 50, 50 );
        this.geometry = new THREE.SphereBufferGeometry( 0.5, 150, 150 );
        this.material = new THREE.MeshNormalMaterial();
    
        /**
         * * shaderMaterial
         */ 
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            side: THREE.DoubleSide,
            wireframe: false, 
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                uTime: { value: 0 }
            }
        })

        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
    }

    catchEvents(){
        window.addEventListener('resize',this.resize.bind(this)) 
    }

    resize(){ 
        // Update sizes
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        // Update camera
        this.camera.aspect = this.width / this.height
        this.camera.updateProjectionMatrix()
    
        // Update renderer
        this.renderer.setSize(this.width, this.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    render(){
        this.time = this.clock.getElapsedTime();
        this.material.uniforms.uTime.value = this.time;


        /**
         * * update controls
         */
        this.controls.update();

        /**
         * * update renderer and objs
         */
        // this.mesh.rotation.x = this.time * 0.5;
        // this.mesh.rotation.y = this.time * 0.5;
        this.renderer.render( this.scene, this.camera );

        /**
         * * animation loop
         */
        window.requestAnimationFrame(this.render.bind(this));
    }    
}

new Sketch({
    container: document.getElementById('container'),
})

