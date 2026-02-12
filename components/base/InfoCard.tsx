"use client"
import React, { forwardRef } from 'react'

interface CardProps {
    title: string;
    desc: string;
    className?: string;
}

const CARD_DATA = [
    {
        id: 1,
        title: "Spatial Audio",
        desc: "Dual-driver pods for immersion.",
        icon: "🔊",
        fullDetail: "Features dynamic head tracking and personalized spatial audio. The dual-driver pods are designed to provide rich, deep bass and crisp high frequencies.",
        specs: ["Latency: <12ms", "Drivers: Dual-Active", "Tech: Beamforming"],
        pos: "top-[12%] left-[5%] md:left-[10%]",
        depth: 45
    },
    // ... repeat for other cards with unique content
];

export const InfoCard = forwardRef<HTMLDivElement, CardProps>(({ title, desc, className }, ref) => {
    return (
        <div
            ref={ref}
            className={`absolute p-4 md:p-6 rounded-xl border border-white/20 bg-white/[0.03] backdrop-blur-xl shadow-2xl opacity-0 translate-y-10 select-none overflow-hidden group ${className}`}
            style={{ width: 'clamp(160px, 45vw, 280px)' }} // Responsive width
        >
            {/* Specular highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

            {/* Internal Glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-400 blur-3xl rounded-full pointer-events-none" />

            <h3 className="text-white text-md md:text-xs font-semibold uppercase mb-1 md:mb-2 opacity-90">{title}</h3>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed font-light line-clamp-3">{desc}</p>
        </div>
    )
})

InfoCard.displayName = "InfoCard"