

import { motion } from "motion/react";
import { Badge } from "../ui/badge";



const stats = [
    { label: "Location", value: "Ghana" },
    { label: "Active Users", value: "300K+" },
    { label: "Social", value: "@mickey_labs" },
    { label: "Global Reach", value: "24/7 Support" },
];
export default function TextsDemo() {
    return (
        <div className="relative z-20 max-w-xl">
            <div
            // initial={{ opacity: 0, x: -20 }}
            // whileInView={{ opacity: 1, x: 0 }}
            // transition={{ duration: 0.8 }}
            >
                <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6"
                >
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <Badge variant="secondary">Live Global Network</Badge>
                </div>

                <h2 className="text-4xl md:text-6xl text-white tracking-tighter mb-6">
                    Connect from wherever, <br />
                    <span className="text-neutral-500">whenever.</span>
                </h2>

                <p className="text-neutral-400 text-sm max-w-md mb-12">
                    Power your workflow and scale effortlessly by managing your presence across international borders with realtime live global network.
                </p>

                {/* Stats Grid inspired by download (6).jpeg */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase text-neutral-500 font-semibold">
                                {stat.label}
                            </span>
                            <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                {stat.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
