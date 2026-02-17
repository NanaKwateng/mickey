"use client";

import { usePathname } from "next/navigation";
import { componentsData } from "@/lib/data";
import { SidebarNav } from "@/components/ux/sidebar-nav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TableOfContents } from "@/components/ux/table-of-contents";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const slug = pathname.split("/").pop() || "";
    const currentData = componentsData[slug];

    return (
        <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-50">
            {/* Top Header */}
            <header className="sticky top-0 z-50 border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md">
                <div className="flex h-10 items-center px-8 justify-between">
                    <Button variant={"ghost"} size={"icon-xs"}>
                        <Link href={"/transition"}>
                            <ArrowLeft size={24} />
                        </Link>
                    </Button>
                    <span className="font-semibold tracking-tight text-white">Creative Environment</span>
                    <Input placeholder="search" className="max-w-xs" />
                </div>
            </header>

            <div className="flex flex-1">
                {/* 1. LEFT SIDEBAR */}
                <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-30 shrink-0 border-r border-zinc-900 py-8 lg:block">
                    <SidebarNav items={Object.keys(componentsData)} activeSlug={slug} />
                </aside>

                {/* 2. MIDDLE CONTENT */}
                <main className="flex-1 py-10 lg:px-12">
                    {children}
                </main>

                {/* 3. RIGHT SIDEBAR */}
                <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-30 shrink-0 py-10 lg:block">
                    {currentData ? (
                        <div className="space-y-6">
                            <div>
                                <h4 className="mb-2 text-sm font-semibold text-white">Description</h4>
                                <p className="text-sm text-zinc-400 leading-relaxed">{currentData.description}</p>
                            </div>
                            <hr className="border-zinc-900" />
                            <TableOfContents headings={currentData.headings} />
                            <button className="w-full rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200">
                                Deploy to Vercel
                            </button>
                        </div>
                    ) : (
                        <p className="text-sm text-zinc-500 italic">Select a component to see details.</p>
                    )}
                </aside>
            </div>
        </div>
    );
}