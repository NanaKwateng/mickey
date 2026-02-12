'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type SlideInTextLinesProps = {
    lines?: string[]
    direction?: 'left' | 'right'
    className?: string
    lineClassName?: string
}

export default function SlideInTextLines({
    lines = [],
    direction = 'left',
    className = '',
    lineClassName = '',
}: SlideInTextLinesProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        if (!lines.length) return

        const mm = gsap.matchMedia()

        mm.add(
            {
                // Accessibility: reduced motion
                reduce: '(prefers-reduced-motion: reduce)',
                // Default motion
                motion: '(prefers-reduced-motion: no-preference)',
            },
            (context) => {
                const { reduce } = context.conditions as {
                    reduce: boolean
                    motion: boolean
                }

                // If reduced motion is enabled, fade only
                if (reduce) {
                    gsap.fromTo(
                        '.slide-line',
                        { opacity: 0 },
                        {
                            opacity: 1,
                            scrollTrigger: {
                                trigger: containerRef.current,
                                start: 'top 90%',
                                end: 'top 60%',
                                scrub: true,
                            },
                        }
                    )
                    return
                }

                // 🔥 Full motion version
                const baseX = direction === 'left' ? -180 : 180

                gsap.utils.toArray<HTMLElement>('.slide-line').forEach(
                    (line, index) => {
                        const speed = 1 + index * 0.15 // per-line parallax factor

                        gsap.fromTo(
                            line,
                            {
                                x: baseX * speed,
                                opacity: 0,
                            },
                            {
                                x: 0,
                                opacity: 1,
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: containerRef.current,
                                    start: 'top 85%',
                                    end: () =>
                                        `+=${window.innerHeight * 1.6}`, // 🔥 dynamic scroll distance
                                    scrub: 1.4,
                                    onUpdate(self) {
                                        /**
                                         * Velocity-based motion
                                         * Clamp to avoid aggressive jumps
                                         */
                                        const velocity = gsap.utils.clamp(
                                            -300,
                                            300,
                                            self.getVelocity()
                                        )

                                        gsap.to(line, {
                                            x: velocity * 0.02,
                                            overwrite: 'auto',
                                            duration: 0.2,
                                            ease: 'power2.out',
                                        })
                                    },
                                },
                            }
                        )
                    }
                )
            }
        )

        return () => mm.revert()
    }, [lines, direction])

    return (
        <div ref={containerRef} className={className}>
            {lines.map((line, index) => (
                <p
                    key={index}
                    className={`slide-line will-change-transform ${lineClassName}`}
                >
                    {line}
                </p>
            ))}
        </div>
    )
}
