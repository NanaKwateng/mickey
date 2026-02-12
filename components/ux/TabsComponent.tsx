"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import MagnifiedBento from "../library/Marquee"
import EducationInfo, {
    ExperienceInfo,
    SkillsInfo,
} from "./TabsInfo"
import ColboInterface from "./ColboUI"
import { ItemVariant } from "./Item"

export function TabsDemo() {
    return (
        <section className="w-full px-4 md:px-8">
            <Tabs
                defaultValue="overview"
                className="w-full max-w-7xl mx-auto"
            >
                {/* ================= TABS HEADER ================= */}
                <div className="flex justify-center sticky top-4 z-20">
                    <TabsList
                        className="
              flex
              w-full
              max-w-fit
              overflow-x-auto
              no-scrollbar
              gap-2
              bg-muted/50
              backdrop-blur-md
              p-1
              rounded-full
              shadow-sm
            "
                    >
                        <TabsTrigger value="overview" className="px-4 py-2 text-xs md:text-sm">
                            Education
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="px-4 py-2 text-xs md:text-sm">
                            Skills
                        </TabsTrigger>
                        <TabsTrigger value="reports" className="px-4 py-2 text-xs md:text-sm">
                            Experience
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="px-4 py-2 text-xs md:text-sm">
                            Contact
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* ================= EDUCATION ================= */}
                <TabsContent
                    value="overview"
                    className="mt-10 w-full overflow-hidden"
                >
                    <Card className="bg-transparent border-0">
                        <CardHeader>
                            <CardTitle>Education</CardTitle>
                            <CardDescription>
                                Academic background and learning journey.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="text-sm text-muted-foreground overflow-x-hidden">
                            <div className="w-full max-w-full overflow-hidden">
                                <EducationInfo />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ================= SKILLS ================= */}
                <TabsContent
                    value="analytics"
                    className="mt-10 w-full overflow-hidden"
                >
                    <Card className="bg-transparent border-0">
                        <CardHeader>
                            <CardTitle>Skillset</CardTitle>
                        </CardHeader>

                        <CardContent className="overflow-hidden">
                            <div
                                className="
                  w-full
                  flex
                  flex-col
                  lg:flex-row
                  gap-6
                  items-start
                  overflow-hidden
                "
                            >
                                {/* Prevent marquee overflow */}
                                <div className="w-full lg:w-1/2 overflow-hidden">
                                    <MagnifiedBento />
                                </div>

                                <div className="w-full lg:w-1/2 overflow-hidden">
                                    <SkillsInfo />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ================= EXPERIENCE ================= */}
                <TabsContent
                    value="reports"
                    className="mt-10 w-full overflow-hidden border-0"
                >
                    <Card className="bg-transparent border-0">
                        <CardHeader>
                            <CardTitle>Experience</CardTitle>
                            <CardDescription>
                                Professional background and project highlights.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="overflow-hidden">
                            <div className="w-full max-w-full overflow-hidden border-0">
                                <ColboInterface />
                            </div>
                        </CardContent>

                    </Card>
                </TabsContent>

                {/* ================= CONTACT ================= */}
                <TabsContent
                    value="settings"
                    className="mt-10 w-full overflow-hidden"
                >
                    <Card className="bg-transparent border-0">
                        <CardHeader>
                            <CardTitle>Contact Me</CardTitle>
                            <CardDescription>
                                Let&nbps;s connect and collaborate.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="overflow-hidden">
                            <div className="w-full max-w-full overflow-hidden">
                                <ItemVariant />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </section>
    )
}
