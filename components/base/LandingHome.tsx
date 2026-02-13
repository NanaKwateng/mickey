"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// FIX #18: removed Draggable import — replaced with pointer-based drag-to-scroll
import { RotateCcw } from "lucide-react";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ──────────────────────────────────────────────────────
const VIEWPORT_LEFT_OFFSET = 0.4; // slider starts at 40% viewport width
const SCRUB_SMOOTHING = 1; // seconds of ScrollTrigger catch-up
const RESTART_THRESHOLD = 0.9; // show restart at 90% scroll progress

// ─── Portfolio data ─────────────────────────────────────────────────
// FIX #15: descriptive alt text for screen readers & SEO
const PORTFOLIO_ITEMS = [
    {
        id: "minimalism",
        src: "/images/blog.jpeg",
        alt: "Minimal design layout showcasing clean typography and generous whitespace",
        category: "Minimal",
        title: "Minimalism",
        desc: "STYLE. /360°",
    },
    {
        id: "informative",
        src: "/images/blog1.jpeg",
        alt: "Aesthetic editorial design with bold visual hierarchy",
        category: "Aesthetic",
        title: "Informative",
        desc: "PORT. GQ",
    },
    {
        id: "reliable",
        src: "/images/blog2.jpeg",
        alt: "Modern interface design with contemporary layout patterns",
        category: "Modern",
        title: "Reliable",
        desc: "VOGUE /22",
    },
    {
        id: "descriptive",
        src: "/images/blog3.jpeg",
        alt: "Clean descriptive layout emphasising readability and content flow",
        category: "Clean",
        title: "Descriptive ~ Readable",
        desc: "ARCH. DIGEST",
    },
    {
        id: "performance",
        src: "/images/blog4.jpeg",
        alt: "Robust high-performance web interface with optimised rendering",
        category: "Robust",
        title: "High Performance",
        desc: "TIME MAG",
    },
    {
        id: "user-focused",
        src: "/images/blog5.jpeg",
        alt: "Functional user-focused interface with intuitive navigation patterns",
        category: "Functional",
        title: "User Focused",
        desc: "LEICA /88",
    },
] as const;

