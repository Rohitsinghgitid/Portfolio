import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Rohit Singh Baghel | Creative Developer & Security Enthusiast",
  description:
    "Portfolio of Rohit Singh Baghel — a B.Tech Cyber Security student and creative developer. Specializing in secure web applications, Gen AI solutions, and interactive experiences.",
  keywords: ["Rohit Singh Baghel", "Cyber Security", "Gen AI", "Full Stack Developer", "Portfolio"],
  openGraph: {
    title: "Rohit Singh Baghel | Creative Developer",
    description: "Bridging secure coding with creative digital experiences.",
    type: "website",
  },
};

import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import GlowBlob from "@/components/GlowBlob";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <body className={`${sans.className} antialiased`}>
        <ThemeProvider>
          <SmoothScroll>
            <GlowBlob />
            {children}
            <ThemeSwitcher />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
