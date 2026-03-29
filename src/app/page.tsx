"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import SocialBar from "@/components/SocialBar";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ResumeSection from "@/components/ResumeSection";
import Footer from "@/components/Footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      {/* Cinematic Navigation */}
      <Navbar />
      <SocialBar />

      {/* Scrollytelling Backdrop & Content */}
      <div ref={containerRef}>
        <ScrollyCanvas scrollYProgress={scrollYProgress} />
      </div>

      {/* Main Sections (Rendered below the fold) */}
      <div className="relative z-20">
        <About />
        <ResumeSection />
        <Projects />
        <Footer />
      </div>
    </main>
  );
}
