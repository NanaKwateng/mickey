"use client"

import React, { useRef, useState, useLayoutEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Center, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

//import SectionIntro from './sections/SectionIntro'
import SectionTitanium from './Titanium'
//import SectionAssembly from './sections/SectionAssembly'
import VisionModel from "@/components/models/Vision"
import Assembly from './Assembly'

gsap.registerPlugin(ScrollTrigger)

export default function ImmersiveExperience() {
    const containerRef = useRef<HTMLDivElement>(null)
    const modelGroup = useRef<THREE.Group>(null)
    const [isReady, setIsReady] = useState(false)

    useLayoutEffect(() => {
        // CRITICAL: Stop if refs aren't ready
        if (!isReady || !modelGroup.current || !containerRef.current) return

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            })

            // We use optional chaining here as a double-safety for Turbopack
            const model = modelGroup.current;
            if (model) {
                // SECTION 1 -> 2: The "Titanium" Spin
                tl.to(model.rotation, { y: Math.PI * 2, x: 0.2 }, 0)
                tl.to(model.position, { x: -2, z: -1 }, 0)
                tl.to(model.scale, { x: 4, y: 4, z: 4 }, 0)

                // SECTION 2 -> 3: The "Assembly" Explode
                tl.to(model.rotation, { y: Math.PI * 4, x: -0.2 }, 1)
                tl.to(model.position, { x: 0, y: 1.5 }, 1)
            }
        })

        return () => ctx.revert()
    }, [isReady]) // Only run when Canvas signals 'isReady'

    return (
        <div ref={containerRef} className="relative bg-white">
            {/* 3D SCENE BACKGROUND */}
            <div className="absolute top-12 left-0 w-full h-screen z-0 pointer-events-none">
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 35 }}
                    onCreated={() => setIsReady(true)} // SET READY SIGNAL HERE
                >
                    <ambientLight intensity={1.5} />
                    {/* Using a standard light rig to avoid the .hdr fetch error seen earlier */}
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />

                    <group ref={modelGroup}>
                        <VisionModel scale={1} />
                    </group>
                    <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2.5} />
                </Canvas>
            </div>

            {/* OVERLAY SECTIONS */}
            <main className="relative z-10">
                {/* <section className="scroll-section h-screen">
          <SectionIntro />
        </section> */}

                <section className="scroll-section h-screen">
                    <SectionTitanium />
                </section>

                <section className="scroll-section h-[150vh]">
                    <Assembly />
                </section>
            </main>
        </div>
    )
}