export type ComponentData = {
    title: string;
    description: string;
    content: string;
    headings: { id: string; title: string }[];
};

export const componentsData: Record<string, ComponentData> = {
    accordion: {
        title: "Accordion",
        description: "A vertically stacked set of interactive headings.",
        content: "The accordion component allows users to reveal and hide sections of content...",
        headings: [
            { id: "installation", title: "Installation" },
            { id: "usage", title: "Usage" },
            { id: "props", title: "Props" },
        ],
    },
    button: {
        title: "Button",
        description: "Displays a button or a component that looks like a button.",
        content: "Buttons are used to trigger actions or navigate to other pages...",
        headings: [
            { id: "installation", title: "Installation" },
            { id: "variants", title: "Variants" },
        ],
    },
};