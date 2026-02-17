"use client";

import Link from "next/link";

interface TableOfContentsProps {
    headings?: {
        id: string;
        title: string;
    }[];
}

export function TableOfContents({ headings = [] }: TableOfContentsProps) {
    if (!headings.length) return null;

    return (
        <div>
            <h4 className="mb-2 text-sm font-semibold text-white">
                On This Page
            </h4>

            <ul className="space-y-2 text-sm">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <Link
                            href={`#${heading.id}`}
                            className="text-zinc-400 hover:text-white transition-colors"
                        >
                            {heading.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
