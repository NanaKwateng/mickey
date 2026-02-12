"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

export function ImmersiveSection({ title, desc, align = "right" }: any) {
    const container = useRef(null)
    const textRef = useRef(null)

    // useGSAP(() => {
    //     const lines = gsap.utils.toArray('.animate-line')

    //     gsap.from(lines, {
    //         y: 30,
    //         opacity: 0,
    //         stagger: 0.1,
    //         duration: 1,
    //         ease: 'power2.out',
    //         scrollTrigger: {
    //             trigger: container.current,
    //             start: 'top 30%',
    //             toggleActions: 'play none none reverse'
    //         }
    //     })
    // }, { scope: container })

    return (
        <section ref={container} className="h-screen flex items-center px-12 md:px-24">
            <div className={`max-w-xl ${align === "right" ? "ml-auto" : "mr-auto"}`}>
                <h2 className="text-6xl font-bold text-white leading-tight uppercase">
                    {title.split(' ').map((word: string, i: number) => (
                        <span key={i} className="animate-line inline-block mr-4">{word}</span>
                    ))}
                </h2>
                <p className="animate-line mt-6 text-zinc-400 text-lg">{desc}</p>
                <button className="animate-line mt-8 border border-white/20 px-8 py-3 rounded-full text-white uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                    Learn More
                </button>
            </div>
        </section>
    )
}