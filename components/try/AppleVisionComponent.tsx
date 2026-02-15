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

/* ------------------------------------------ */
/* GSAP Safe Registration                     */
/* ------------------------------------------ */
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

/* ------------------------------------------ */
/* Scene Content                              */
/* ------------------------------------------ */

function SceneContent({
    triggerRef
}: {
    triggerRef: React.RefObject<HTMLElement>
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
            <div className="absolute inset-0 z-10 pointer-events-none">
                {/* Your content remains unchanged */}
            </div>
        </section>
    )
}
