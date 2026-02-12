"use client"
import React from 'react'
import { motion } from 'framer-motion'

export default function Assembly() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-end px-6 md:px-20 lg:px-40">
            <div className="max-w-xl text-right">
                <motion.h2
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-7xl font-bold text-white uppercase leading-none"
                >
                    Super <br />
                    <span className="text-zinc-600">strong</span> <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-500">
                        Titanium
                    </span>
                </motion.h2>

                <div className="mt-8 p-6 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl inline-block text-left">
                    <h4 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">Material Science</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                        A brand-new aerospace alloy that can withstand disc loads up to 15 tons while remaining incredibly lightweight.
                    </p>
                    <div className="mt-4 text-5xl font-black text-white/10 italic">15 TONS</div>
                </div>
            </div>
        </div>
    )
}