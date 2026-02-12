"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, ContactShadows } from "@react-three/drei";
import type { Group } from "three"; // FIX #6: tree-shakeable type-only import
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import VisionModel from "@/components/models/Vision";
import { InfoCard } from "./InfoCard";
import StudioLights from "../try/StudioLight";

gsap.registerPlugin(ScrollTrigger);

// ─── Animation constants (FIX: no magic numbers) ───────────────────
const CAMERA_POS: [number, number, number] = [0, 0, 8];
const CAMERA_FOV = 35;
const SCALE_TARGET = 3.5;
const ROTATION_TARGET = Math.PI * 4; // 720°
const SCRUB_FACTOR = 1.5;
const SECTION_HEIGHT = "450vh";
const CARD_INITIAL_Y = 40; // starting offset before GSAP reveal

// ─── Card configuration ─────────────────────────────────────────────
const CARDS = [
    {
        id: "aesthetic-minimal",
        title: "Aesthetic-Minimal",
        // FIX #10: cleaned copy
        desc: "Thoughtful design that puts your brand's message front and centre.",
        position: "top-[12%] left-[5%] md:left-[10%]",
        depth: 45,
    },
    {
        id: "creativity",
        title: "Creativity",
        desc: "Innovative solutions that push boundaries and spark engagement with your brand tone.",
        position: "top-[18%] md:top-[15%] right-[5%] md:right-[10%]",
        depth: -35,
    },
    {
        // FIX #9: "experinces" → "Experiences"
        id: "interactive-experiences",
        title: "Interactive Experiences",
        desc: "Engaging real interactivity with your brand idea, mimicking real environments.",
        position: "top-[45%] left-[2%] md:left-[5%]",
        depth: 65,
    },
    {
        id: "3d-designs",
        title: "3D Designs",
        desc: "Immersive visuals that transport your audience to new dimensions.",
        position: "bottom-[12%] left-[5%] md:left-[15%]",
        depth: -25,
    },
    {
        id: "modern",
        title: "Modern",
        // FIX #10: grammar
        desc: "Empowering your brand tone with modern aesthetics that bring your ideas to reality.",
        position: "bottom-[12%] right-[7%] md:right-[17%]",
        depth: 55,
    },
] as const;

// ─── Suspense fallback (FIX #14: must be a R3F element) ────────────
function SceneLoader() {
    return (
        <mesh>
            <icosahedronGeometry args={[0.5, 1]} />
            <meshStandardMaterial
                color="#333"
                wireframe
                transparent
                opacity={0.3}
            />
        </mesh>
    );
}

