"use client";

import { useScroll, useTransform, motion, MotionValue } from "framer-motion";


const sections = [
  {
    id: "intro",
    visibleRange: [0, 0.02, 0.08, 0.12] as [number, number, number, number],
    yRange: [0, 0, -80, -160] as [number, number, number, number],
    content: (
      <div className="text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.5, duration: 1 }}
           className="mb-3 inline-block text-xs tracking-[0.4em] text-[#7c6af7] uppercase font-medium"
        >
          Computer Science (Cyber Security)
        </motion.div>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none mb-4">
          <span
            style={{
              background: "linear-gradient(135deg, #f0f0f0 0%, #a79cf5 60%, #7c6af7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Rohit Singh.
          </span>
        </h1>
        <p className="text-[#888888] text-base md:text-xl font-light tracking-wide max-w-sm mx-auto mb-8">
          B.Tech student at LNCTS Bhopal specializing in secure, responsive applications and AI.
        </p>
        <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1, duration: 0.8 }}
           className="flex justify-center gap-4"
        >
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 pointer-events-auto"
          >
            View Resume
          </a>
        </motion.div>
      </div>
    ),
    position: "items-center justify-center",
  },
  {
    id: "intern",
    visibleRange: [0.25, 0.28, 0.40, 0.44] as [number, number, number, number],
    yRange: [120, 0, 0, -120] as [number, number, number, number],
    content: (
      <div className="max-w-lg">
        <div className="mb-3 text-xs tracking-[0.5em] text-[#7c6af7] uppercase font-medium">
          Gen AI Experience
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight mb-5">
          <span className="text-[#f0f0f0]">Google Cloud</span>
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #7c6af7, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Study Jam
          </span>
          <br />
          <span className="text-[#f0f0f0]">Internship.</span>
        </h2>
        <p className="text-[#777777] text-base md:text-lg font-light leading-relaxed max-w-sm">
          Processing datasets with BigQuery and deploying generative AI solutions on GKE via Vertex AI.
        </p>
      </div>
    ),
    position: "items-center justify-start pl-6 sm:pl-10 md:pl-24",
  },
  {
    id: "security",
    visibleRange: [0.65, 0.72, 0.90, 1.0] as [number, number, number, number],
    yRange: [120, 0, 0, -120] as [number, number, number, number],
    content: (
      <div className="max-w-xl text-right">
        <div className="mb-3 text-xs tracking-[0.5em] text-[#7c6af7] uppercase font-medium">
          Security Research
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight tracking-tight mb-5 text-balance">
          <span className="text-[#f0f0f0]">Secure and</span>
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #a78bfa, #7c6af7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            efficient
          </span>
          <br />
          <span className="text-[#f0f0f0]">automation.</span>
        </h2>
        <p className="text-[#777777] text-base md:text-lg font-light leading-relaxed max-w-sm ml-auto">
           Published author in Smart Home Automation (AES &amp; MQTT) and Team Lead for SIH Hackathon.
        </p>
      </div>
    ),
    position: "items-center justify-end pr-6 sm:pr-10 md:pr-24",
  },
];

function OverlaySection({
  section,
  scrollYProgress,
}: {
  section: (typeof sections)[0];
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [v0, v1, v2, v3] = section.visibleRange;
  const [y0, y1, y2, y3] = section.yRange;

  const opacity = useTransform(scrollYProgress, [v0, v1, v2, v3], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [v0, v1, v2, v3], [y0, y1, y2, y3]);

  return (
    <motion.div
      className={`absolute inset-0 flex ${section.position} pointer-events-none`}
      style={{ opacity, y }}
    >
      <div className="px-6 pointer-events-auto">{section.content}</div>
    </motion.div>
  );
}

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ height: "100vh" }}
    >
      {sections.map((section) => (
        <OverlaySection
          key={section.id}
          section={section}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}
