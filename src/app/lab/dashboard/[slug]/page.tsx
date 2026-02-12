import { componentsData } from "@/lib/data";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {
    const data = componentsData[params.slug];

    if (!data) return notFound();

    return (
        <div className="max-w-3xl space-y-12">
            <header>
                <h1 className="text-4xl font-bold text-white">{data.title}</h1>
                <p className="mt-4 text-xl text-zinc-400">{data.content}</p>
            </header>

            {/* Logic: Map through sections based on headings in data.ts */}
            {data.headings.map((heading) => (
                <section key={heading.id} id={heading.id} className="scroll-mt-20">
                    <h2 className="text-2xl font-semibold text-white border-b border-zinc-900 pb-2 mb-4">
                        {heading.title}
                    </h2>
                    <div className="h-40 w-full rounded-lg bg-zinc-900/50 border border-dashed border-zinc-800 flex items-center justify-center">
                        <code className="text-zinc-500">Content for {heading.title}</code>
                    </div>
                </section>
            ))}
        </div>
    );
}