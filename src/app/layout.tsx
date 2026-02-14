import type { Metadata, Viewport } from "next";
import { Sora, JetBrains_Mono } from "next/font/google"; // Switched to JetBrains for code/mono if needed
import "./globals.css";
import { ConversationBarDemo } from "@/components/try/ElevenConversation";

// 1. OPTIMIZE FONTS
// Use 'swap' display for better LCP (text shows up immediately)
const sora = Sora({
  subsets: ["latin"],
  variable: '--font-sora',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: 'swap',
});

// 2. VIEWPORT CONFIG (Separate export in Next.js 14+)
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Accessibility: Allow users to zoom
};

// 3. ROBUST METADATA
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mickeylabs.com"; // Replace with actual domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MickeyLabs | Creative Digital Agency",
    template: "%s | MickeyLabs"
  },
  description: "A creative development studio building modern, user-friendly, and optimized 3D visuals for the web. We refine ideas into digital experiences.",
  keywords: ["Web Design", "Creative Developer", "Next.js", "3D Web", "Three.js", "GSAP", "Digital Agency"],
  authors: [{ name: "Michael", url: siteUrl }],
  creator: "MickeyLabs",

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "MickeyLabs | Creative Digital Agency",
    description: "Refining your idea into a creative digital experience. High-performance web design and development.",
    siteName: "MickeyLabs",
    images: [
      {
        url: "/og-image.jpg", // Create this image in your public folder (1200x630px)
        width: 1200,
        height: 630,
        alt: "MickeyLabs Digital Agency",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "MickeyLabs",
    description: "Creative development and 3D web experiences.",
    images: ["/og-image.jpg"],
    creator: "@mickeylabs", // Replace with your handle
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mono.variable} ${sora.variable}`}>
      <body className="font-sans antialiased bg-black text-white selection:bg-white selection:text-black">

        {children}

        {/* Fixed Interaction Elements */}
        {/* Z-Index 50 ensures it sits below the Full Screen Menu (which is z-[800]) */}
        <div className="fixed bottom-3 -right-8 z-50">
          <ConversationBarDemo />
        </div>

      </body>
    </html>
  );
}