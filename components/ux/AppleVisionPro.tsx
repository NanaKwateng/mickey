"use client"

import React, { useRef, useMemo } from 'react'
import { useGLTF, Float, MeshTransmissionMaterial, Environment, ContactShadows } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function AppleVisionPro(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/vision.glb')

  // Performance: Optimization by pre-processing materials
  useMemo(() => {
    Object.values(materials).forEach((material) => {
      material.precision = 'lowp' // Boosts mobile performance
      if (material.name === 'front_glass_material') { // Replace with your glass material name
        material.roughness = 0.1
        material.metalness = 1
      }
    })
  }, [materials])

  // Subtle floating animation for "vibrancy"
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, Math.cos(t / 2) / 20, 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, Math.sin(t / 4) / 20, 0.1)
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={group} {...props} dispose={null} scale={0.01}>
        {/* We map the nodes dynamically to keep code clean and performant */}
        {Object.keys(nodes).map((key) => {
          const node = nodes[key]
          if (node.type === 'Mesh') {
            return (
              <mesh
                key={key}
                castShadow
                receiveShadow
                geometry={node.geometry}
                material={node.material}
              />
            )
          }
          return null
        })}
      </group>
    </Float>
  )
}

useGLTF.preload('/models/vision.glb')