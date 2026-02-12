"use client";
import { useState, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SECTIONS = [
  { id: 0, label: "2026 - Current", title: "IT Faclilitator - Intern", sub: "Assisting the upcoming generation on  the skillset needed for development. ", img: "https://plus.unsplash.com/premium_photo-1661414432619-290cff769e15?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fElUfGVufDB8fDB8fHww" },
  { id: 1, label: "2025 - Further Studies", title: "On the job Training", sub: "Familiarized with the emerging technologies, learning new workflows as education was in session.", img: "https://images.unsplash.com/photo-1573495782952-e42bd3ea5a4d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fElUfGVufDB8fDB8fHww" },
  { id: 2, label: "2024 - Intern", title: "IT expert - NHIS", sub: "Worked with the expert team, solving real world problems by providing assistance with the technologies for patient health support.", img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fElUfGVufDB8fDB8fHww" },

  { id: 3, label: "2024 Intern", title: "Human Relations & Database Management", sub: "Providing community support for people through relations through effective communication strategies. Also managed the database for the organization.", img: "https://images.unsplash.com/photo-1770319125105-e69d454638d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D" }
];

export default function ColboInterface() {
  const [index, setIndex] = useState(0);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timerRef = useRef<gsap.core.Tween | null>(null);
  const container = useRef<HTMLDivElement>(null);

  // Auto-play and Progress Logic
  const startCycle = (targetIndex: number) => {
    if (timerRef.current) timerRef.current.kill();

    // Reset all bars to 0
    gsap.set(progressRefs.current, { height: "0%" });
    // Fill previous bars completely to maintain Apple-style "history"
    for (let i = 0; i < targetIndex; i++) {
      gsap.set(progressRefs.current[i], { height: "100%" });
    }

    timerRef.current = gsap.to(progressRefs.current[targetIndex], {
      height: "100%",
      duration: 5,
      ease: "none",
      onComplete: () => {
        const next = (targetIndex + 1) % SECTIONS.length;
        setIndex(next);
      }
    });
  };

  useGSAP(() => {
    startCycle(index);
    // Animate text entrance
    gsap.fromTo(".fade-content", { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.5 });
  }, { dependencies: [index], scope: container });

  return (
    <div ref={container} className="h-[600px] bg-[#0D0F11] text-[#9CA3AF] flex items-center justify-center p-4 md:p-10 font-sans overflow-hidden rounded-xl">

      <div className="w-full max-w-7xl grid grid-cols-12 gap-0 md:gap-10 items-center relative h-[600px]">

        {/* LEFT: Section Labels */}
        <div className="col-span-3 hidden md:flex flex-col justify-between h-[300px] text-[15px] uppercase">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className={`text-left transition-all duration-500 ${index === i ? 'text-white translate-x-2' : 'hover:text-gray-400'}`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* CENTER: Timeline & Content */}
        <div className="col-span-12 md:col-span-4 flex items-center gap-12">
          {/* Vertical Timeline Line */}
          <div className="relative w-[2px] h-[350px] bg-gray-800 hidden md:block rounded-full">
            {/* The Active Pill Indicator */}
            <div
              className="absolute w-[5px] h-10 bg-white -left-[0.45px] rounded-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{ top: `${(index / (SECTIONS.length - 1)) * 85}%` }}
            />
          </div>

          {/* Description Content */}
          <div className="fade-content flex flex-col gap-4">
            <h2 className="text-white text-2xl md:text-3xl font-medium tracking-tight leading-tight">
              {SECTIONS[index].title}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-[320px]">
              {SECTIONS[index].sub}
            </p>

            {/* Conditional Icons (Matches "Testing With" section) */}
            {index === 2 && (
              <div className="flex gap-4 mt-4">
                {['🥦', '🥩', '💧'].map((icon, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border border-gray-800 flex items-center justify-center grayscale hover:grayscale-0 cursor-pointer transition">
                    {icon}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Image Slider */}
        <div className="col-span-12 md:col-span-4 relative h-[400px] flex items-center justify-center">
          <div className="absolute bg-blue-500/5 blur-[100px] rounded-full border" />
          <figure className="relative w-full h-full">
            <Image
              src={SECTIONS[index].img}
              alt="Product View"
              fill
              className="absolute object-cover drop-shadow-[0_35px_35px_rgba(0,0,0,0.6)] transition-all duration-1000 rounded-3xl"
              priority
            />
          </figure>
        </div>

        {/* FAR RIGHT: Progress Bars */}
        <div className="col-span-12 md:col-span-1 flex md:flex-col items-center justify-center gap-6">
          {SECTIONS.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className="relative w-2 h-2 bg-gray-800 cursor-pointer rounded-full overflow-hidden"
            >
              <div
                ref={el => { progressRefs.current[i] = el; }}
                className="absolute top-0 left-0 w-full bg-white h-0"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}