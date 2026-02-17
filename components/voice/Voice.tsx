"use client";

import { useEffect, useState } from "react";
import { useConversation } from "@elevenlabs/react";
import { Button } from "@/components/ui/button"; // Standard shadcn button
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";

export default function Voice() {
    // State for permissions and UI
    const [hasPermission, setHasPermission] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [muted, setMuted] = useState(false);

    // 11Labs Conversation Hook
    const conversation = useConversation();
    const { status, isSpeaking } = conversation;

    // 1. Request Microphone Permission on Load [00:07:03]
    useEffect(() => {
        async function requestMicPermission() {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                setHasPermission(true);
            } catch (err: any) {
                console.error("Error accessing microphone:", err);
                setErrorMessage(err.message);
            }
        }
        requestMicPermission();
    }, []);

    // 2. Start Session Handler [00:09:31]
    const handleStartConversation = async () => {
        try {
            const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID!;
            const conversationId = await conversation.startSession({
                agentId: agentId,
                connectionType: "webrtc",
            });
            console.log("Started conversation:", conversationId);
        } catch (err) {
            console.error("Failed to start conversation:", err);
        }
    };

    // 3. End Session Handler [00:12:45]
    const handleEndConversation = async () => {
        await conversation.endSession();
    };

    // 4. Toggle Mute Logic [00:13:24]
    const toggleMute = async () => {
        const newMutedState = !muted;
        setMuted(newMutedState);
        // Set volume to 0 (mute) or 1 (full volume)
        await conversation.setVolume({ volume: newMutedState ? 0 : 1 });
    };

    return (
        <Card className="w-full max-w-md mx-auto mt-10">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>AI Conversation Agent</CardTitle>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMute}
                    disabled={status !== "connected"} // Mute button only works when connected [00:15:06]
                >
                    {muted ? (
                        <VolumeX className="h-5 w-5 text-red-500" />
                    ) : (
                        <Volume2 className="h-5 w-5" />
                    )}
                </Button>
            </CardHeader>

            <CardContent className="flex flex-col items-center gap-6 py-8">
                {/* Status Indicator [00:06:36] */}
                <div className="text-center space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        Status: {status}
                    </p>
                    {isSpeaking && (
                        <div className="text-sm text-blue-500 animate-pulse">
                            Agent is speaking...
                        </div>
                    )}
                </div>

                {/* Conditional Buttons: Start vs End [00:11:50] */}
                {status === "connected" ? (
                    <Button
                        variant="destructive"
                        className="rounded-full px-8 py-6 text-lg w-full"
                        onClick={handleEndConversation}
                    >
                        <MicOff className="mr-2 h-5 w-5" />
                        End Conversation
                    </Button>
                ) : (
                    <Button
                        className="rounded-full px-8 py-6 text-lg w-full"
                        onClick={handleStartConversation}
                        disabled={!hasPermission} // Prevent starting without mic access [00:15:31]
                    >
                        <Mic className="mr-2 h-5 w-5" />
                        Start Conversation
                    </Button>
                )}

                {/* Display Errors [00:08:43] */}
                {errorMessage && (
                    <p className="text-xs text-red-500 text-center">{errorMessage}</p>
                )}
            </CardContent>
        </Card>
    );
}