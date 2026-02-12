import { useGSAP } from "@gsap/react"
import { useRef } from "react"
import { gsap } from 'gsap';
import { Plus } from 'lucide-react';

export default function ImagineText() {

    const container = useRef<HTMLElement>(null!)
    const heading1 = useRef<HTMLHeadingElement>(null!)
    const heading2 = useRef<HTMLHeadingElement>(null!)
    const plusIcons = useRef<HTMLDivElement>(null!)

    useGSAP(() => {
        // Timeline for the scroll animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 50%", // Animation starts when top of section hits 80% of viewport
                end: "bottom 40%",   // Animation ends when bottom of section hits 20%
                scrub: 1.5,       // Smoothly follows scroll with a 1.5s delay for "weight"
                toggleActions: "play reverse play reverse",
            }
        })

        // "Beyond Imagination" slides in from the LEFT
        tl.fromTo(heading1.current,
            { x: -200, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
            0 // Start at time 0
        )

        // The body text slides in from the RIGHT
        tl.fromTo(heading2.current,
            { x: 200, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power2.out" },
            0.2 // Start slightly after the first heading
        )

        // Plus icons slide up and stagger
        tl.fromTo(plusIcons.current.children,
            { y: 50, opacity: 0, rotate: -90 },
            { y: 0, opacity: 1, rotate: 0, stagger: 0.1, duration: 0.8, ease: "back.out(1.7)" },
            0.4
        )

    }, { scope: container })

    return (
        <section
            ref={container}
            className="relative h-screen flex items-center justify-center bg-white text-black py-1.2 lg:py-6 overflow-hidden"
        >
            <article className="max-w-7xl px-4 text-wrap tracking-tight space-y-3 w-full">

                <h1
                    ref={heading1}
                    className="text-[6vw] text-start my-8 font-bold"
                >
                    Beyond Imagination..
                </h1>

                <h1
                    ref={heading2}
                    className="ml-auto font-normal text-[3vw] lg:text-[2.5vw] text-right leading-tight max-w-[80%]"
                >
                    Crafted with <span className="font-semibold">precision</span>, built with <span className="font-semibold">confidence</span> with each design detailed to <span className="font-semibold">communicate</span> a different <span className="font-semibold">idea</span> <br />
                    With every build - <span className="font-semibold"> aesthetic</span> and <span className="font-semibold">minimal</span> featuring modern design trends and <span className="font-semibold">best practices.</span>
                </h1>

                <div
                    ref={plusIcons}
                    className="flex justify-end gap-4 font-semibold text-right pt-6"
                >
                    <Plus size={32} />
                    <Plus size={32} />
                    <Plus size={32} />
                </div>

            </article>
        </section>
    )
}