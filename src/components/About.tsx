"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";
import TechOrb from "./TechOrb";

const achievements = [
  {
    title: "Research Publication",
    desc: "Published &apos;Secure and Energy efficient Smart Home Automation using ESP32, MQTT, and AES&apos; — ICAIEST 2026.",
  },
  {
    title: "SIH Team Lead",
    desc: "Led a team of 5 in the Smart India Hackathon, advancing past internal college selection.",
  },
  {
    title: "Open Source",
    desc: "Active participant in Hacktoberfest 2024 and Codeverse hackathons.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-transparent relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <motion.span 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-xs tracking-[0.4em] text-primary uppercase font-bold mb-4 block"
          >
             About Me
          </motion.span>
          <AnimatedHeading className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none text-balance w-full" as="h2">
            Building secure and <span className="text-gradient">resilient</span> digital experiences.
          </AnimatedHeading>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bio & Skills */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="lg:col-span-2 saas-card p-6 md:p-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-6 bg-primary rounded-full shadow-lg" style={{ boxShadow: "0 0 15px rgba(var(--primary) / 0.5)" }} />
              <h3 className="text-xl font-bold text-white">Professional Summary</h3>
            </div>
            
            <p className="text-[#94a3b8] text-lg leading-relaxed font-light mb-12">
              B.Tech student proficient in C++, Python and Java with hands-on web development using HTML, CSS, JavaScript and Express.js to build secure, responsive applications and RESTful APIs. Seeking software development or cybersecurity internships to apply practical security experience.
            </p>

            <div className="mt-8">
              <h4 className="text-xs uppercase tracking-widest text-[#555555] font-bold mb-4">Technical Stack</h4>
              <TechOrb />
            </div>
          </motion.div>

          {/* Achievements Area */}
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="flex flex-col gap-8"
          >
             <div className="saas-card p-6 md:p-8 flex-1">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-6 bg-primary rounded-full shadow-lg" style={{ boxShadow: "0 0 15px rgba(var(--primary) / 0.5)" }} />
                  <h3 className="text-lg font-bold text-white">Achievements</h3>
                </div>
                <div className="space-y-8">
                  {achievements.map((item) => (
                    <div key={item.title} className="group">
                       <h4 className="text-sm font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h4>
                       <p className="text-xs text-[#666666] font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
             </div>

             <div className="gradient-border group relative h-[60px] cursor-pointer overflow-hidden rounded-2xl">
                {/* Default State */}
                <div className="absolute inset-0 bg-white text-[#050505] flex items-center justify-center gap-3 text-sm font-bold transition-transform duration-500 ease-in-out md:translate-y-0 -translate-y-full md:group-hover:-translate-y-full">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                   Resume
                </div>
                
                {/* Hover State - Dual Options */}
                <div className="absolute inset-0 flex md:translate-y-full translate-y-0 md:group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                   <a 
                      href="/Rohit_Singh_Resume.pdf" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-black text-primary hover:bg-primary hover:text-white flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest border-r border-white/10 transition-all duration-300"
                   >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      View
                   </a>
                   <a 
                      href="/Rohit_Singh_Resume.pdf" 
                      download="Rohit_Singh_Baghel_Resume.pdf"
                      className="flex-1 bg-primary text-black hover:bg-white flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest transition-all duration-300"
                   >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                      Get
                   </a>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
