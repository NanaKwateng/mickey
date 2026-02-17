import { HoverCardDemo } from "@/components/ux/HoverCard";


export default function page() {
    return (
        <section className="min-h-screen w-full flex items-center justify-center">
            labs page
            {/* <TranscriptViewerAudio /> */}
            <HoverCardDemo />

            {/* <ConversationBar agentId={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID} /> */}
        </section>
    )
}