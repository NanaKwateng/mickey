import Link from "next/link";

export function SidebarNav({ items, activeSlug }: { items: string[]; activeSlug: string }) {
    return (
        <nav className="flex flex-col space-y-1">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-500">Components</h4>
            {items.map((item) => (
                <Link
                    key={item}
                    href={`/dashboard/${item}`}
                    className={`rounded-md px-3 py-2 text-sm transition-colors ${activeSlug === item
                            ? "bg-zinc-900 text-white font-medium"
                            : "text-zinc-400 hover:text-zinc-100"
                        }`}
                >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
            ))}
        </nav>
    );
}