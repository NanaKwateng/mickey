"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SmoothScroll from '@/components/try/Lennis';
import { AlertDialogDemo } from '../library/AlertPopup';

export default function LandingPage() {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Entrance Animation Sequence
        tl.from(".nav-item", { y: -20, opacity: 0, duration: 1, stagger: 0.1 })
            .from(".hero-title", { y: 100, opacity: 0, duration: 1.5 }, "-=0.8")
            .from(".main-image", { scale: 1.2, opacity: 0, duration: 2 }, "-=1.2")
            .from(".accent-box", { x: 50, opacity: 0, duration: 1 }, "-=1")
            .from(".side-text", { x: 20, opacity: 0, duration: 1, stagger: 0.2 }, "-=0.8");
    }, { scope: container });

    return (
        <SmoothScroll>
            <div ref={container} className="relative min-h-screen bg-white text-black overflow-hidden z-0">

                <main className="grid grid-cols-12 min-h-screen items-center px-8 md:px-16 gap-8 relative bg-white">

                    {/* Background Decor */}
                    {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white/40 rounded-full blur-[120px] z-12"></div> */}

                    {/* Left Column */}
                    <div className="col-span-12 md:col-span-4 z-10 mt-20 md:mt-0">
                        <div className="side-text flex items-center gap-4 mb-32">
                            <AlertDialogDemo
                                src='/videos/person.mp4' poster='/images/design.png'
                                title='Watch the demo'
                            />

                        </div>
                        <h1 className="hero-title text-[clamp(8rem,15vw,16rem)] font-black leading-[0.8] tracking-tighter select-none">
                            Labs.
                        </h1>
                    </div>

                    {/* Center Column (Glove) */}
                    <div className="col-span-12 md:col-span-4 relative h-[70vh] md:h-screen flex items-center justify-center z-2">
                        <div className="main-image relative w-full h-full">
                            <Image
                                src="/images/shape.gif" // Ensure this is a high-quality transparent WebP
                                alt="Survivalist Glove"
                                fill
                                priority
                                className="absolute inset-0 object-contain"
                            />
                        </div>

                        {/* Orange CTA Box */}
                        <div className="accent-box absolute top-[25%] -right-4 md:-right-12 bg-[#FF4500] text-white p-4 w-55 shadow-2xl rounded-xl -z-1">
                            <p className="text-[9px] uppercase font-bold leading-tight tracking-wider">
                                Minimal <br /> Crafted Elements <br /> & Visual Language
                            </p>
                            {/* <button className="group mt-6 w-full flex justify-between items-center border border-white/20 px-3 py-2 text-[9px] font-bold hover:bg-white hover:text-[#FF4500] transition-colors duration-300">
                                EXPLORE <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button> */}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-12 md:col-span-4 flex flex-col items-end text-right z-10 h-full justify-center md:pt-40 py-12">
                        <div className="side-text rotate-90 origin-right text-[11px] font-black tracking-[0.3em] mb-32 border-b border-black pb-2">
                            01 —
                        </div>
                        <div className="side-text max-w-[180px]">
                            <p className="text-[10px] font-bold uppercase mb-4">Minimalism</p>
                            <p className="text-[9px] text-gray-500 font-medium leading-relaxed uppercase tracking-wide">
                                A simple and clean portfolio design. A lifestyle approach that focuses on essentials. Think: less clutter, more focus
                            </p>
                        </div>
                    </div>
                </main>

                {/* Floating Scroll Indicator */}
                {/* <div className="fixed bottom-0 right-0 bg-[#FF4500] p-8 cursor-pointer group">
                    <div className="group-hover:translate-y-1 transition-transform">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                            <path d="M7 13l5 5 5-5M12 18V6" />
                        </svg>
                    </div>
                </div> */}
            </div>
        </SmoothScroll>
    );
}