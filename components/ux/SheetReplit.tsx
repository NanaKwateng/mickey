"use client";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

// Import the interface defined above

import { ProjectData } from "@/src/types/projects";

interface SheetReplitProps {
    project: ProjectData;
}

export function SheetReplit({ project }: SheetReplitProps) {
    const { details } = project;

    return (
        <Sheet>
            <SheetTrigger asChild>
                {/* ACCESSIBILITY: Aria-label for context */}
                <Button
                    variant="secondary"
                    size="default"
                    className="rounded-3xl text-md font-semibold bg-white text-black hover:bg-zinc-200 transition-colors"
                    aria-label={`View detailed use case for ${project.title}`}
                >
                    View Use Case
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:w-[550px] sm:max-w-[100vw] flex flex-col p-0 border-l border-zinc-800 bg-zinc-950 text-zinc-100">
                <ScrollArea className="h-full w-full">
                    <div className="flex flex-col min-h-full">

                        {/* HEADER */}
                        <SheetHeader className="p-8 pb-4 border-b border-zinc-800">
                            <Badge variant="outline" className="w-fit mb-2 text-zinc-400 border-zinc-700">Case Study</Badge>
                            <SheetTitle className="text-3xl font-bold text-white whitespace-pre-line">
                                {details.heading}
                            </SheetTitle>
                            <SheetDescription className="text-zinc-400 text-lg">
                                {details.subheading}
                            </SheetDescription>
                        </SheetHeader>

                        {/* BODY CONTENT */}
                        <div className="p-8 space-y-10">
                            {/* Dynamic Phases */}
                            <div className="space-y-8">
                                {details.phases.map((phase, i) => (
                                    <section key={i} className="relative pl-6 border-l border-zinc-800">
                                        <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-zinc-950" />

                                        <span className="text-xs font-mono text-blue-400 mb-1 block">Phase {phase.phase}</span>
                                        <h4 className="font-semibold text-xl text-zinc-100 mb-2">{phase.title}</h4>
                                        <p className="text-sm leading-relaxed text-zinc-400">
                                            {phase.description}
                                        </p>
                                    </section>
                                ))}
                            </div>
                        </div>

                        {/* FOOTER - Pushed to bottom */}
                        <div className="mt-auto p-6 border-t border-zinc-800 bg-zinc-900/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">System Status</span>
                                        <span className="text-sm font-bold text-green-400">Operational & Reliable</span>
                                    </div>
                                </div>
                                <SheetClose asChild>
                                    <Button variant="outline" className="border-zinc-700 hover:bg-zinc-800 text-zinc-300">
                                        Close
                                    </Button>
                                </SheetClose>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}