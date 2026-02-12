"use client"

import React, { useRef, useLayoutEffect, Suspense, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, ContactShadows, Html, useProgress } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VisionModel from "@/components/models/Vision"
import StudioLights from './StudioLight'
import FadeInTextBlock from '../ux/FadeInTextBlock'
import { Badge } from '../ui/badge'

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

function SceneContent({ triggerRef }: { triggerRef: React.RefObject<HTMLElement> }) {
    const mainGroupRef = useRef<THREE.Group>(null!)
    const idleGroupRef = useRef<THREE.Group>(null!)

    useFrame((state, delta) => {
        // FIX: Safety check. If the scene isn't ready, skip this frame.
        if (!idleGroupRef.current || !state.clock) return

        // Option 1: Use absolute time for bobbing (Sine wave)
        const t = state.clock.getElapsedTime()
        idleGroupRef.current.position.y = Math.sin(t / 1.5) / 10

        // Option 2: Use delta for rotation (Smoother, frame-rate independent)
        // This is safer than setting rotation = time, as it prevents jumps
        idleGroupRef.current.rotation.y += delta * 0.1
    })

    useLayoutEffect(() => {
        if (!triggerRef.current || !mainGroupRef.current) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                }
            })

            tl.to(mainGroupRef.current.scale, {
                x: 3.5,
                y: 3.5,
                z: 3.5,
                ease: "power1.inOut"
            }, 0)

            tl.to(mainGroupRef.current.rotation, {
                y: Math.PI * 2,
                ease: "none"
            }, 0)
        })

        return () => ctx.revert()
    }, [triggerRef])

    return (
        <group ref={mainGroupRef}>
            <group ref={idleGroupRef}>
                <Center>
                    <VisionModel />
                </Center>
            </group>
        </group>
    )
}

// ... (Rest of the component remains the same: CanvasLoader and default export)
function CanvasLoader() {
    const { progress } = useProgress()
    return (
        <Html center>
            <div className="text-white text-xs font-mono tracking-widest">
                LOADING {progress.toFixed(0)}%
            </div>
        </Html>
    )
}

export default function AppleVisionExperience() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[250vh] bg-black"
            aria-label="Apple Vision Pro 3D Experience Showcase"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {mounted && (
                    <Canvas
                        camera={{ position: [0, 0, 8], fov: 35 }}
                        dpr={[1, 2]}
                        gl={{
                            antialias: true,
                            powerPreference: "high-performance",
                            alpha: true
                        }}
                        role="img"
                    >
                        <ambientLight intensity={0.5} />
                        <spotLight
                            position={[10, 10, 10]}
                            angle={0.15}
                            penumbra={1}
                            intensity={1}
                        />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} />

                        <Suspense fallback={<CanvasLoader />}>
                            <SceneContent triggerRef={containerRef} />
                            <StudioLights />
                            <ContactShadows
                                position={[0, -2, 0]}
                                opacity={0.4}
                                scale={30}
                                blur={2}
                                far={4.5}
                            />
                        </Suspense>
                    </Canvas>
                )}
            </div>


            {/* Overlay Content */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="h-screen flex flex-col items-center justify-start pt-20 px-4 md:px-8">
                    <Badge
                        variant="secondary"
                        className="mb-8 text-transparent bg-clip-text bg-gradient-to-l from-blue-300 via-pink-400 to-blue-300 animate-pulse"
                    >
                        {"[ "} MickeyLabs Creative Environment {" ]"}
                    </Badge>

                    <FadeInTextBlock
                        className="max-w-sm text-left mr-auto mt-12"
                        title="Purpose."
                        description="Designed to inspire, built to connect. Purposefully for meaningful interactions, and for impactful experiences."
                        subDescription="Precision-crafted materials designed for longevity."
                        titleClassName="text-white text-5xl font-light mb-4"
                        descriptionClassName="text-zinc-400 text-sm leading-relaxed"
                        subDescriptionClassName="text-white/80 text-xs mt-2"
                    />
                </div>

                <div className="h-[75vh] flex items-center justify-end px-4 md:px-12 lg:px-24">
                    <FadeInTextBlock
                        className="max-w-md text-left"
                        title="Precision."
                        description="Engineered with precision, built to deliver with every detail matching brand tone and voice. Driven by intent, made with focus to make moments matter."
                        subDescription="Precision-crafted materials that resonate."
                        titleClassName="text-white text-5xl font-light mb-4"
                        descriptionClassName="text-zinc-400 text-sm leading-relaxed"
                        subDescriptionClassName="text-white/80 text-xs mt-2"
                    />
                </div>

                <div className="h-[75vh] flex flex-col md:flex-row items-end justify-between px-4 md:px-12 pb-20 gap-10">
                    <FadeInTextBlock
                        className="max-w-md"
                        title="Design"
                        description="Engineered with AI-driven arts that change subtly each visit, making your experience feel fresh and unique."
                        subDescription="Modern technology enhancements."
                        titleClassName="text-white text-5xl font-light mb-4"
                        descriptionClassName="text-zinc-400 text-sm leading-relaxed"
                        subDescriptionClassName="text-white/80 text-xs mt-2"
                    />
                    <FadeInTextBlock
                        className="max-w-md"
                        title="Generative Arts Elements"
                        description="Detailing every brand tone and style."
                        titleClassName="text-3xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-pink-400 mb-2"
                        descriptionClassName="text-zinc-500 text-sm"
                    />
                </div>
            </div>
        </section>
    )
}