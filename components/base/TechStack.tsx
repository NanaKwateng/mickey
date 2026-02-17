"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    SiHtml5, SiCss3, SiJavascript, SiBootstrap,
    SiReact, SiNodedotjs, SiMongodb, SiNextdotjs,
    SiAdobephotoshop, SiAdobeaftereffects
} from "react-icons/si";
import { CheckCircle2Icon } from "lucide-react";
import { IconType } from "react-icons";

// Register plugin safely
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// ------------------------------------------------------------------
// Types & Data
// ------------------------------------------------------------------

interface TechItem {
    name: string;
    Icon: IconType;
    color: string;
}

const TECH_ICONS: TechItem[] = [
    { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", Icon: SiCss3, color: "#1572B6" },
    { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
    { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
    { name: "React", Icon: SiReact, color: "#61DAFB" },
    { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
    { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
    { name: "Next.js", Icon: SiNextdotjs, color: "#FFFFFF" },
    { name: "Photoshop", Icon: SiAdobephotoshop, color: "#31A8FF" },
    { name: "After Effects", Icon: SiAdobeaftereffects, color: "#CF96FD" },
];

export default function TechStack() {
    const containerRef = useRef<HTMLElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);
    const articleRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        if (!orbitRef.current) return;

        const ctx = gsap.context(() => {
            // 1. Setup: Distribute icons in a circle
            const items = itemsRef.current;
            const radius = 280; // Adjusted for better mobile/desktop balance
            const total = items.length;

            items.forEach((item, i) => {
                if (!item) return;
                const angle = (i / total) * Math.PI * 2;

                // Position items absolutely around the center
                gsap.set(item, {
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius,
                });
            });

            // 2. Main Orbit Animation
            // We rotate the container endlessly
            const orbitTl = gsap.to(orbitRef.current, {
                rotation: 360,
                duration: 60, // Slow, elegant rotation
                repeat: -1,
                ease: "none",
            });

            // 3. Counter-Rotation (The Polish)
            // We rotate individual icons in the opposite direction
            // so they always stay upright (readable) while orbiting.
            gsap.to(items, {
                rotation: -360,
                duration: 60,
                repeat: -1,
                ease: "none",
            });

            // 4. Hover Interactions (Pause mechanism)
            const orbitEl = orbitRef.current;
            orbitEl?.addEventListener("mouseenter", () => {
                gsap.to([orbitTl, ...gsap.getTweensOf(items)], { timeScale: 0, duration: 0.5 });
            });
            orbitEl?.addEventListener("mouseleave", () => {
                gsap.to([orbitTl, ...gsap.getTweensOf(items)], { timeScale: 1, duration: 0.5 });
            });

            // 5. Scroll Reveal for Text
            if (articleRef.current) {
                gsap.from(articleRef.current.children, {
                    scrollTrigger: {
                        trigger: articleRef.current,
                        start: "top 85%", // Triggers slightly earlier
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="w-full min-h-screen bg-black text-white py-20 px-4 flex flex-col items-center overflow-hidden"
            aria-label="Technology Stack"
        >
            {/* 
               Card Container
               Using 'group' here allows us to detect hover on the whole card easily if needed
            */}
            <div className="relative w-full max-w-7xl h-[600px] md:h-[700px] bg-gradient-to-br from-pink-800/80 to-orange-700/80 rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">

                {/* Decorative Background Glows */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-800/80 to-orange-700/80" />

                {/* Header Text */}
                <div className="absolute top-10 md:top-16 left-8 md:left-12 z-20 max-w-md">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                        Our Technologies
                    </h2>
                    <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-sm">
                        Empowered with modern tools and technologies, creating high-end optimizable web experiences.
                    </p>
                </div>

                {/* 
                   Orbit System 
                   Centering logic: top-[100%] moves it to bottom, then we adjust Y to peek out.
                */}
                <div className="absolute top-[95%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div
                        ref={orbitRef}
                        className="relative w-0 h-0 flex items-center justify-center cursor-grab active:cursor-grabbing will-change-transform"
                    >
                        {TECH_ICONS.map((item, idx) => (
                            <div
                                key={item.name}
                                ref={(el) => { if (el) itemsRef.current[idx] = el }}
                                className="absolute -ml-10 -mt-10 w-20 h-20 bg-zinc-950/80 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 hover:border-white/30 hover:bg-zinc-900 transition-all duration-300 will-change-transform"
                                title={item.name}
                                role="img"
                                aria-label={`${item.name} icon`}
                            >
                                <item.Icon
                                    size={40}
                                    color={item.color}
                                    className="drop-shadow-lg"
                                />
                                {/* Optional: Tooltip text can go here */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Information Article */}
            <article
                ref={articleRef}
                className="max-w-6xl w-full mx-auto mt-20 flex flex-col md:flex-row items-start justify-between gap-12 px-4 md:px-8"
            >
                <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-semibold text-white">Tech Stack & Components</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        A curated selection of modern tools used to build high-performance,
                        scalable, and beautiful user interfaces. Built for the next generation of the web, ensuring SEO optimization and lightning-fast load times.
                    </p>
                </div>

                <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-4">Core Principles</h3>
                    <ul className="space-y-3">
                        {[
                            "Optimized for performance and Core Web Vitals",
                            "Built for speed with Next.js Turbopack",
                            "Delivered with accessibility (WCAG) in mind"
                        ].map((text, i) => (
                            <li key={i} className="flex items-start gap-3 text-zinc-400 group">
                                <CheckCircle2Icon className="w-5 h-5 text-orange-500 mt-0.5 shrink-0 group-hover:text-pink-500 transition-colors" />
                                <span className="text-sm font-medium">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </article>
        </section>
    );
}