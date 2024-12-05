import React from 'react'

import gorillaScene from '../assets/3d/flying_gorilla.glb';
import { useGLTF } from '@react-three/drei';

const Gorilla = ({ isRotating, ...props }) => {
  const { scene, animations } = useGLTF(gorillaScene);
  return (
    <mesh {...props} position={[-.5, -.25, 2.5]} scale={[0.2, 0.2, 0.2]}>
        <primitive object={scene} />
    </mesh>
  )
}

export default Gorilla
