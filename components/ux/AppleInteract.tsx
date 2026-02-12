"use client"

import { Canvas } from '@react-three/fiber'
import { PresentationControls, Stage, PerspectiveCamera, Environment } from '@react-three/drei'
import { AppleVisionPro } from './AppleVisionPro'

export default function Interact() {
  return (
    <Canvas 
        shadows 
        //dpr={[1, 2]} 
        camera={{ position: [0, 0, 5], 
        fov: 45 }}
    >
      <color attach="background" args={['#050505']} />
      
      {/* Lights & Atmosphere */}
      <ambientLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
      
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
      >
        <Stage 
          //environment="city" 
          intensity={0.5} 
          contactShadow={{ opacity: 0.7, blur: 2 }}>
           <AppleVisionPro 
        />
        </Stage>
      </PresentationControls>

      {/* Performance: Optimized environment loading */}
      {/* <Environment preset="night" blur={0.8} /> */}
    </Canvas>
  )
}

// import React, { useLayoutEffect, useRef } from 'react'
// import { useGLTF, MeshTransmissionMaterial, Float } from '@react-three/drei'
// import { useThree } from '@react-three/fiber'
// import gsap from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'

// gsap.registerPlugin(ScrollTrigger)

// export function VisionProScene() {
//   const shellRef = useRef()
//   const group = useRef()
//   const { nodes, materials } = useGLTF('/apple_vision_pro_ios16.glb')
//   const { viewport } = useThree()

//   useLayoutEffect(() => {
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: ".viewport-container", // The HTML wrapper
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 1.5, // Smooth smoothing
//       }
//     })

//     // Animation: Subtle entrance and then scroll-based rotation
//     tl.from(group.current.position, { y: -2, duration: 1 })
//       .to(group.current.rotation, { y: Math.PI * 2, x: 0.5 }, 0)
//       .to(group.current.scale, { x: 1.2, y: 1.2, z: 1.2 }, 0.5)

//     return () => tl.kill() // Cleanup
//   }, [])

//   return (
//     <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
//       <group ref={group} dispose={null} scale={0.01}>
//         {/* We target the front glass specifically for the high-end look */}
//         <mesh
//           geometry={nodes.NCTuWVhPfXbauhX.geometry}
//           castShadow
//         >
//           <MeshTransmissionMaterial 
//             backside 
//             samples={4} 
//             thickness={1.5} 
//             chromaticAberration={0.05} 
//             anisotropy={0.1} 
//             distortion={0.1} 
//             distortionScale={0.1} 
//             temporalDistortion={0.1} 
//             color="#ffffff"
//             roughness={0.1}
//           />
//         </mesh>

//         {/* Dynamic rendering for the rest of the components to save memory */}
//         {Object.entries(nodes).map(([name, node]) => {
//           if (node.isMesh && name !== 'NCTuWVhPfXbauhX') {
//             return (
//               <mesh
//                 key={name}
//                 geometry={node.geometry}
//                 material={node.material}
//                 castShadow
//                 receiveShadow
//               />
//             )
//           }
//           return null
//         })}
//       </group>
//     </Float>
//   )
// }

// import { Canvas } from '@react-three/fiber'
// import { Environment, ContactShadows, AdaptiveDpr } from '@react-three/drei'

// export default function App() {
//   return (
//     <div className="viewport-container" style={{ height: '300vh' }}>
//       <div style={{ position: 'sticky', top: 0, height: '100vh' }}>
//         <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
//           <color attach="background" args={['#0a0a0a']} />
//           <ambientLight intensity={0.5} />
//           <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          
//           <VisionProScene />

//           {/* Performance & Visuals */}
//           <Environment preset="city" />
//           <ContactShadows 
//             position={[0, -1.5, 0]} 
//             opacity={0.4} 
//             scale={10} 
//             blur={2.5} 
//             far={4.5} 
//           />
//           <AdaptiveDpr pixelated />
//         </Canvas>
//       </div>
//     </div>
//   )
// }