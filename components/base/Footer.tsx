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
            className="text-[13vw] font-bold text-center leading-none tracking-tighter select-none"
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

        {/* SCROLL TO TOP UTILITY */}
        <div
          className="mt-20 pt-8 border-t border-white/5 flex items-center justify-between flex-col md:flex-row text-white"
          onClick={() => lenis?.scrollTo(0)}
        >
          <p className="text-[10px] tracking-widest uppercase hover:text-white transition-colors">
            Copyright © {new Date().getFullYear()} MickeyLabs. All rights reserved.
          </p>
          <button className="text-[10px] tracking-widest uppercase hover:text-white transition-colors">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}