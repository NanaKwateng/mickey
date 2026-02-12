"use client"

import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center, ContactShadows, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import TabletModel from "@/components/models/Ipad"
import FadeInTextBlock from '../ux/FadeInTextBlock'
import SlideInTextLines from '../ux/SlideInText'
import { MachineModel } from '../models/Machine'

function SuspendedModel() {
    const groupRef = useRef<THREE.Group>(null!)
    const { viewport } = useThree()

    // 1. FIXED SCALE LOGIC
    // Increased the multiplier from /1.8 to /1.2 to make it significantly larger.
    // Increased the 'max' limit from 5 to 8 for large desktop screens.
    const responsiveScale = Math.min(viewport.width / 0.8, 8)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        // 2. REFINED SWING
        // Reduced frequency for a more 'premium' slow bobbing effect
        groupRef.current.position.y = Math.sin(t / 2) * 0.1
        groupRef.current.rotation.x = (Math.PI / 2) + Math.sin(t / 2) * 0.02
        groupRef.current.rotation.y = Math.cos(t / 2) * 0.02
    })

    return (
        // Added the scale directly here for responsiveness
        <group ref={groupRef} scale={responsiveScale}>
            <Center top>
                {/* FIXED ORIENTATION: 
                   The rotation is now managed in useFrame to maintain the face-up 
                   position while allowing for the subtle idle animation.
                */}
                <MachineModel />
            </Center>
        </group>
    )
}

export default function ComputerVisionExperience() {
    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
            {/* UI TEXT OVERLAY */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-12">
                <div className="flex justify-between items-start">
                    <nav className="text-zinc-500 text-sm flex gap-6 uppercase tracking-widest pointer-events-auto">
                        <span>Men</span>
                        <span className="text-white border-b border-white">Women</span>
                        <span>Brand</span>
                    </nav>
                </div>

                <FadeInTextBlock
                    className="max-w-xs"
                    title="Profile."
                    description="Rose gold second hand titanium and rose gold double-plated stainless steel."
                    subDescription="Precision-crafted for modern timepieces."
                    titleClassName="text-white text-7xl font-light mb-4"
                    descriptionClassName="text-zinc-500 text-sm leading-relaxed"
                    subDescriptionClassName="text-zinc-400 text-xs mt-3"
                />

                <SlideInTextLines
                    direction="right"
                    className="max-w-lg space-y-6"
                    lineClassName="text-white text-3xl font-light leading-snug"
                    lines={[
                        'Designed with intention.',
                        'Engineered for precision.',
                        'Animated with purpose.',
                    ]}
                />
            </div>

            <div className="absolute inset-0 z-0">
                <Canvas dpr={[1, 2]}>
                    {/* 3. FIXED CAMERA DISTANCE:
                       Changed position from [0, 0, 10] to [0, 0, 6].
                       Pulling the camera closer makes the 3D object dominate the screen space.
                    */}
                    <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />

                    <ambientLight intensity={1.5} />
                    <pointLight position={[10, 10, 10]} intensity={2} />
                    <directionalLight position={[-5, 5, 5]} intensity={2} />

                    <React.Suspense fallback={null}>
                        <SuspendedModel />
                        {/* 4. SHADOW ADJUSTMENT:
                           Lowered the shadow position to account for the larger model scale.
                        */}
                        <ContactShadows
                            position={[0, -2.5, 0]}
                            opacity={0.4}
                            scale={20}
                            blur={2.5}
                            far={4.5}
                        />
                    </React.Suspense>
                </Canvas>
            </div>
        </div>
    )
}