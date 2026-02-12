"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const projects = [
    {
        id: "01",
        title: "Milk Bottle Design",
        subtitle: "personal project",
        color: "bg-[#F3C677]", // Warm Yellow
        textColor: "text-white",
    },
    {
        id: "02",
        title: "Nota Speaker",
        subtitle: "school group project",
        color: "bg-[#9BA9D4]", // Muted Blue
        textColor: "text-white",
    },
    {
        id: "03",
        title: "Puzzle - Kid Furniture",
        subtitle: "group project",
        color: "bg-[#D4B5B5]", // Soft Rose
        textColor: "text-white",
    },
    {
        id: "04",
        title: "Summy - Prod Design",
        subtitle: "group project",
        color: "bg-[#A7C5C5]", // Sage Teal
        textColor: "text-white",
    },
    // {
    //     id: "05",
    //     title: "Nomadic Future City",
    //     subtitle: "school group project",
    //     color: "bg-[#E6E0EB]", // Lavender
    //     textColor: "text-[#5A5A5A]",
    // },
    // {
    //     id: "06",
    //     title: "Personal Projects",
    //     subtitle: "",
    //     color: "bg-red-200", // Pink Coral
    //     textColor: "text-white",
    // },
    {
        id: "07",
        title: "Puzzle - Kid Furniture",
        subtitle: "group project",
        color: "bg-[#D4B5B5]", // Soft Rose
        textColor: "text-white",
    },
];

export default function Portfolio() {
    const containerRef = useRef(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance Animation
            gsap.from(cardsRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main
            ref={containerRef}
            className="flex min-h-screen w-full flex-col lg:flex-row overflow-hidden bg-white py-4"
        >
            {projects.map((project, index) => (
                <div
                    key={project.id}
                    //ref={(el) => { if (el) cardsRef.current[index] = el; }}
                    className={`group relative flex flex-1 flex-col justify-start p-3 transition-all duration-500 ease-in-out lg:h-screen lg:hover:flex-[1.5] p-4 ${project.color} ${project.textColor}`}
                >
                    {/* Project Number */}
                    <div className="mb-2">
                        <span className="text-5xl font-bold opacity-80 lg:text-7xl">
                            {project.id}
                        </span>
                    </div>

                    {/* Titles */}
                    <div className="z-10">
                        <h2 className="text-2xl font-bold leading-tight lg:text-3xl">
                            {project.title}
                        </h2>
                        <p className="mt-1 text-xs uppercase tracking-widest opacity-70">
                            {project.subtitle}
                        </p>
                    </div>

                    {/* Placeholder for 3D Assets (Matching the image layout) */}
                    <div
                        className="relative mt-auto h-64 w-full overflow-hidden lg:h-[60%]"
                    >
                        <figure
                            className="absolute inset-0 flex items-center justify-center transition-transform duration-700 group-hover:scale-110 p-2"
                        >
                            {/* In a real app, use <Image /> here. 
                  For now, we use a styled div to mimic the 3D aesthetic.
               */}

                            <Image
                                src="/images/design-man.png"
                                alt="image"
                                priority
                                fill
                                className="h-4/5 w-4/5 rounded-3xl border border-white/30 flex items-center justify-center object-contain"
                            />

                        </figure>
                    </div>

                    {/* Hover Overlay Effect */}
                    <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-5 lg:block hidden" />
                </div>
            ))}
        </main>
    );
}