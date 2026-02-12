import {
    Item,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { InboxIcon, Phone } from "lucide-react"
import Link from "next/link"

export function ItemVariant() {
    return (
        <div className="flex w-full max-w-md flex-col gap-6">
            <Item>
                <ItemMedia variant="icon">
                    <InboxIcon />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Email</ItemTitle>
                    <ItemDescription>
                        nanakwateng172@gmail.com
                    </ItemDescription>
                </ItemContent>
            </Item>
            <Item variant="outline">
                <ItemMedia variant="icon">
                    <Phone />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Phone</ItemTitle>
                    <ItemDescription>
                        <Link href={"tel:0593134075"}>
                            +233 593 134 075
                        </Link>
                    </ItemDescription>
                </ItemContent>
            </Item>
            <Item variant="muted">
                <ItemMedia variant="icon">
                    <InboxIcon />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Availability</ItemTitle>
                    <ItemDescription>
                        Freelance, contract, or full-time roles.
                    </ItemDescription>
                </ItemContent>
            </Item>
            <Item variant="muted">
                <ItemMedia variant="icon">
                    <InboxIcon />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Preffered workflow</ItemTitle>
                    <ItemDescription>
                        Remote, hybrid, or on-site depending on project scope
                    </ItemDescription>
                </ItemContent>
            </Item>
        </div>
    )
}
