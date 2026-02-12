import { GlobeDemo } from "../library/Globe";
import { BackgroundGradientDemo } from "../ux/BackgroundGradient";
import TextsDemo from "../ux/TextsDemo";

export default function GlobalSupportSection() {
    return (
        <section className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col lg:flex-row items-center px-6 md:px-20 py-10 lg:py-20">
            {/* Background Depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,30,150,0.12),transparent)] pointer-events-none" />

            <div className="container mx-auto flex flex-col xl:flex-row items-center gap-0 lg:gap-10">

                {/* GROUP 1: GLOBE + CARD (Top on Mobile, Right on Desktop) */}
                <div className="relative w-full order-1 xl:order-2 flex flex-col items-center justify-center min-h-[450px] xl:min-h-[600px]">

                    {/* The Card: Now pinned to the Globe container */}
                    <div className="absolute top-20 md:top-8  left-8 z-40 scale-100 md:scale-90 lg:scale-100 origin-top-left">
                        <BackgroundGradientDemo />
                    </div>

                    {/* The Globe: Scaled to fit mobile width without breaking layout */}
                    <div className="w-full h-full scale-150 md:scale-125 lg:scale-110 translate-y-10 lg:translate-y-0">
                        <GlobeDemo />
                    </div>

                </div>

                {/* GROUP 2: TEXT CONTENT (Bottom on Mobile, Left on Desktop) */}
                <div className="w-full order-2 lg:order-1 mt-[-40px] lg:mt-0 z-10">
                    <TextsDemo />
                </div>

            </div>

            {/* Visual bottom fade */}
            <div className="absolute w-full bottom-0 inset-x-0 h-32 bg-gradient-to-b pointer-events-none from-transparent to-black z-30" />

            {/* Branding Logo */}
            <div className="absolute bottom-8 left-8 opacity-40 z-40 hidden md:block">
                <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center text-[10px] font-bold">N</div>
            </div>
        </section>
    );
}