"use client";
import React, { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from "next-themes";

gsap.registerPlugin(CustomEase);

export default function AwardsWinningMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const container = useRef(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    // 1. REGISTER THE "HOP" EASE [00:11:07]
    CustomEase.create("hop", "M0,0 C0.355,0.022 0.448,0.079 0.5,0.5 0.542,0.846 0.615,1 1,1");

    const ctx = gsap.context(() => {
      // Set initial states for entrance animations
      gsap.set(".menu-link-item p", { y: 225 });
      gsap.set(".menu-social-item", { y: 20, opacity: 0 });
      gsap.set(".menu-header-char", { y: 100, rotateY: 90, opacity: 0 });
      gsap.set(".menu-video-wrapper", { clipPath: "inset(100% 0% 0% 0%)" });

      // 2. DEFINE THE TIMELINE [00:12:39]
      timeline.current = gsap.timeline({ paused: true })
        // Main overlay reveal using clip-path [00:12:47]
        .to(".menu-overlay", {
          duration: 1.25,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "hop",
        })
        // Staggered link slide-up [00:13:14]
        .to(".menu-link-item p", {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
        }, "-=0.75")
        // Video reveal [00:13:45]
        .to(".menu-video-wrapper", {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "hop",
        }, "-=1")
        // Socials fade-in
        .to(".menu-social-item", {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
        }, "-=0.5")
        // Header character "flip" [00:14:06]
        .to(".menu-header-char", {
          y: 0,
          rotateY: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.75,
          ease: "power3.out"
        }, "-=0.8");
    }, container);

    return () => ctx.revert();
  }, []);

  // Sync menu state with timeline
  useLayoutEffect(() => {
    isOpen ? timeline.current?.play() : timeline.current?.reverse();
  }, [isOpen]);

  // Helper for letter animation [00:03:24]
  const renderSplitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span key={i} className="menu-header-char inline-block">{char === " " ? "\u00A0" : char}</span>
    ));
  };

  return (
    <div ref={container} className="relative">
      {/* 1. NAVBAR SECTION [00:01:17] */}
      <nav className="fixed top-0 w-full flex justify-between items-center px-6 md:px-10 py-8 z-1001 mix-blend-difference text-white">
        <div className="text-2xl font-black tracking-tighter">CAPSULE.</div>
        
        <div className="flex items-center gap-6">
          {/* THEME TOGGLE (Shadcn) */}
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* MENU TOGGLE BUTTON [00:04:20] */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-4 group focus:outline-none"
          >
            <div className="relative w-8 h-0.5 bg-white transition-all">
              <div className={`absolute w-full h-full bg-white transition-all duration-500 ${isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`} />
              <div className={`absolute w-full h-full bg-white transition-all duration-500 ${isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`} />
            </div>
            <p className="hidden md:block text-[10px] uppercase tracking-[0.3em] font-bold">
              {isOpen ? "Close" : "Menu"}
            </p>
          </button>
        </div>
      </nav>

      {/* 2. MENU OVERLAY [00:07:41] */}
      <div className="menu-overlay fixed inset-0 bg-neutral-950 z-1000 [clip-path:polygon(0%_0%,100%_0%,100%_0%,0%_0%)] flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT COLUMN: LINKS & VIDEO [00:02:11] */}
        <div className="w-full md:w-[60%] h-full p-8 md:p-20 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 pt-32">
           <div className="flex flex-col">
              {["Index", "Work", "About", "Contact"].map((link, i) => (
                <div key={i} className="menu-link-item overflow-hidden h-[15vw] md:h-[8vw]">
                   <p className="text-[12vw] md:text-[8vw] font-bold leading-none tracking-tighter cursor-pointer hover:italic transition-all uppercase">
                      {link}
                   </p>
                </div>
              ))}
           </div>

           {/* Video Section [00:08:49] */}
           <div className="menu-video-wrapper w-full max-w-md aspect-video bg-neutral-900 rounded-xl overflow-hidden mt-10">
              <video autoPlay muted loop className="w-full h-full object-cover grayscale opacity-50">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              </video>
           </div>
        </div>

        {/* RIGHT COLUMN: SOCIALS & HEADER [00:03:00] */}
        <div className="w-full md:w-[40%] h-full p-8 md:p-20 flex flex-col justify-between bg-[#080808] md:pt-40">
            <div className="grid grid-cols-2 gap-10 mt-10 md:mt-0">
               <div className="flex flex-col gap-2">
                 <p className="text-[10px] uppercase opacity-30 tracking-widest mb-4 font-bold">Socials</p>
                 {["Instagram", "Twitter", "LinkedIn"].map((s, i) => (
                   <a key={i} className="menu-social-item block text-xs md:text-sm font-medium hover:text-neutral-400 uppercase tracking-widest">{s}</a>
                 ))}
               </div>
               <div className="flex flex-col gap-2">
                 <p className="text-[10px] uppercase opacity-30 tracking-widest mb-4 font-bold">Inquiries</p>
                 <a className="menu-social-item block text-xs md:text-sm underline underline-offset-4">hello@capsule.studio</a>
               </div>
            </div>

            {/* Large Footer Header [00:10:15] */}
            <div className="[perspective-1000px] mb-10">
               <h1 className="text-[15vw] md:text-[6vw] font-light leading-[0.8] text-white/10 uppercase italic">
                  {renderSplitText("Creative")}
               </h1>
            </div>
        </div>
      </div>
    </div>
  );
}