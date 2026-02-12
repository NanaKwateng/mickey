import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { CgInstagram } from "react-icons/cg"
import { FaFacebook } from "react-icons/fa"
import { LuLinkedin } from "react-icons/lu"

import { SiSlashdot } from "react-icons/si"
import { Badge } from "../ui/badge"
import { BiEnvelope } from "react-icons/bi"
import { GiMailbox } from "react-icons/gi"

export function SheetDemo() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="secondary" size={"default"} className="rounded-3xl px-4 py-0.5 text-md font-semibold">Menu
                    <SiSlashdot />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="h-screen overflow-y-auto">
                <SheetHeader>
                    <SheetTitle> MickeyLabs.</SheetTitle>
                    <SheetDescription>
                        Refining your idea into a creative digital experince..
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col items-start gap-4 justify-between px-4">
                    <article className="space-y-4 min-h-20vh py-8 w-full h-full">
                        <div className="text-left text-2xl tracking-tight">
                            <Link href={"#"} className="font-thin text-5xl text-shadow-md">Home</Link>
                        </div>
                        <div className="text-left text-2xl tracking-tight">
                            <Link href={"#"} className="font-thin text-5xl text-shadow-md">Profile</Link>
                        </div>
                        <div className="text-left text-2xl tracking-tight">
                            <Link href={"#"} className="font-thin text-5xl text-shadow-md">Experience </Link>
                        </div>
                        <div className="text-left text-2xl tracking-tight">
                            <Link href={"#"} className="font-thin text-5xl text-shadow-md">Methodologies</Link>
                        </div>
                        <div className="text-left text-2xl tracking-tight">
                            <Link href={"#"} className="font-thin text-5xl text-shadow-md">Pholosophy </Link>
                        </div>
                        <div className="text-left text-2xl tracking-tight">
                            <Link href={"#"} className="font-thin text-5xl text-shadow-md">Contact </Link>
                        </div>
                    </article>

                    <article className="flex items-start justify-between gap-8">
                        <span className="max-w-xs space-y-2">
                            <h4 className="font-semibold">Some text title</h4>
                            <p className="text-xs">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, quasi ullam sit accusamus at facere odio error quaerat possimus! Sequi expedita architecto facere ullam nostrum harum totam fugit nemo suscipit.</p>
                        </span>
                        <span className="max-w-xs space-y-2">
                            <h4 className="font-semibold">Some text title</h4>
                            <p className="text-xs">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, quasi ullam sit accusamus at facere odio error quaerat possimus! Sequi expedita architecto facere ullam nostrum harum totam fugit nemo suscipit.</p>
                        </span>
                    </article>
                </div>
                <SheetFooter>
                    <div className="flex items-center justify-between text-gray-600 flex-wrap space-y-5">
                        <div className="space-y-3 font-semibold text-md text-left">
                            <h3 className="text-xl font-thin text-shadow-sm">Socials</h3>
                            <span className="">
                                <Button className="text-black" variant={"link"}>
                                    <span className="w-5 h-5 text-xl">
                                        <FaFacebook size={24} />
                                    </span>
                                    MickeyLabs
                                </Button>
                                <Button className="text-black" variant={"link"}>
                                    <span className="w-5 h-5 text-xl">
                                        <CgInstagram size={24} />
                                    </span>
                                    MickeyLabs.io
                                </Button>
                                <Button className="text-black" variant={"link"}>
                                    <span className="w-5 h-5 text-xl">
                                        <LuLinkedin size={24} />
                                    </span>
                                    MickeyLabs.pr
                                </Button>
                                <Button className="text-black" variant={"link"}>
                                    <span className="w-5 h-5 text-xl">
                                        <GiMailbox size={24} />
                                    </span>
                                    blueskiesurl8@gmail.com
                                </Button>
                            </span>
                        </div>

                        <figure className="relative w-70 h-70 overflow-hidden flex-1 pointer-events-none">
                            <Image
                                src="/images/shape.gif"
                                alt="Shapes"
                                fill
                                priority
                                className="object-contain"
                            />
                            <figcaption>
                                <Badge variant={"default"}>Reliable</Badge>
                            </figcaption>
                        </figure>
                    </div>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
