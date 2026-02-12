"use client"

import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center, ContactShadows, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import TabletModel from "@/components/models/Ipad"
import FadeInTextBlock from '../ux/FadeInTextBlock'
import { Badge } from '../ui/badge'

function SuspendedModel() {
    const groupRef = useRef<THREE.Group>(null!)
    const { viewport } = useThree()

    // 1. FIXED SCALE LOGIC
    // Increased the multiplier from /1.8 to /1.2 to make it significantly larger.
    // Increased the 'max' limit from 5 to 8 for large desktop screens.
    const responsiveScale = Math.min(viewport.width / 0.2, 8)

    useFrame((state) => {
        if (!state.clock || !groupRef.current) return
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
                <TabletModel

                />
            </Center>
        </group>
    )
}

export default function TabletVisionExperience() {
    return (
        <div className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center py-6">
            <Badge
                variant={"secondary"}
                className="text-transparent bg-clip-text bg-linear-to-l from-blue-300 via-20% to-pink-400"
            >
                {"{ "} Pernonality - Who we are {" }"}
            </Badge>
            {/* UI TEXT OVERLAY */}
            <div className="absolute inset-0 z-10 pointer-events-none flex items-center flex-wrap space-y-4 gap-3 justify-between p-12">

                <FadeInTextBlock
                    className="max-w-xs absolute bottom-12 text-black"
                    title="Contact Me. "
                    description="Hi 👋, my name is Michael, a creative developer who build minimal, aesthetic applications focusing on user-centric design which matches your brand tone and voice."
                    subDescription="Precision-crafted for modern timepieces."
                    titleClassName="text-black text-5xl font-light mb-4"
                    descriptionClassName="text-black text-sm leading-relaxed"
                    subDescriptionClassName="text-zinc-400 text-xs mt-3"
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