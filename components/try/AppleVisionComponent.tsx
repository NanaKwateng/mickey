"use client"

import React, {
    useRef,
    useLayoutEffect,
    Suspense,
    useEffect,
    useState
} from "react"

import { Canvas, useFrame } from "@react-three/fiber"
import { Center, ContactShadows, Html, useProgress } from "@react-three/drei"
import type { Group } from "three"   // ✅ PROPER TYPE IMPORT
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import VisionModel from "@/components/models/Vision"
import StudioLights from "./StudioLight"
import FadeInTextBlock from "../ux/FadeInTextBlock"
import { Badge } from "../ui/badge"
import { Sparkles, Code2, LayoutDashboard, Gauge } from "lucide-react";
import { GiMicrochip } from "react-icons/gi"

/* ------------------------------------------ */
/* GSAP Safe Registration                     */
/* ------------------------------------------ */
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

/* ------------------------------------------ */
/* Scene Content                              */
/* ------------------------------------------ */

function SceneContent<T extends HTMLElement>({
    triggerRef
}: {
    triggerRef: React.RefObject<T | null>
}) {
    // ✅ Safe typing — no namespace usage
    const mainGroupRef = useRef<Group | null>(null)
    const idleGroupRef = useRef<Group | null>(null)

    useFrame((state, delta) => {
        if (!idleGroupRef.current) return

        const t = state.clock.getElapsedTime()

        // Floating animation
        idleGroupRef.current.position.y = Math.sin(t / 1.5) / 10

        // Smooth rotation (frame independent)
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
                    scrub: 1.5
                }
            })

            tl.to(
                mainGroupRef.current!.scale,
                {
                    x: 3.5,
                    y: 3.5,
                    z: 3.5,
                    ease: "power1.inOut"
                },
                0
            )

            tl.to(
                mainGroupRef.current!.rotation,
                {
                    y: Math.PI * 2,
                    ease: "none"
                },
                0
            )
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

/* ------------------------------------------ */
/* Loader                                     */
/* ------------------------------------------ */

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

/* ------------------------------------------ */
/* Main Component                             */
/* ------------------------------------------ */

export default function AppleVisionExperience() {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [mounted, setMounted] = useState(false)

    // ✅ Prevents hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

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
            {/* Overlay Content */}
            <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center px-6 md:px-16">
                <div className="space-y-20 w-full max-w-6xl mx-auto">

                    {/* 1 — LEFT */}
                    <div className="pointer-events-auto max-w-md mr-auto flex flex-col">
                        <Sparkles className="w-8 h-8 text-white mb-4" />

                        <FadeInTextBlock
                            title="Creative Direction."
                            description="Designing immersive digital products that merge aesthetic clarity with purposeful interaction."
                            subDescription="Design that speaks before words."
                            titleClassName="text-white text-4xl md:text-5xl font-light mb-4"
                            descriptionClassName="text-white/80 text-sm leading-relaxed"
                            subDescriptionClassName="text-white/50 text-xs mt-3"
                        />
                    </div>

                    {/* 2 — RIGHT */}
                    <div className="pointer-events-auto max-w-md ml-auto flex flex-col text-right">
                        <Code2 className="w-8 h-8 text-white mb-4 ml-auto" />

                        <FadeInTextBlock
                            title="Full Stack Development."
                            description="From backend architecture to pixel-perfect frontend systems — engineered for scalability and performance."
                            subDescription="Built for longevity and speed."
                            titleClassName="text-white text-4xl md:text-5xl font-light mb-4"
                            descriptionClassName="text-white/80 text-sm leading-relaxed"
                            subDescriptionClassName="text-white/50 text-xs mt-3"
                        />
                    </div>

                    {/* 3 — LEFT */}
                    <div className="pointer-events-auto max-w-md mr-auto flex flex-col">
                        <GiMicrochip className="w-8 h-8 text-white mb-4" />

                        <FadeInTextBlock
                            title="User Experience."
                            description="Human-centered systems crafted for clarity, emotion, and intuitive navigation."
                            subDescription="Experience before interface."
                            titleClassName="text-white text-4xl md:text-5xl font-light mb-4"
                            descriptionClassName="text-white/80 text-sm leading-relaxed"
                            subDescriptionClassName="text-white/50 text-xs mt-3"
                        />
                    </div>

                    {/* 4 — RIGHT */}
                    <div className="pointer-events-auto max-w-md ml-auto flex flex-col text-right">
                        <Gauge className="w-8 h-8 text-white mb-4 ml-auto" />

                        <FadeInTextBlock
                            title="Performance Optimization."
                            description="Precision tuning across frontend and backend to deliver seamless, fast-loading experiences."
                            subDescription="Speed meets elegance."
                            titleClassName="text-white text-4xl md:text-5xl font-light mb-4"
                            descriptionClassName="text-white/80 text-sm leading-relaxed"
                            subDescriptionClassName="text-white/50 text-xs mt-3"
                        />
                    </div>

                </div>
            </div>

        </section>
    )
}
