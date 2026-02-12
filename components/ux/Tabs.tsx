import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { MachineModel } from "../models/Machine"
import TabletVisionExperience from "../try/TabletView"

export function TabsDemo() {
    return (
        <div className="flex w-full">
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">About</TabsTrigger>
                    <TabsTrigger value="password">Experience</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>About</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save when you&apos;re
                                done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="">
                            <TabletVisionExperience />
                        </CardContent>
                        <CardFooter>
                            Design ...
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardContent className="">
                            <MachineModel />
                        </CardContent>
                        <CardFooter>
                            Precision ...
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
