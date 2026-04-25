import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { SoundProvider } from "@/context/SoundContext";
import { ThemeProvider } from "@/context/ThemeContext";

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
  metadataBase: new URL("https://connor.drainas.com"),
  title: "Connor Drainas — Full-Stack Engineer",
  description:
    "Full-stack software engineer with 6+ years of production experience. React, Node.js, AWS, Docker. Dual EU citizen relocating to Europe August 2026.",
  keywords: ["software engineer", "full-stack", "React", "Node.js", "AWS", "EU", "Europe", "cloud"],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Connor Drainas — Full-Stack Engineer",
    description: "6+ years shipping production SaaS. Relocating EU August 2026.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Connor Drainas — Full-Stack Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Connor Drainas — Full-Stack Engineer",
    description: "6+ years shipping production SaaS. Relocating EU August 2026.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Hardcoded constant — no user input, safe from XSS. Prevents flash of wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light');}else if(!t&&!window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.add('light');}}catch(e){}})();` }} />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider>
          <SoundProvider>
            <SmoothScroll />
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
