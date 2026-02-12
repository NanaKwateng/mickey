import { Canvas } from "@react-three/fiber";
import { ImmersiveSection } from "./ImmersiveSection";
import { ScrollControls } from "@react-three/drei";
import VisionModel from "../models/Vision";

export default function ImmersivePage() {
    return (
        <main className="bg-black">
            <div className="fixed inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5] }}>
                    <ambientLight intensity={0.5} />
                    <ScrollControls pages={3} damping={0.1}>
                        <VisionModel />
                    </ScrollControls>
                </Canvas>
            </div>

            <div className="relative z-10">
                <ImmersiveSection
                    title="Create exclusive wheels for your car"
                    desc="Uncompromising quality for those who lead."
                    align="left"
                />
                <ImmersiveSection
                    title="Super strong titanium material"
                    desc="Aerospace grade durability in every turn."
                    align="right"
                />
            </div>
        </main>
    )
}