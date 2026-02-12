import Image from "next/image";
import { ExpandableCardDemo } from "./ExpandableCard";


export default function EducationInfo() {
    return (
        <main
            className="w-full space-y-4 flex flex-col lg:flex-row items-ceneter justify-center gap-4 md:gap-8 flex-1 "
        >
            <figure
                className="relative w-full h-[50vh] lg:h-[30vw] rounded-3xl overflow-hidden"
            >
                <Image
                    src="/images/edu.png"
                    alt="book"
                    fill
                    priority
                    className="object-contain"
                />
            </figure>
            <article className="max-w-md">
                <span className="">
                    <h4 className="">Sub title one</h4>
                    <p className="">
                        Bachelor of Arts in Multimedia & Web Design**
                        [University Name], [Year of Graduation]
                        - Coursework: Human-Computer Interaction, Digital Media, 3D Animation, Web Programming
                    </p>
                </span>

                <main className="space-y-4">
                    <h4 className="">📂 Projects</h4>
                    <p className="">
                        3D Product Showcase: Interactive web-based 3D viewer for e-commerce.
                        - **Portfolio Website: Designed and coded a personal portfolio with animations and 3D elements.
                    </p>
                    <p className="">
                        VR Learning App: Developed an immersive VR app for educational simulations.
                        - **Web App Dashboard:** Built a data-driven dashboard with real-time analytics.
                    </p>
                </main>

            </article>
        </main>
    )
}

export function ExperienceInfo() {
    return (
        <main className="">
            <article className="">

                Professional Experience

                <p className="">
                    Web Designer & Developer | Freelance <br />
                    *2026 – Present*
                    - Designed and developed responsive websites for clients across e-commerce, education, and creative industries.
                </p>
                <br />
                <p className="">
                    - Implemented interactive 3D product showcases using Three.js. <br />
                    - Collaborated with marketing teams to align design with brand identity.
                </p>

                <p className="">
                    ### 3D Artist & Web App Developer | [Company Name]
                    *MM/YYYY – MM/YYYY*
                    - Created 3D models and animations for integration into web applications.
                    - Built immersive AR/VR experiences for product demos.
                </p>
                <p className="">
                    - Developed custom web applications with real-time data visualization.
                </p>
                <br />

                <p className="">
                    ### IT Expert | National Health Insurance
                    2024 - Intern
                    - Offered insurance card printing service for people that solved real world health care problem.
                    - Data utilization for annual reports, relevant for decision making
                </p>
                <br />
                <p className="">
                    - Built client-customer relationships, B2B relationships with just perfect communication strategies.
                </p>
            </article>
        </main>
    )
}

export function SkillsInfo() {
    return (
        <main className="max-w-6xl w-full space-y-7">
            <article className="max-w-md">
                <h3 className="text-xl font-semibold">
                    Other services ..
                </h3>
                <small
                    className="text-md"
                >
                    Tap to expland the card items to explore more of other servies.
                </small>
            </article>

            <ExpandableCardDemo />



        </main>
    )
}



export function ContactInfo() {

}