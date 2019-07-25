import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const style = {
  height: 400 // we can control scene size by setting container dimensions
};

class App extends Component {
  silenState = { isMounted: true };

  componentDidMount() {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      2200 // far plane
    );
    this.camera.position.z = 5; // is used here to set some distance from a cube that is located at z = 0
    // OrbitControls allow a camera to orbit around the object
    // https://threejs.org/docs/#examples/controls/OrbitControls
    this.controls = new OrbitControls(this.camera, this.el);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };

  // Here should come custom code.
  // Code below is taken from Three.js BoxGeometry example
  // https://threejs.org/docs/#api/en/geometries/BoxGeometry
  addCustomSceneObjects = () => {
    const geometry = new THREE.BoxGeometry(5, 2, 2);

    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      flatShading: true
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);


    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(11, 200, 0);
    lights[1].position.set(100, 0, 100);
    lights[2].position.set(-50, -150, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };

  startAnimationLoop = () => {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;
    

    this.renderer.render(this.scene, this.camera);

    // The window.requestAnimationFrame() method tells the browser that you wish to perform
    // an animation and requests that the browser call a specified function
    // to update an animation before the next repaint
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };

  handleWindowResize = () => {
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;

    // Note that after making changes to most of camera properties you have to call
    // .updateProjectionMatrix for the changes to take effect.
    this.camera.updateProjectionMatrix();
  };

 
  addSilenA(){
    const objName = "silen"
    this.removeParts(objName)
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      emissive: 0x002534,
      side: THREE.DoubleSide,
      flatShading: true
    });
    const geometry21 = new THREE.BoxGeometry(0.8, 0.5, 1);
    this.cube21 = new THREE.Mesh(geometry21, material);
    this.cube21.name = objName
    this.cube21.position.set(2, 1, 0);
    this.scene.add(this.cube21);

    const geometry22 = new THREE.BoxGeometry(0.8, 0.5, 1);
    this.cube22 = new THREE.Mesh(geometry22, material);
    this.cube22.name = objName
    this.cube22.position.set(-2, 1, 0);
    this.scene.add(this.cube22);
  }
  //サイレンBを追加する
 addSilenB(){
   const objName = "silen"
    this.removeParts(objName)
    const material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      emissive: 0xff2534,
      side: THREE.DoubleSide,
      flatShading: true
    });
    const geometry21 = new THREE.BoxGeometry(0.3, 0.5, 1);
    this.cube21 = new THREE.Mesh(geometry21, material);
    this.cube21.name = objName
    this.cube21.position.set(2, 1, 0);
    this.scene.add(this.cube21);

    const geometry22 = new THREE.BoxGeometry(0.3, 0.5, 1);
    this.cube22 = new THREE.Mesh(geometry22, material);
    this.cube22.name = objName
    this.cube22.position.set(-2, 1, 0);
    this.scene.add(this.cube22);
  }
  
  //指定されたオブジェクトを削除
  removeParts(objName){
    // console.log("remove")
    // console.log(this.cube21)
    // this.scene.remove(this.cube21)
    // this.scene.remove(this.cube22)
    while(this.scene.getObjectByName(objName)!== undefined){
      this.scene.remove(this.scene.getObjectByName(objName))
    }
    
  }


  render() {
    return (
      <div style={style} ref={ref => (this.el = ref)}>
        <button
          onClick={() =>
            this.addSilenA()
          }
        >
          サイレンA
        </button>
        <button
          onClick={() =>
            this.addSilenB()
          }
        >
          サイレンB
        </button>
        <button
          onClick={() =>
            this.removeParts("silen")
          }
        >
        サイレン消す
        </button>
       <button
          onClick={() =>
            this.removeParts()
          }
        >
        Status.
        </button>
        <br/><br/>
      </div>

      
    );
  }
}


class Container extends React.Component {
  state = { isMounted: true };
 
  render() {
    const { isMounted = true } = this.state;
    return (
      <>
        <button
          onClick={() =>
            this.setState(state => ({ isMounted: !state.isMounted }))
            
          }
        >
          {isMounted ? "Unmount" : "Mount"}
        </button><br/><br/>
            
        {isMounted && <App />}
        {isMounted && <div>Scroll to zoom, drag to rotate</div>}
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Container />, rootElement);
