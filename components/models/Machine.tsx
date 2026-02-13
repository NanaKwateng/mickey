"use client";

import React, { useRef } from 'react';
// ✅ FIX: Import THREE namespace to resolve build error
import * as THREE from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

export function MachineModel(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>(null!);
  // Cast the result to GLTFResult to fix specific node access errors
  const { nodes, materials, animations } = useGLTF('/models/machine.glb') as GLTFResult;
  const { actions } = useAnimations(animations, group);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          {/* 
               NOTE: Since I don't have your exact machine.glb structure, 
               ensure the node names below match your GLTF file. 
               If you just need the container fixed, this structure is fine.
            */}
          <primitive object={nodes.root || nodes.Root || nodes.Scene || nodes.OSG_Scene} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/machine.glb');