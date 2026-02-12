"use client";

import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import Image from 'next/image';
import { TabsDemo } from './TabsComponent';

export default function CreativeLabUI() {
    const mainRef = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLDivElement>(null);
    const gloveImageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // --- 1. SMOOTH SCROLL (LENIS) ---
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // --- 2. GSAP SCROLL ANIMS ---
        gsap.registerPlugin(ScrollTrigger);

        // Parallax for Section 01
        gsap.to(heroImageRef.current, {
            y: -100,
            ease: "none",
            scrollTrigger: {
                trigger: heroImageRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });

        // Parallax for Section 02 (Glove)
        gsap.to(gloveImageRef.current, {
            y: -150,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
                trigger: gloveImageRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });

        // Fade-in Reveal for text blocks
        gsap.utils.toArray('.reveal').forEach((elem: any) => {
            gsap.fromTo(elem,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 90%",
                    }
                }
            );
        });

        return () => lenis.destroy();
    }, []);

    return (
        <div ref={mainRef} className="bg-white text-black font-sans selection:bg-orange-600 selection:text-white overflow-x-hidden">



            {/* --- SECTION 01: MAN IN RED --- */}
            <section className="relative min-h-screen grid grid-cols-1 md:grid-cols-12 items-center px-6 md:px-16 pt-32 md:pt-0">

                {/* Left Branding Column */}
                <div className="md:col-span-3 flex flex-col justify-between h-[60vh] md:h-[75vh] z-20">
                    <h1 className="text-8xl md:text-[11rem] font-bold tracking-tighter leading-none reveal">
                        labs.
                    </h1>
                    <div className="reveal">
                        <span className="text-7xl font-black rotate-180 [writing-mode:vertical-lr] tracking-tighter opacity-100 flex flex-col items-start justify-center gap-3">
                            <small>{"[ "}Education {" ]"}</small>
                            <span>002</span>
                        </span>
                    </div>
                </div>

                {/* Hero Imagery Column */}
                <div className="md:col-span-9 relative flex items-center justify-end w-full">
                    {/* Backing Orange Bar */}
                    <div className="absolute left-[-10%] md:left-0 right-0 h-32 md:h-52 bg-[#FF4500] z-0 flex items-center px-6 md:px-12">
                        <div className="bg-black text-white p-2 md:p-6 cursor-pointer hover:scale-110 transition-transform rounded-full">
                            <ArrowDown size={24} />
                        </div>
                    </div>

                    <div ref={heroImageRef} className="relative z-10 w-full md:w-[80%] h-[50vh] md:h-[80vh] overflow-hidden">
                        <Image
                            src="/images/design.png"
                            className="w-full h-[120%] object-contain contrast-125 brightness-90"
                            alt="Lab Industrial Hero"
                            fill
                            priority
                        />
                    </div>

                    {/* Vertical Floating Label */}
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden xl:block">
                        <div className="rotate-90 origin-right text-[10px] tracking-[0.4em] font-bold uppercase whitespace-nowrap space-x-12 opacity-40">
                            <span>Educational journey</span>
                            <span>© labs.mickey 2026</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- SECTION 02: THE GLOVE --- */}
            <section className="relative min-h-screen px-4 md:px-10 py-20 md:py-0">




                {/* Right Content Column */}
                <div className="w-full reveal">
                    <TabsDemo />
                </div>
            </section>

        </div>
    );
}