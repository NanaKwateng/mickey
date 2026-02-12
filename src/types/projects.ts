// types/project.ts (or top of file)
export interface ProjectPhase {
    phase: string;
    title: string;
    description: string;
}

export interface ProjectData {
    title: string;
    description: string;
    image: string;
    color: string;
    details: {
        heading: string;
        subheading: string;
        phases: ProjectPhase[];
    };
}

export const PROJECTS: ProjectData[] = [
    {
        title: "Planning \n & Digital Craftsmanship",
        description: "The biggest turns in life rarely go according to plan. We build digital wheels that reach your destination safely and with precision-crafted aesthetic.",
        image: "/images/people.jpg",
        color: "#8B5CF6",
        details: {
            heading: "Strategic Planning",
            subheading: "Refining your idea into a concrete roadmap.",
            phases: [
                { phase: "01", title: "Discovery Workshop", description: "We conduct deep-dive sessions to understand your business logic, target audience, and core value proposition before drawing a single pixel." },
                { phase: "02", title: "Technical Feasibility", description: "Assessing the right tech stack (Next.js, Node, Python) to ensure scalability, security, and performance meets your long-term goals." },
                { phase: "03", title: "Blueprint Creation", description: "Delivering a comprehensive sitemap, user flow diagrams, and a product requirements document (PRD) to guide the build." }
            ]
        }
    },
    {
        title: "Design \n & Architecture",
        description: "Engineered for high dynamics and characterized by perfect technical execution. Your reliable companion on any digital road.",
        image: "/images/group.png",
        color: "#3B82F6",
        details: {
            heading: "UI/UX Architecture",
            subheading: "Where aesthetics meet usability metrics.",
            phases: [
                { phase: "01", title: "Wireframing & UX", description: "Low-fidelity layouts to validate information architecture and user journeys without the distraction of colors." },
                { phase: "02", title: "Visual Systems", description: "Establishing a design token system (typography, colors, spacing) ensuring consistency across mobile, tablet, and desktop views." },
                { phase: "03", title: "Motion & Interaction", description: "Designing micro-interactions and transitions using tools like GSAP to make the application feel alive and responsive." }
            ]
        }
    },
    {
        title: "Development \n & Deployment",
        description: "Turning blueprints into robust, production-grade applications using modern frameworks and CI/CD pipelines.",
        image: "/images/team.jpg",
        color: "#10B981",
        details: {
            heading: "Full Stack Engineering",
            subheading: "Clean code, scalable infrastructure, and fast delivery.",
            phases: [
                { phase: "01", title: "Frontend Construction", description: "Building responsive interfaces with React/Next.js, ensuring 100% accessibility compliance and fast Core Web Vitals." },
                { phase: "02", title: "Backend & Database", description: "Setting up secure APIs, authentication, and database schemas (SQL/NoSQL) that handle real-time data efficiently." },
                { phase: "03", title: "CI/CD & Launch", description: "Automated testing and deployment pipelines to Vercel/AWS, ensuring zero-downtime updates and instant scalability." }
            ]
        }
    }
];