"use client"

import React, { useState, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Center, ContactShadows, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"

// Import your sub-components
import {
    MenModel,
    SkillsModel,
    EducationModel,
    ProfileContent,
    SkillsContent,
    EducationContent
} from './AboutTexts'

import StudioLights from '../try/StudioLight'
import { Badge } from '../ui/badge'

type TabType = 'about' | 'education' | 'skills';

// --- FIXED COMPONENT ---
function SuspendedModel({ children }: { children: React.ReactNode }) {
    const groupRef = useRef<THREE.Group>(null!)
    const { viewport } = useThree()

    // Responsive scaling
    const responsiveScale = useMemo(() => Math.min(viewport.width / 0.2, 8), [viewport.width]);

    // FIX: Track time manually using a Ref to prevent 'clock' errors
    const timeRef = useRef(0);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Accumulate time safely
        timeRef.current += delta;

        // Apply animation
        groupRef.current.position.y = Math.sin(timeRef.current / 2) * 0.1
    })

    return (
        <group ref={groupRef} scale={responsiveScale}>
            <Center top>
                {children}
            </Center>
        </group>
    )
}

export default function TabletVisionExperience() {
    const [activeTab, setActiveTab] = useState<TabType>('about');
    const containerRef = useRef<HTMLDivElement>(null);

    // Memoize content content to prevent flicker
    const content = useMemo(() => {
        switch (activeTab) {
            case 'about': return { text: <ProfileContent />, model: <MenModel /> };
            case 'skills': return { text: <SkillsContent />, model: <SkillsModel /> };
            case 'education': return { text: <EducationContent />, model: <EducationModel /> };
            default: return { text: <ProfileContent />, model: <MenModel /> };
        }
    }, [activeTab]);

    useGSAP(() => {
        gsap.fromTo(".ui-content",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
    }, { dependencies: [activeTab], scope: containerRef });

    const tabs: TabType[] = ['about', 'education', 'skills'];

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center"
            aria-label="Interactive 3D Experience"
        >
            <div className="absolute top-4 md:top-12 inset-x-0 flex justify-center z-30 pointer-events-none" aria-hidden="true">
                <Badge
                    variant="secondary"
                    className="text-transparent bg-clip-text bg-gradient-to-l from-blue-300 via-pink-300 to-pink-400 border-white/10 backdrop-blur-md"
                >
                    [ Drag to Rotate ]
                </Badge>
            </div>

            <div className="absolute top-20 left-4 md:top-24 md:left-10 z-30">
                <div role="tablist" className="flex flex-col md:flex-row gap-4 md:gap-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            role="tab"
                            aria-selected={activeTab === tab}
                            aria-controls={`panel-${tab}`}
                            onClick={() => setActiveTab(tab)}
                            className={`
                                text-sm uppercase tracking-widest font-medium transition-all duration-300 text-left md:text-center pb-1 border-b-2
                                ${activeTab === tab
                                    ? 'text-white border-white'
                                    : 'text-zinc-600 border-transparent hover:text-zinc-400'
                                }
                            `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div
                className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end pb-20 md:justify-center md:pb-0 px-4 md:px-16"
                id={`panel-${activeTab}`}
                role="tabpanel"
            >
                <div className="ui-content pointer-events-auto w-full md:w-auto">
                    {content.text}
                </div>
            </div>

            <div className="absolute inset-0 z-10 w-full h-full" aria-hidden="true">
                <Canvas
                    dpr={[1, 2]}
                    shadows
                    camera={{ position: [0, 0, 7], fov: 35 }}
                    gl={{ powerPreference: "high-performance", antialias: true }}
                >
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableDamping={true}
                        dampingFactor={0.05}
                        rotateSpeed={0.5}
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={Math.PI / 1.5}
                    />

                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#4f46e5" />
                    <directionalLight position={[0, 5, 5]} intensity={2} />

                    <StudioLights />

                    <React.Suspense fallback={null}>
                        <SuspendedModel key={activeTab}>
                            {content.model}
                        </SuspendedModel>
                        <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={20} blur={2.5} far={4.5} color="#000000" />
                    </React.Suspense>
                </Canvas>
            </div>
        </section>
    )
}