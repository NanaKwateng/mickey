"use client";

import { useEffect, useRef } from 'react';
import { Plus, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import CreativeLabUI from '@/components/ux/Labs';
import Image from 'next/image';
import DropDownMenu from '@/components/library/SmoothDropdown';
import Link from 'next/link';
import AnimatedCollection from '@/components/library/AnimatedCollection';
import { Badge } from '@/components/ui/badge';
import VerticalTabs from '@/components/library/VerticalTabs';
import { AlertDialogDemo } from '@/components/library/AlertPopup';

export default function LabGsapEdition() {
    const containerRef = useRef<HTMLDivElement>(null);
    const section1Image = useRef<HTMLDivElement>(null);
    const section2Image = useRef<HTMLDivElement>(null);
    const verticalText = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 1. Initialize Smooth Scroll (Lenis)
        const lenis = new Lenis();
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // 2. Register GSAP Plugins
        gsap.registerPlugin(ScrollTrigger);

        // 3. Parallax Effect: Section 01 Image
        gsap.to(section1Image.current, {
            y: -80,
            ease: "none",
            scrollTrigger: {
                trigger: section1Image.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });

        // 4. Parallax Effect: Section 02 Image (The Glove)
        gsap.to(section2Image.current, {
            y: -120,
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
                trigger: section2Image.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });

        // 5. Parallax Effect: Floating "001" Text
        gsap.to(verticalText.current, {
            y: 50,
            ease: "none",
            scrollTrigger: {
                trigger: verticalText.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            }
        });

        return () => lenis.destroy();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#F2F2F2] text-black font-sans selection:bg-orange-600 selection:text-white overflow-x-hidden">

            {/* --- NAVIGATION --- */}
            <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-3 md:px-12 md:py-4 mix-blend-difference text-white">
                <div className="flex items-center gap-12">
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase hidden md:block">Welcome</span>
                    </div>
                </div>
                <div className="flex items-center gap-6 md:gap-12 text-[10px] font-bold tracking-[0.2em] uppercase">
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/transition" className="hover:line-through">Back</Link>
                    </div>
                    <DropDownMenu />
                </div>
            </nav>

            {/* --- SECTION 01: THE MAN IN RED --- */}
            <section className="relative min-h-screen flex flex-col md:grid md:grid-cols-12 items-center gap-6 px-6 md:px-12 pt-24 md:pt-0">

                {/* Left Column: Fixed Position Branding */}
                <div className="md:col-span-3 flex flex-col justify-between h-[70vh] py-12 md:py-25 lg:space-y-4">
                    <h1 className="text-7xl md:text-9xl font-semibold tracking-tighter leading-none z-20 lg:bg-[#F2F2F2] rounded-2xl">
                        Labs.
                    </h1>
                    <div ref={verticalText} className="md:block">
                        <span className="text-6xl font-semibold rotate-180 [writing-mode:vertical-lr] tracking-tighter opacity-100 flex flex-col items-start justify-center gap-3">
                            <small>{"[ "}My Self {" ]"}</small>
                            <span>001</span>
                        </span>
                    </div>
                </div>

                {/* Center/Right Column: Image with Parallax */}
                <div className="md:col-span-9 relative w-full flex items-center">
                    {/* Orange Stripe (Moves slightly slower than the image) */}
                    <div className="absolute left-[-15%] right-[-10%] h-32 md:h-48 bg-[#FF4500] z-0 flex rounded-3xl items-center px-4 md:px-10">
                        <div className="bg-black text-white p-2 rounded-full cursor-pointer mt-3 hover:bg-zinc-900 transition-colors">
                            <ArrowDown size={20} />
                        </div>
                    </div>

                    <div ref={section1Image} className="relative z-10 w-full h-[70vh] md:h-[68vh] md:w-[75%] ml-auto overflow-hidden">
                        <Image
                            src="/images/design-man.png"
                            className="w-full h-[120%] lg:h-[99%] object-contain contrast-125 absolute inset-0"
                            alt="Lab Wear"
                            fill
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* --- SECTION 02: THE GLOVE --- */}
            <section className="relative min-h-screen flex flex-col md:grid md:grid-cols-12 items-center gap-6 px-6 md:px-12 py-20 md:py-0 mt-32">

                <div
                    className="md:col-span-4 flex flex-col justify-between h-[60vh] md:py-32 md:order-1"
                >
                    <AlertDialogDemo
                        src='/videos/MickeyLabs.mp4' poster='/images/design.png'
                        title='Watch the story'
                    />

                    <article
                        className="space-y-8 text-left"
                    >
                        <h2
                            className="text-7xl md:text-9xl font-bold tracking-tighter leading-none text-shadow-md"
                        >
                            Mickey.
                        </h2>
                        <p
                            className="text-sm opacity-80 max-w-md mt-3"
                        >
                            Hi 👋, my name is Michael, a young, creative developer who focuses on user-first approach, transforming client and customer ideas into real world digital experiences.
                        </p>
                    </article>
                </div>

                <div
                    className="md:col-span-4 relative order-1 md:order-2 mb-12 flex items-center flex-col gap-8"
                >
                    <div
                        ref={section2Image} className="relative w-full aspect-[3/4] flex items-center justify-center"
                    >
                        <Badge
                            className="absolute top-3/9 md:top-2/7 -right-4 md:-right-4 w-30 h-10 bg-[#FF4500] z-20 text-[9px] text-white/90 leading-tight shadow-xl"
                        >
                            {"[ "}Mickey {" ]"}
                        </Badge>
                        <img
                            src="/images/me.png"
                            className="w-full h-full object-contain scale-110"
                            alt="Mickey"
                        />
                    </div>

                    <article
                        className="mx-auto text-center space-y-3"
                    >
                        <h3 className="text-md font-semibold">
                            Enthusiasm
                        </h3>

                        <p
                            className="text-sm tracking-tight leading-relaxed max-w-sm"
                        >
                            I love to brainstorm ideas, innovation, and also learn new things as I come along with them. With the nack of helping brands stand out, I have experience in effective communication, research and many more.
                        </p>
                    </article>
                </div>

                <div
                    className="md:col-span-4 md:pl-20 flex flex-col justify-center gap-8 order-3"
                >
                    <div className="space-y-4">
                        <h3 className='font-bold'> <span className=" border-b-2 border-orange-600 w-fit pb-1">About</span> Me</h3>
                        <p className="text-sm  opacity-80  tracking-widest max-w-md whitespace-prewrap">
                            I&apos;m pasionate in building user-frienldy, minimal and aesthetic, more functional app solutions that makes your brand stand out. Understanding <span className="text-orange-500">client workflow</span> makes it more easier for effective collaboration.
                        </p>

                        <p className="text-sm leading-relaxed opacity-80  tracking-widest max-w-md">
                            Weather from a tech or non-tech background, with collaboration and effective communication skills adapted for my workflow, client and customer ideas are transformed into modern digital experiences, hence, being in the modern tech race.
                        </p>
                    </div>

                </div>

                {/* Global Scroll Indicator */}
                <div className="absolute right-0 bottom-5 md:right-12 flex flex-col items-center gap-4">
                    <span className="text-[8px] font-bold tracking-[0.2em] uppercase [writing-mode:vertical-lr]">Explore</span>
                    <Link className="bg-orange-600 text-white p-2 rounded-full hover:scale-110 transition-transform cursor-pointer" href='#education'>
                        <ArrowDown size={12} />
                    </Link>
                </div>
            </section>

            {/* Decorative Parallax Bubbles */}
            <div className="fixed inset-0 -z-10 pointer-events-none" id='education'>
                <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-orange-600 rounded-full blur-[120px] opacity-60" />
                <div className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-white rounded-full blur-[150px] opacity-40" />
            </div>


            <CreativeLabUI />

            <AnimatedCollection />

            <VerticalTabs />

        </div>
    );
}