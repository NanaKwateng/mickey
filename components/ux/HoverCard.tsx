import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from "next/link"

export function HoverCardDemo() {
    return (
        <HoverCard openDelay={10} closeDelay={100}>
            <HoverCardTrigger asChild>
                <Button variant="link">Hover Here</Button>
            </HoverCardTrigger>
            <HoverCardContent className="flex w-64 flex-col gap-0.5">
                <div className="font-semibold">@nextjs</div>
                <div>Trying out the latest AI toolset built right into the apps, now in preview, not yet released to public.</div>
                <div className="text-muted-foreground mt-1 text-xs">
                    View the layout structure.
                </div>
                <Button variant="link">
                    <Link href="/lab/dashboard">Go to Dashboard</Link>
                </Button>
            </HoverCardContent>
        </HoverCard>
    )
}
