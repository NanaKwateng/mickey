"use client";
import { useLayoutEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic'; // OPTIMIZATION: For lazy loading
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';

// Keep critical above-the-fold components as standard imports
import Header from '@/components/ux/Header';
import LandingHome from '@/components/base/LandingHome';
import Footer from '@/components/base/Footer'; // Keep footer standard or lazy load if very heavy

// OPTIMIZATION: Lazy load heavy/below-the-fold components
// This drastically reduces the initial JS bundle size
const AboutFull = dynamic(() => import('@/components/base/AboutFull'));
const Projects = dynamic(() => import('@/components/base/Projects'));
const TechStack = dynamic(() => import('@/components/base/TechStack'));
const ImagineText = dynamic(() => import('@/components/base/ImagineText'));
const AppleLaptop = dynamic(() => import('@/components/try/AppleVisionComponent'), { ssr: false }); // Disable SSR if it uses window/canvas
const TabletVisionExperience = dynamic(() => import('@/components/try/TabletView'));
const ApplePro = dynamic(() => import('@/components/base/ApplePro'), { ssr: false });
const ClientSay = dynamic(() => import('@/components/ux/ClientSay'));

gsap.registerPlugin(ScrollTrigger);

export default function FullCapsuleBuild() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaderFinished, setLoaderFinished] = useState(false); // State to remove loader from DOM

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoaderFinished(true) // Remove loader from accessibility tree after anim
      });

      // --- LOADER SEQUENCE ---
      tl.to(".loader-text span", {
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power4.out"
      })
        .to(".loader-text", { opacity: 0, delay: 0.5 }) // Reduced delay for faster LCP perception
        .to(".loader-top", { yPercent: -100, duration: 1, ease: "expo.inOut" }, "reveal")
        .to(".loader-bottom", { yPercent: 100, duration: 1, ease: "expo.inOut" }, "reveal")
        .from("nav", { y: -100, opacity: 0, duration: 0.8 }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // CONSTANTS
  const brandName = "MickeyLabs.";

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {/* SEMANTICS: Use <main> for the primary content wrapper */}
      <main ref={containerRef} className="bg-black text-white selection:bg-white selection:text-black min-h-screen">

        {/* 
          ACCESSIBILITY IMPROVEMENT:
          1. aria-hidden="true" on the visual spans so screen readers ignore the chopped letters.
          2. A hidden span with the full text for screen readers.
          3. Remove from DOM (conditional rendering) when done to prevent focus trapping.
        */}
        {!loaderFinished && (
          <div
            className="loader fixed inset-0 z-[1000] pointer-events-none flex flex-col"
            aria-hidden="true"
          >
            <div className="loader-top absolute top-0 w-full h-1/2 bg-[#e0fbfc]" />
            <div className="loader-bottom absolute bottom-0 w-full h-1/2 bg-[#e0fbfc]" />

            <div className="loader-text absolute inset-0 flex items-center justify-center overflow-hidden z-20">
              <h1 className="text-black text-3xl font-bold flex overflow-hidden">
                {/* Visual Text (Hidden from Screen Reader) */}
                {brandName.split("").map((char, i) => (
                  <span key={i} className="inline-block translate-y-full">
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h1>
            </div>
            {/* Screen Reader Only Text */}
            <span className="sr-only">Loading {brandName}</span>
          </div>
        )}

        {/* 
          SEMANTICS: 
          Header should be outside the main if possible, but inside the wrapper is fine 
          as long as the component uses the <header> tag.
        */}
        <Header />

        <LandingHome />

        {/* Render the rest - heavy components load as user scrolls or after hydration */}
        <AboutFull />
        <Projects />
        <TechStack />
        <ImagineText />

        {/* Heavy 3D/Canvas components */}
        <section aria-label="Product Showcase">
          <AppleLaptop />
          <TabletVisionExperience />
          <ApplePro />
        </section>

        <ClientSay />
        <Footer />
      </main>
    </ReactLenis>
  );
}