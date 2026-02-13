import Image from 'next/image';
import Link from 'next/link';
import { AlertDialogDemo } from '../library/AlertPopup';

export default function LabLandingPage() {
    return (
        <div className="min-h-screen bg-[#F5F5F5] text-black font-sans selection:bg-black selection:text-white selection:bg-opacity-90">

            {/* 1. NAVIGATION BAR - Optimized for Screen Readers */}
            {/* <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-8 md:px-12">
                <div className="flex items-center gap-12">
                    <Link href="/transition" className="text-xl font-bold tracking-tighter" aria-label="Lab Home">
                        lab.®
                    </Link>
                    <nav className="hidden md:flex gap-8 items-center uppercase text-[10px] tracking-widest font-semibold">
                        <Link href="/shop" className="hover:line-through transition-all">Shop</Link>
                        <Link href="/tour" className="hover:line-through transition-all">Tour</Link>
                        <Link href="/explore" className="hover:line-through transition-all">Explore</Link>
                    </nav>
                </div>

                <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest">
                    <div className="flex gap-2" aria-hidden="true">
                        <span>EN</span>
                        <span className="opacity-30">FR</span>
                    </div>
                    <button className="md:hidden" aria-label="Open Menu">
                        <div className="w-6 h-[1px] bg-black mb-1"></div>
                        <div className="w-6 h-[1px] bg-black"></div>
                    </button>
                </div>
            </header> */}

            {/* 2. MAIN HERO SECTION */}
            <main className="relative flex flex-col items-center justify-center min-h-screen pt-20 px-6">

                {/* Decorative Background Text (SEO Hidden from Screen Readers) */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none opacity-[0.03] overflow-hidden"
                    aria-hidden="true"
                >
                    <span className="text-[30vw] font-black leading-none translate-y-20">LAB</span>
                    <span className="text-[30vw] font-black leading-none -translate-y-20">20</span>
                </div>

                {/* Hero Content Grid */}
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8 relative z-10">

                    {/* Left Metadata */}
                    <div className="lg:col-span-3 order-2 lg:order-1 flex flex-col gap-6">
                        <div className="space-y-1">
                            <h1 className="text-xl font-bold tracking-tighter uppercase">MickeyLabs</h1>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                                Crafted Creations — ©2026
                            </p>
                        </div>

                        {/* SEO Descriptive Text */}
                        <p className="max-w-[200px] text-[11px] leading-relaxed text-neutral-600">
                            Pushing the boundaries of digital and physical artifacts through experimental design and visual language.
                        </p>

                        <div className="flex gap-4 pt-4">
                            <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center grayscale">🌍</div>
                            <div className="w-8 h-8 rounded-xl border border-black/10 flex items-center justify-center grayscale">LAB</div>
                        </div>
                    </div>

                    {/* Center Product Image - Optimized with next/image */}
                    <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center items-center relative py-12">
                        <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] transition-transform duration-700 hover:scale-105">
                            <Link href="/transition">
                                <Image
                                    src="/images/blog2.jpeg" // Replace with actual asset
                                    alt="Experimental Mask Design - Lab Works Hero"
                                    fill
                                    priority
                                    className="object-contain drop-shadow-2xl"
                                    sizes="(max-width: 768px) 300px, 450px"
                                />
                            </Link>
                        </div>

                        {/* Float Detail Indicator */}
                        <div
                            className="absolute right-0 md:right-10 bottom-20 md:bottom-32 text-[9px] uppercase tracking-tighter border-l border-black/20 pl-4 py-2 hidden md:block"
                            aria-hidden="true"
                        >
                            <span className="block font-bold">01</span>
                            <span className="text-neutral-400">Minimalist<br />Crafted Designs.</span>
                        </div>
                    </div>

                    {/* Right Metadata / Stats */}
                    <div className="lg:col-span-3 order-3 hidden lg:flex flex-col items-end gap-12 text-right">
                        <div className="space-y-2">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Lab Summer<br />Collection 2026</span>
                        </div>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-neutral-400 [writing-mode:vertical-rl]">
                            Visual  — Elements 20 / 26
                        </p>
                    </div>
                </div>

                {/* 3. FOOTER / SIDEBAR ELEMENTS */}
                <footer className="absolute bottom-10 left-6 md:left-12 flex items-end gap-8">

                    <AlertDialogDemo src='/videos/Mikes.mp4' poster='/images/design.png' title='Listen to the story' />

                </footer>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 right-12 hidden md:flex flex-col items-center gap-4">
                    <div className="w-[1px] h-12 bg-black/10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-black animate-scroll-line" />
                    </div>
                    <span className="text-[10px] font-bold rotate-90 origin-center translate-y-2">↓</span>
                </div>
            </main>
        </div>
    );
}