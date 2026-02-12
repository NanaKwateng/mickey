"use client";

import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { AnimatedTestimonialsDemo } from "./Testimonials";

export default function ClientSay() {
    // 1. Create a state to track if the component has mounted
    const [isMounted, setIsMounted] = useState(false);

    // 2. Set mounted to true once the browser loads the component
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section>
            <article className="mx-auto py-20 text-center space-y-3 text-white max-w-md relative">
                <Badge
                    variant={"secondary"}
                    className="text-transparent bg-clip-text bg-linear-to-l from-blue-300 via-20% to-pink-400"
                >
                    {"[ "} Voices of the people {" ]"}
                </Badge>

                <h2 className="text-3xl">
                    What clients Say.
                </h2>

                <p className="text-md text-zinc-400 font-thin">
                    Hear from clients and customers what they truly think and say about MickeyLabs.
                </p>
            </article>

            {/* 3. Only render the testimonials once mounted to avoid SSR mismatch */}
            {isMounted ? (
                <AnimatedTestimonialsDemo />
            ) : (
                <div className="h-[400px] w-full" /> // Placeholder to prevent layout shift
            )}
        </section>
    );
}