// ─── Main Component ─────────────────────────────────────────────────
export default function VisionShowcase() {
    // FIX #5: removed unused `selectedCard` state
    const containerRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);
    const groupRef = useRef<Group>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [isCanvasReady, setIsCanvasReady] = useState(false);

    // FIX #1: useEffect (not useLayoutEffect) avoids SSR warnings.
    // Cards are hidden via CSS `opacity-0` class, so no FOUC even before
    // this effect runs.
    useEffect(() => {
        const container = containerRef.current;
        const pin = pinRef.current;
        const group = groupRef.current;

        if (!container || !pin || !group || !isCanvasReady) return;

        // ── FIX #3, #16: Set initial card states + compositor hints ──
        cardRefs.current.forEach((el) => {
            if (el) {
                gsap.set(el, {
                    opacity: 0,
                    y: CARD_INITIAL_Y,
                    willChange: "transform, opacity",
                });
            }
        });

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: SCRUB_FACTOR,
                    pin: pin,
                    // FIX #2: container already provides scroll distance (450vh),
                    // pinSpacing would ADD duplicate height → 800vh total
                    pinSpacing: false,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                },
            });

            // ── STAGE 1: Scale up (occupies ~40% of scroll) ──
            tl.to(
                group.scale,
                {
                    x: SCALE_TARGET,
                    y: SCALE_TARGET,
                    z: SCALE_TARGET,
                    duration: 1,
                    ease: "power2.inOut",
                },
                0
            );

            // ── STAGE 1: 720° rotation (entire scroll range) ──
            tl.to(
                group.rotation,
                {
                    y: ROTATION_TARGET,
                    duration: 2.5, // longest track = total timeline length
                    ease: "none",
                },
                0
            );

            // ── STAGE 2: Parallax card reveals ──
            CARDS.forEach((card, i) => {
                const el = cardRefs.current[i];
                if (!el) return;

                tl.fromTo(
                    el,
                    { opacity: 0, y: CARD_INITIAL_Y },
                    {
                        opacity: 1,
                        y: -card.depth,
                        duration: 1,
                        ease: "power3.out",
                    },
                    // Staggered entrance after initial scale-up
                    0.3 + i * 0.15
                );
            });
        }, container); // scope context to container for clean teardown

        return () => {
            // Clean up will-change to free GPU compositor layers
            cardRefs.current.forEach((el) => {
                if (el) el.style.willChange = "auto";
            });
            ctx.revert();
        };
    }, [isCanvasReady]);

    return (
        // FIX #20, #22: semantic <section> with id anchor
        <section
            ref={containerRef}
            id="vision-showcase"
            aria-label="Interactive 3D design showcase"
            className="relative w-full bg-black"
            style={{ height: SECTION_HEIGHT }}
        >
            {/* FIX #15: removed dangerouslySetInnerHTML scrollbar hack.
          If scrollbar hiding is needed, add to globals.css:
            .hide-scrollbar { scrollbar-width: none; }
            .hide-scrollbar::-webkit-scrollbar { display: none; }
      */}

            {/* FIX #19: Skip link for keyboard/screen-reader users */}
            <a
                href="#after-vision-showcase"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4
                   focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2
                   focus:text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Skip 3D showcase
            </a>

            {/* ── Pinned viewport ─────────────────────────────── */}
            <div
                ref={pinRef}
                className="relative flex h-screen w-full items-center justify-center"
            >
                {/* ── Info cards overlay ─────────────────────────── */}
                {/* FIX #18: semantic list for card collection */}
                <div
                    className="pointer-events-none absolute inset-0 z-20"
                    role="list"
                    aria-label="Design capabilities"
                >
                    {CARDS.map((card, i) => (
                        <InfoCard
                            key={card.id}
                            ref={(el: HTMLDivElement | null) => {
                                cardRefs.current[i] = el;
                            }}
                            title={card.title}
                            desc={card.desc}
                            className={`
                ${card.position}
                pointer-events-auto
                opacity-0
              `}
                        // ↑ FIX #3: CSS opacity-0 prevents FOUC before GSAP runs.
                        //   GSAP's inline `opacity` override takes priority.
                        />
                    ))}
                </div>

                {/* ── 3D Canvas ─────────────────────────────────── */}
                {/* FIX #17: accessible role + label for the 3D scene */}
                <div
                    className="absolute inset-0 z-10"
                    role="img"
                    aria-label="Rotating 3D headset model showcasing design capabilities"
                >
                    <Canvas
                        camera={{ position: CAMERA_POS, fov: CAMERA_FOV }}
                        // FIX #11: cap DPR to prevent 9× pixel rendering on retina
                        dpr={[1, 1.5]}
                        gl={{
                            antialias: true,
                            alpha: false, // opaque BG — saves compositing cost
                            powerPreference: "high-performance", // FIX #12
                        }}
                        // Allow scroll-through on touch devices
                        style={{ touchAction: "pan-y" }}
                        onCreated={() => setIsCanvasReady(true)}
                    >
                        {/* Consolidated lighting rig */}
                        <ambientLight intensity={1.5} />
                        <pointLight position={[10, 10, 10]} intensity={1.5} />
                        <spotLight
                            position={[-10, 10, 10]}
                            angle={0.15}
                            penumbra={1}
                            intensity={1}
                        />
                        <StudioLights />

                        <Center>
                            {/* Group OUTSIDE Suspense so GSAP ref is always available */}
                            <group ref={groupRef}>
                                {/* FIX #14: Suspense boundary with visual feedback */}
                                <React.Suspense fallback={<SceneLoader />}>
                                    <VisionModel scale={0.8} />
                                </React.Suspense>
                            </group>
                        </Center>

                        {/* FIX #13: explicit resolution cap */}
                        <ContactShadows
                            position={[0, -2, 0]}
                            opacity={0.4}
                            scale={20}
                            blur={2}
                            far={4.5}
                            resolution={256}
                        />
                    </Canvas>
                </div>
            </div>

            {/* Skip-link target */}
            <div id="after-vision-showcase" />
        </section>
    );
}