'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register safe check for SSR environments
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

type FadeInTextBlockProps = {
    title?: string
    description?: string
    subDescription?: string
    className?: string
    titleClassName?: string
    descriptionClassName?: string
    subDescriptionClassName?: string
}

export default function FadeInTextBlock({
    title,
    description,
    subDescription,
    className = '',
    titleClassName = '',
    descriptionClassName = '',
    subDescriptionClassName = '',
}: FadeInTextBlockProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        if (!containerRef.current) return

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    // Start: When top of element hits 85% of viewport height (Near bottom)
                    start: 'top 85%',
                    // End: When top of element hits 45% of viewport height (Center screen)
                    // This ensures text is fully readable by the time it's in the middle.
                    end: 'top 45%',
                    scrub: 0.5, // Slight smoothing for premium feel, but fast enough to read
                },
            })

            if (title) {
                tl.fromTo(
                    '.fade-title',
                    { opacity: 0, y: 20 }, // Increased Y for more dramatic entry
                    { opacity: 1, y: 0, ease: 'power2.out' },
                    0
                )
            }

            if (description) {
                tl.fromTo(
                    '.fade-description',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, ease: 'power2.out' },
                    0.1 // Reduced delay so it appears quickly after title
                )
            }

            if (subDescription) {
                tl.fromTo(
                    '.fade-sub',
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, ease: 'power2.out' },
                    0.2 // Reduced delay
                )
            }
        }, containerRef)

        return () => ctx.revert()
    }, [title, description, subDescription])

    return (
        <div
            ref={containerRef}
            className={`flex flex-col gap-2 ${className}`}
        >
            {title && (
                <h2 className={`fade-title will-change-[opacity,transform] ${titleClassName}`}>
                    {title}
                </h2>
            )}
            {description && (
                <p className={`fade-description will-change-[opacity,transform] ${descriptionClassName}`}>
                    {description}
                </p>
            )}
            {subDescription && (
                <p className={`fade-sub will-change-[opacity,transform] ${subDescriptionClassName}`}>
                    {subDescription}
                </p>
            )}
        </div>
    )
}