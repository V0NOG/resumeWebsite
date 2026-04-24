import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { SoundProvider } from "@/context/SoundContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Connor Drainas — Full-Stack Engineer",
  description:
    "Full-stack software engineer with 6+ years of production experience. React, Node.js, AWS, Docker. Dual EU citizen relocating to Europe September 2026.",
  keywords: ["software engineer", "full-stack", "React", "Node.js", "AWS", "EU", "Europe", "cloud"],
  openGraph: {
    title: "Connor Drainas — Full-Stack Engineer",
    description: "6+ years shipping production SaaS. Relocating EU Sept 2026.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <SoundProvider>
          <SmoothScroll />
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
