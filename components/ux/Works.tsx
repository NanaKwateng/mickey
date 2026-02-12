import { useLayoutEffect } from "react";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import { gsap } from 'gsap';


export default function Works() {
    useLayoutEffect(() => {
        const projectItems = gsap.utils.toArray(".project-card");
        gsap.to(projectItems, {
            xPercent: -100 * (projectItems.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: "#projects",
                pin: true,
                scrub: 1,
                snap: 1 / (projectItems.length - 1),
                end: () => "+=" + (document.querySelector('.projects-holder') as HTMLElement).offsetWidth,
            }
        });
    })
    return (
        <section>
            <article className="flex justify-between items-center gap-4 flex-wrap w-full ">
                <h2 className="">Some title</h2>
                <p className="max-w-md">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum voluptatem, voluptatibus ullam atque laboriosam quos, quam tempora est hic debitis pariatur asperiores iure veritatis consequatur consequuntur! Quam harum maiores natus.</p>
            </article>

            <section
                id="projects"
                className="min-h-screen bg-[#e0fbfc] text-black overflow-hidden"
            >
                <div className="projects-holder flex h-full">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="project-card min-w-screen w-screen h-full flex flex-col items-center justify-center px-20 relative">
                            <span className="absolute top-20 left-20 text-sm font-bold opacity-30">0{item} / 04</span>
                            <div className="w-full h-[60vh] bg-black/5 rounded-3xl overflow-hidden group cursor-pointer">
                                <div className="w-full h-full bg-neutral-200 transition-transform duration-700 group-hover:scale-105" />
                            </div>
                            <div className="w-full mt-8 flex justify-between items-end gap-2">
                                <h2 className="text-xl font-black tracking-tighter text-shadow-2xs">PROJECT NAME</h2>

                                <Button size={"default"} variant={"default"} className='border rounded-3xl '>
                                    View Case
                                    <div className="rounded-full h-5 w-5 bg-white flex items-center justify-center p-3.5 text-black">
                                        <ArrowUpRight size={16} />
                                    </div>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </section>
    )
}