import React from 'react';
import Link from "next/link";
import { Button } from '@/components/ui/button';

// Import your 3D models
import TabletModel from "@/components/models/Ipad";

import MacBookModel14 from '@/components/models/Macbook-14';

// --- TEXT COMPONENTS ---

export const ProfileContent = () => (
    <article className="max-w-md space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-3xl font-bold tracking-tight">
            My profile.
        </h2>
        {/* Added better contrast styling for readability over 3D backgrounds */}
        <p className="text-sm leading-relaxed p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 text-zinc-200">
            Hi there 👋, I'm Michael. I am a creative developer building modern, user-friendly, and optimized visuals for the web.
            I specialize in web design, development, and research solutions, creating video generations that communicate your brand voice effectively.
        </p>
        <Button asChild variant="secondary" size="sm">
            <Link href="/strategy">Read more</Link>
        </Button>
    </article>
);

export const SkillsContent = () => (
    <article className="max-w-md space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-3xl font-bold tracking-tight">
            Skills.
        </h2>
        <p className="text-sm leading-relaxed p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 text-zinc-200">
            Proficient in web design, development, and project management. We provide AI-driven solutions for diverse business needs, focusing on growth and sustainability.
            Using modern tools for design and architecture, we help create the best digital experiences.
        </p>
        <Button asChild variant="secondary" size="sm">
            <Link href="/strategy">Read more</Link>
        </Button>
    </article>
);

export const EducationContent = () => (
    <article className="max-w-md space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-3xl font-bold tracking-tight">
            Education.
        </h2>
        <p className="text-sm leading-relaxed p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 text-zinc-200">
            Equipped with formal education, I earned a B.Sc. in IT Education at AAMUSTED (University for Skills Training and Entrepreneurial Development), building upon a business foundation from secondary education.
        </p>
        <Button asChild variant="secondary" size="sm">
            <Link href="/strategy">Read more</Link>
        </Button>
    </article>
);

// --- 3D MODEL WRAPPERS ---
// Using React.memo here prevents the 3D model from re-rendering 
// unnecessarily if parent props change but the model doesn't need to.

export const MenModel = React.memo(() => <TabletModel />);

export const EducationModel = React.memo(() => (
    <group rotation={[0, -Math.PI / 2, 0]} scale={0.010}>
        <MacBookModel14 />
    </group>
));

export const SkillsModel = React.memo(() => (
    <group rotation={[0, -Math.PI / 2, 0]} scale={0.013}>
        <MacBookModel14 />
    </group>
));