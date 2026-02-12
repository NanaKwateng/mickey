"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "../ui/badge";

const SheetReplit = dynamic(
    () => import("../ux/SheetReplit").then(mod => mod.SheetReplit),
    { ssr: false }
);


// Import Data
// Note: In a real app, import this from a separate file. 
// For now, assume the constant PROJECTS from step 1 is declared here.

import { PROJECTS } from "@/src/types/projects"

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // 1. Reveal Items on Scroll
        const items = gsap.utils.toArray<HTMLElement>(".project-item");

        items.forEach((item) => {
            const title = item.querySelector(".project-title");
            const desc = item.querySelector(".project-desc");
            const triggerBtn = item.querySelector(".sheet-trigger-wrapper"); // Wrapper for the button
            const img = item.querySelector(".project-image-wrapper");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "top 80%", // Animates when item is 80% down viewport
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.from(title, { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" })
                .from(desc, { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
                .from(triggerBtn, { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
                .from(img, {
                    scale: 0.9,
                    opacity: 0,
                    filter: "blur(10px)",
                    duration: 0.8,
                    ease: "expo.out"
                }, "-=0.6");
        });

        // 2. Floating Orbs (Optimized)
        // Using force3D: true pushes this to the GPU
        gsap.to(".orb", {
            y: "random(-50, 50)",
            x: "random(-30, 30)",
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 2,
            force3D: true
        });

    }, { scope: container });

    return (
        // CHANGED: bg-neutral-200 to bg-neutral-950. 
        // You cannot have text-white on neutral-200 (light gray).
        <section
            ref={container}
            id="projects"
            className="relative text-white min-h-screen py-24 px-4 md:px-8 overflow-hidden bg-neutral-950"
            aria-label="Our Projects and Workflow"
        >

            {/* HEADER */}
            <header className="mx-auto py-20 text-center space-y-4 max-w-2xl relative z-10">
                <Badge
                    variant="ghost"
                    className="text-transparent bg-clip-text bg-gradient-to-l from-blue-300 via-pink-400 to-purple-500"
                >
                    {`[ MickeyLabs Workflow ]`}
                </Badge>

                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                    Summarised Roadmap
                </h2>

                <p className="text-md text-zinc-400">
                    A strategic overview of how we integrate, architect, and initiate workflows to deliver excellence.
                </p>
            </header>

            {/* ORBS */}
            <div className="orb absolute top-[10%] left-[-5%] w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="orb absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

            {/* LIST */}
            <div className="max-w-7xl space-y-32 mx-auto py-12 relative z-10">
                {PROJECTS.map((project, index) => (
                    <article
                        key={index}
                        className={`project-item flex flex-col lg:flex-row items-start gap-12 lg:gap-24 ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                            }`}
                    >
                        {/* TEXT CONTENT */}
                        <div className="flex-1 space-y-8 lg:text-left">
                            <h3 className="project-title text-3xl tracking-tighter whitespace-pre-line uppercase italic text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                                {project.title}
                            </h3>

                            <p className="project-desc text-zinc-400 md:text-sm max-w-md mx-auto lg:mx-0">
                                {project.description}
                            </p>

                            {/* SHEET TRIGGER */}
                            {/* Wrapper div for GSAP targeting */}
                            <div className="sheet-trigger-wrapper flex justify-start">
                                <SheetReplit project={project} />
                            </div>
                        </div>

                        {/* IMAGE CONTENT */}
                        <figure className="project-image-wrapper flex-1 relative aspect-[4/3] w-full rounded-[30px] overflow-hidden group">
                            {/* Mask Overlay */}
                            <div className="absolute inset-0 z-10 rounded-[30px] pointer-events-none ring-1 ring-white/10" />

                            <Image
                                src={project.image}
                                alt={`Visual representation of ${project.title}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw" // SEO/PERFORMANCE: Critical for responsive loading
                                className="object-cover transition-transform duration-700 scale-100 group-hover:scale-105"
                                priority={index === 0} // Load first image immediately
                            />

                            {/* Gradient Overlay for Text Readability if needed */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                        </figure>
                    </article>
                ))}
            </div>

            {/* DECORATIVE ELEMENTS (Reduced opacity for subtlety) */}
            <div className="absolute bottom-[-10%] left-[-10%] opacity-10 pointer-events-none w-[600px] h-[600px] animate-spin-slow">
                <div className="relative w-full h-full border-[40px] border-zinc-800 rounded-full flex items-center justify-center">
                    <div className="w-[80%] h-[1px] bg-zinc-700 rotate-45" />
                    <div className="w-[80%] h-[1px] bg-zinc-700 -rotate-45" />
                </div>
            </div>
        </section>
    );
}