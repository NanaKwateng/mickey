"use client";
import { useLenis } from 'lenis/react';
import React from 'react';
import { Twitter, Github, Linkedin } from 'lucide-react';

export default function Footer() {
  const lenis = useLenis();

  const footerLinks = {
    Documentation: ["Getting Started", "API Reference", "Integrations", "Examples", "SDKs"],
    Resources: ["Changelog", "Pricing", "Status", "Webhooks"],
    Company: ["Blog", "Contact", "Customers", "Brand"],
    Legal: ["Privacy Policy", "Terms of Service"],
  };

  return (
    <footer className="bg-black text-[#888] px-6 py-20 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* BIG GLOSSY LOGO SECTION */}
        <div className="relative w-full mb-24 overflow-hidden">
          <h2
            className="text-[15vw] font-bold text-center leading-none tracking-tighter select-none"
            style={{
              background: "linear-gradient(to bottom, #333 0%, #111 50%, #000 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.5))"
            }}
          >
            MickeyLabs
          </h2>
          {/* Subtle fade overlay to match the image bottom-heavy darkness */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent h-full w-full" />
        </div>

        {/* BOTTOM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 text-sm">

          {/* Left Side: Address & Status */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-1">
              <p>2261 Market Street #5039</p>
              <p>San Francisco, CA 94114</p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full w-fit bg-white/5">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] text-white">All systems normal</span>
            </div>

            <div className="flex gap-4 opacity-60">
              <Twitter size={18} className="cursor-pointer hover:text-white transition-colors" />
              <Github size={18} className="cursor-pointer hover:text-white transition-colors" />
              <Linkedin size={18} className="cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          {/* Right Side: Links Mapping */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h4 className="text-white font-medium">{category}</h4>
              <ul className="space-y-2 text-[13px]">
                {links.map((link) => (
                  <li key={link} className="hover:text-white transition-colors cursor-pointer">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SCROLL TO TOP UTILITY */}
        <div
          className="mt-20 pt-8 border-t border-white/5 flex justify-end"
          onClick={() => lenis?.scrollTo(0)}
        >
          <button className="text-[10px] tracking-widest uppercase hover:text-white transition-colors">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}