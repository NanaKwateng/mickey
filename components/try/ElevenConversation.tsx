"use client"

import { ConversationBar } from "@/components/ui/conversation-bar"

const DEFAULT_AGENT = {
    agentId: process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!,
}

export function ConversationBarDemo() {
    return (
        <div className="flex min-h-[100px] w-2/3 items-center justify-end">
            <div className="w-full max-w-xs">
                <ConversationBar
                    agentId={DEFAULT_AGENT.agentId}
                    onConnect={() => console.log("Connected")}
                    onDisconnect={() => console.log("Disconnected")}
                    onMessage={(message) => console.log("Message:", message)}
                    onError={(error) => console.error("Error:", error)}
                />
            </div>
        </div>
    )
}
