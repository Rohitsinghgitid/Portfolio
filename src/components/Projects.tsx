"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import TiltCard from "./TiltCard";

const projects = [
  {
    id: "01",
    title: "Vidyaleen",
    category: "PWA Study App",
    description:
      "A lightweight PWA study web app for students in rural areas with limited internet — works offline and loads efficiently.",
    tech: ["PWA", "JavaScript", "Service Workers"],
    year: "2024",
  },
  {
    id: "02",
    title: "ResumeBuilder",
    category: "Web Application",
    description:
      "An app to create ATS-friendly resumes efficiently, helping users structure experience and skills for modern hiring pipelines.",
    tech: ["React", "Node.js", "Express"],
    year: "2024",
  },
  {
    id: "03",
    title: "Snipify",
    category: "Utility Tool",
    description:
      "An app to save, edit and tag code snippets in organized folders — making it easy to access and share them anywhere.",
    tech: ["JavaScript", "Tailwind", "LocalStorage"],
    year: "2024",
  },
  {
    id: "04",
    title: "Interactive Portfolio",
    category: "Website Design",
    description:
      "A high-performance personal portfolio featuring scroll-linked canvas animations and parallax storytelling.",
    tech: ["Next.js", "Framer Motion", "Canvas API"],
    year: "2024",
  },
];

export default function Projects() {
  return (
    <section id="work" className="section-padding bg-transparent backdrop-blur-sm relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -ml-80 -mb-80" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <motion.span 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-xs tracking-[0.4em] text-primary uppercase font-bold mb-4 block"
          >
             Case Studies
          </motion.span>
          <AnimatedHeading className="text-4xl md:text-6xl font-black text-white tracking-tight flex flex-wrap" as="h2">
            Recent <span className="text-gradient">Work.</span>
          </AnimatedHeading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
                <TiltCard key={project.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="saas-card group relative p-6 md:p-10 flex flex-col justify-between min-h-[400px] h-full"
                  >
                    {/* Individual Glow */}
                    <div 
                      className="absolute top-0 right-0 w-48 h-48 blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none rounded-full bg-primary"
                    />

                    <div>
                      <div className="flex justify-between items-center mb-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 bg-white/5 rounded-full border border-white/5 text-[#94a3b8]">
                          {project.category}
                        </span>
                        <span className="text-xs font-mono text-[#555555]">{project.year}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-base sm:text-lg text-[#94a3b8] font-light leading-relaxed mb-10 max-w-sm">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span key={t} className="text-[10px] text-[#555555] font-bold uppercase tracking-widest">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
