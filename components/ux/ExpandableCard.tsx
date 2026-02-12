import { ExpandableCard } from "@/components/ui/expandable-card";
import React from "react";

// 1. Define the Type for our Portfolio Items
export type PortfolioItem = {
    id: number;
    category: string;
    title: string;
    subTitle: string;
    src: string;
    content: {
        heading: string;
        description: string;
    }[];
};

// 2. Mock Data matching your design research (Kobe, GQ, etc.)
const PORTFOLIO_DATA: PortfolioItem[] = [
    {
        id: 1,
        category: "PORTRAIT",
        title: "Kobe Bryant",
        subTitle: "— STYLE. /47°",
        src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop", // Placeholder for research image
        content: [
            {
                heading: "The Mamba Mentality",
                description: "An editorial exploration into the focus and discipline of one of basketball's greatest icons. Captured during the 2024 retrospective series."
            },
            {
                heading: "Technical Approach",
                description: "Shot with high-contrast monochrome lighting to emphasize the architectural nature of the subject's profile, mirroring the 'less.' philosophy."
            }
        ]
    },
    {
        id: 2,
        category: "EDITORIAL",
        title: "Untitled Res",
        subTitle: "— PORT. GQ",
        src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
        content: [
            {
                heading: "Modern Identity",
                description: "A series commissioned for GQ exploring the intersection of minimalist fashion and urban environments."
            }
        ]
    },
    {
        id: 3,
        category: "FASHION",
        title: "Studio Noir",
        subTitle: "— LEICA /88",
        src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop",
        content: [
            {
                heading: "Shadow Play",
                description: "Utilizing natural light and stark shadows to create a sense of depth and mystery in high-fashion portraiture."
            }
        ]
    }
];

// 3. The Reusable Component
interface PhotographyGridProps {
    items?: PortfolioItem[];
}

export function ExpandableCardDemo({ items = PORTFOLIO_DATA }: PhotographyGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 bg-[#f5f5f5] dark:bg-black">
            {items.map((item) => (
                <div key={item.id} className="flex flex-col gap-4">
                    {/* Top Label (Category) - Styled from your Screenshot */}
                    <span className="text-[10px] tracking-[0.2em] font-medium text-neutral-500 uppercase">
                        {item.category}
                    </span>

                    <ExpandableCard
                        title={item.title}
                        description={item.subTitle}
                        src={item.src}
                        // Applying your requested serif-heavy typography to the expanded view
                        classNameExpanded="[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-serif [&_h4]:text-3xl [&_h4]:mb-4 [&_p]:text-neutral-600 dark:[&_p]:text-neutral-400 [&_p]:leading-relaxed"
                    >
                        {item.content.map((section, idx) => (
                            <React.Fragment key={idx}>
                                <h4>{section.heading}</h4>
                                <p className="mb-6">{section.description}</p>
                            </React.Fragment>
                        ))}
                    </ExpandableCard>

                    {/* Bottom Labels to mimic the "less." grid layout */}
                    <div className="flex flex-col">
                        <h3 className="text-2xl font-serif text-neutral-900 dark:text-white">
                            {item.title}
                        </h3>
                        <p className="text-sm text-neutral-500 font-sans tracking-tight">
                            {item.subTitle}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}