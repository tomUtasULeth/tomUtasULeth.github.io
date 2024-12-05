/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Artjoms Horosilovs (https://sketchfab.com/Artjoms_Horosilovs)
License: CC-BY-NC-SA-4.0 (http://creativecommons.org/licenses/by-nc-sa/4.0/)
Source: https://sketchfab.com/3d-models/sea-keep-lonely-watcher-09a15a0c14cb4accaf060a92bc70413d
Title: Sea Keep "Lonely Watcher"
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import envScene from "../assets/3d/sea_keep_lonely_watcher.glb"
import { a } from '@react-spring/three'

const Env = ({ isRotating, setIsRotating, ...props}) => {
  const envRef = useRef();
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(envScene)

  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    lastX.current = clientX;
  };

  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      const delta = (clientX - lastX.current) / viewport.width;

      envRef.current.rotation.y += delta * 0.01 * Math.PI;

      lastX.current = clientX;

      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      envRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      envRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  const handleTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
  
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  }
  
  const handleTouchEnd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  }
  
  const handleTouchMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
  
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
  
      envRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  }

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("touchmove", handleTouchMove);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      envRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = envRef.current.rotation.y;

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    }
});

  return (
    <a.group ref={envRef} {...props}>
      <group position={[17.117, 218.356, 23.591]} rotation={[-Math.PI / 2, 0, Math.PI]}>
        <group position={[33.745, 38.713, -60.289]}>
          <mesh geometry={nodes.Fortress_Fortress_0.geometry} material={materials.Fortress} />
          <mesh geometry={nodes.Fortress_Fortress_0_1.geometry} material={materials.Fortress} />
          <mesh geometry={nodes.Fortress_Fortress_0_2.geometry} material={materials.Fortress} />
          <mesh geometry={nodes.Fortress_Environment_0.geometry} material={materials.Environment} />
          <mesh geometry={nodes.Fortress_Sand_0.geometry} material={materials.Sand} />
        </group>
      </group>
      <mesh
        geometry={nodes.Sea_Sea_0.geometry}
        material={materials.material}
        position={[-1.388, 326.224, 14.92]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes.Sky_Sky_0.geometry}
        material={materials.material_4}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </a.group>
  )
}

export default Env;