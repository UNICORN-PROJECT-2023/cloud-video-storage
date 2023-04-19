import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import unicornModel from './assets/unicorn.gltf'


function Model(props) {
    const { scene } = useGLTF(unicornModel);
  
    // const object = scene.getObjectByName('Cube007');
    
    return (
      <primitive object={scene} {...props} />
    )
  }
  export default Model;