// ─── Component ──────────────────────────────────────────────────────
export default function LandingHome() {
    const sectionRef = useRef<HTMLElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const restartRef = useRef<HTMLDivElement>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    // FIX #5: useEffect instead of useLayoutEffect (avoids SSR warning)
    // Initial state handled via CSS classes, so no FOUC
    useEffect(() => {
        const section = sectionRef.current;
        const slider = sliderRef.current;
        if (!section || !slider) return; // FIX #4: null guard

        // ── FIX #14: respect reduced motion ──
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            // Show as a static horizontally-scrollable container
            slider.style.cursor = "auto";
            section.style.overflowX = "auto";
            return;
        }

        // ── Calculate slide distance ──
        const getMoveAmount = () =>
            slider.scrollWidth - window.innerWidth * VIEWPORT_LEFT_OFFSET;

        const ctx = gsap.context(() => {
            gsap.set(slider, { x: 0 });

            const tween = gsap.to(slider, {
                x: () => -getMoveAmount(), // function form for resize recalculation
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    start: "top top",
                    end: () => `+=${getMoveAmount()}`,
                    scrub: SCRUB_SMOOTHING,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,

                    // FIX #3: DOM-level visibility toggle — zero React re-renders
                    onUpdate: (self) => {
                        const btn = restartRef.current;
                        if (!btn) return;

                        const visible = self.progress > RESTART_THRESHOLD;
                        btn.style.opacity = visible ? "1" : "0";
                        btn.style.pointerEvents = visible ? "auto" : "none";
                        btn.style.transform = visible ? "scale(1)" : "scale(0.9)";
                    },
                },
            });

            scrollTriggerRef.current = tween.scrollTrigger ?? null;
        }, section);

        // ── FIX #2: Pointer-based drag-to-scroll (replaces Draggable) ──
        // Converts horizontal drag into vertical scroll, which naturally
        // drives ScrollTrigger — zero transform conflicts.
        let isDragging = false;
        let startX = 0;
        let startScrollY = 0;

        const onPointerDown = (e: PointerEvent) => {
            if (e.button !== 0) return; // primary button only
            isDragging = true;
            startX = e.clientX;
            startScrollY = window.scrollY;
            slider.style.cursor = "grabbing";
            slider.setPointerCapture(e.pointerId);
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            const dx = startX - e.clientX;
            window.scrollTo({
                top: startScrollY + dx,
                behavior: "instant" as ScrollBehavior,
            });
        };

        const onPointerUp = () => {
            if (!isDragging) return;
            isDragging = false;
            if (slider) slider.style.cursor = "grab";
        };

        slider.addEventListener("pointerdown", onPointerDown);
        slider.addEventListener("pointermove", onPointerMove);
        slider.addEventListener("pointerup", onPointerUp);
        slider.addEventListener("pointercancel", onPointerUp);

        return () => {
            slider.removeEventListener("pointerdown", onPointerDown);
            slider.removeEventListener("pointermove", onPointerMove);
            slider.removeEventListener("pointerup", onPointerUp);
            slider.removeEventListener("pointercancel", onPointerUp);
            scrollTriggerRef.current = null;
            ctx.revert();
        };
    }, []);

    // ── Restart handler ──
    const handleRestart = useCallback(() => {
        const st = scrollTriggerRef.current;
        // Scroll to the ScrollTrigger's start position (not always top: 0
        // if this section isn't the first on the page)
        window.scrollTo({
            top: st ? st.start : 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <section
            ref={sectionRef}
            id="portfolio"
            aria-labelledby="portfolio-heading"
            // FIX #10: carousel semantics for assistive tech
            aria-roledescription="carousel"
            className="relative h-screen w-full overflow-hidden bg-[#f4f4f4] font-sans"
        >
            {/* ── Screen-reader section heading (FIX #12) ───── */}
            <h2 id="portfolio-heading" className="sr-only">
                Portfolio Showcase
            </h2>

            {/* ── Brand mark (decorative) ───────────────────── */}
            <div
                className="pointer-events-none absolute bottom-7 left-8 z-10
                   mix-blend-difference md:left-16"
                aria-hidden="true"
            >
                <p className="font-serif leading-[0.8] tracking-tighter text-white
                      text-[clamp(80px,15vw,220px)]">
                    Mike.
                </p>
            </div>

            {/* ── Slider track ──────────────────────────────── */}
            <div className="relative z-0 flex h-full items-center pb-24 pt-32">
                <div
                    ref={sliderRef}
                    // FIX #10: list semantics for card collection
                    role="list"
                    aria-label="Portfolio projects — scroll or drag horizontally to explore"
                    className="ml-[50vw] flex cursor-grab gap-12 pr-[10vw]
                     touch-none active:cursor-grabbing md:gap-24"
                >
                    {PORTFOLIO_ITEMS.map((item, i) => (
                        // FIX #13: <figure> + <figcaption> instead of <article>
                        <figure
                            key={item.id}
                            role="listitem"
                            className="flex h-full min-w-[75vw] flex-col justify-center
                         md:min-w-[420px]"
                        >
                            {/* ── Image ──────────────────────────────── */}
                            {/* FIX #1, #6: ONLY Tailwind classes — no inline style conflict */}
                            <div
                                className="group relative aspect-[4/3] w-full overflow-hidden
                           grayscale transition-[filter] duration-700
                           ease-in-out hover:grayscale-0
                           focus-within:grayscale-0"
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    priority={i < 2}
                                    loading={i < 2 ? "eager" : "lazy"} // FIX #17
                                    // FIX #16: responsive sizes for optimal srcset selection
                                    sizes="(max-width: 768px) 75vw, 420px"
                                    quality={80}
                                    // FIX #7: object-cover fills the frame cleanly
                                    className="object-cover transition-transform duration-700
                             ease-out group-hover:scale-[1.03]"
                                />
                            </div>

                            {/* ── Caption ────────────────────────────── */}
                            <figcaption className="mt-6">
                                {/* FIX #8: 9px → 11px minimum for readability */}
                                {/* FIX #9: gray-400 → gray-600 for 6:1 contrast on #f4f4f4 */}
                                <p className="text-[11px] font-bold uppercase tracking-[0.3em]
                              text-gray-600">
                                    {item.category}
                                </p>
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="mt-1 font-serif text-xl text-black md:text-2xl">
                                        {item.title}
                                    </h3>
                                    <p className="text-base font-light italic text-black/70
                                md:text-lg">
                                        — {item.desc}
                                    </p>
                                </div>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>

            {/* ── Restart button (FIX #3: ref-controlled, no re-renders) ── */}
            <div
                ref={restartRef}
                className="absolute bottom-12 right-12 z-50
                   transition-[opacity,transform] duration-500"
                style={{ opacity: 0, pointerEvents: "none", transform: "scale(0.9)" }}
            >
                <Button
                    variant="ghost"
                    onClick={handleRestart}
                    // FIX #11: descriptive aria-label
                    aria-label="Scroll back to start of portfolio gallery"
                    className="group flex flex-col items-center gap-2"
                >
                    <div
                        className="rounded-full border border-black/10 bg-black p-4
                       text-white shadow-xl transition-colors
                       group-hover:bg-white group-hover:text-black"
                    >
                        <RotateCcw className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest
                           text-black">
                        Restart
                    </span>
                </Button>
            </div>

            {/* ── Sidebar label (decorative) ────────────────── */}
            <div
                className="absolute left-6 top-1/2 hidden origin-left -translate-y-1/2
                   -rotate-90 md:block"
                aria-hidden="true"
            >
                <span className="text-xs font-bold uppercase tracking-[0.5em] text-black">
                    Portfolio +
                </span>
            </div>
        </section>
    );
}