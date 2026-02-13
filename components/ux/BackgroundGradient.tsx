"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import { Badge } from "../ui/badge";


export function BackgroundGradientDemo() {
    return (
        <div>
            <BackgroundGradient className="rounded-[22px] max-w-sm sm:p-3 bg-white dark:bg-zinc-900">
                {/* <img
                    src={`/jordans.webp`}
                    alt="jordans"
                    height="400"
                    width="400"
                    className="object-contain"
                /> */}
                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                    Locate me, let's talk
                </p>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    I'm always open to new ideas, collaborations, and opportunities. Whether you have a project in mind, a question, or just want to say hi, feel free to reach out.
                </p>
                <Badge variant={"default"} className="mt-3">
                    <IconAppWindow className="w-4 h-4" />
                    <span>Opened up for business</span>
                </Badge>
            </BackgroundGradient>
        </div>
    );
}
