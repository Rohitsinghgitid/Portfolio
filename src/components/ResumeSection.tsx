"use client";

import { motion } from "framer-motion";
import AnimatedHeading from "./AnimatedHeading";

const experience = [
  {
    title: "GEN AI STUDY JAM INTERN",
    company: "Google Cloud",
    type: "Virtual Internship",
    period: "Jan 2023 — March 2023",
    desc: "Completed Google Cloud's Gen AI Study Jam internship focused on developing and deploying generative AI solutions. Built a proof-of-concept using Vertex AI on GKE; processed datasets with BigQuery and Cloud Storage; automated inference with Cloud Functions; presented technical demos via Google Colab and Slides.",
  },
];

const education = [
  {
    school: "Lakshmi Narayan College Of Technology and Science (LNCTS) - Bhopal",
    degree: "B.Tech in Computer Science (Cyber Security)",
    period: "2023 – 2027",
    stats: "CGPA: 7.61 (Latest)",
  },
  {
    school: "Kendriya Vidyalaya - Wellington",
    degree: "Class 12th (Science)",
    period: "2022 – 2023",
    stats: "Result: 79.2%",
  },
  {
    school: "Army Public School - Wellington",
    degree: "Class 10th",
    period: "2020 – 2021",
    stats: "Result: 84.4%",
  },
];

const achievements = [
  { name: "Research Paper", provider: "ICAIEST 2026 Conference" },
  { name: "SIH Internal Winner", provider: "Smart India Hackathon" },
];

const certifications = [
  { name: "Gen AI Study Jam", provider: "Google", file: "/gen ai study jam.pdf" },
  { name: "Ethical Hacking", provider: "NPTEL", file: "/Ethical_Hacker certificate.pdf" },
  { name: "Oracle Ai foundation associate", provider: "Oracle", file: "/oracle ai foundation associate.pdf" },
  { name: "IoT & Digital Transformation", provider: "NASSCOM", file: "/introduction to iot and digital transformation-NASSCOM.pdf" },
  { name: "Certified Frontend Web Developer", provider: "Infosys Springboard", file: "/frontend web dev infosis.pdf" },
];

export default function ResumeSection() {
  return (
    <section id="resume" className="section-padding bg-transparent backdrop-blur-sm relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
        {/* Experience & Education */}
        <div className="lg:col-span-8 space-y-20">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-16">
               <AnimatedHeading as="h3" className="text-xl font-bold text-primary uppercase tracking-[0.4em] flex flex-wrap">Experience</AnimatedHeading>
               <motion.div 
                 className="flex-1 h-px bg-white/5 origin-left"
                 initial={{ scaleX: 0 }}
                 whileInView={{ scaleX: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
               />
            </div>

            <motion.div 
              className="space-y-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {experience.map((exp, i) => (
                <div key={i} className="saas-card p-6 md:p-10 group relative overflow-hidden border-l-4 border-l-primary">
                  <div className="relative md:absolute md:top-0 md:right-0 md:p-8 mb-4 md:mb-0 text-xs font-mono text-[#444444] tracking-widest">{exp.period}</div>
                  
                  <div className="flex flex-col gap-2 mb-6">
                    <h4 className="text-2xl font-black text-white group-hover:text-primary transition-colors">{exp.title}</h4>
                    <p className="text-sm font-bold text-primary uppercase tracking-widest">{exp.company} • {exp.type}</p>
                  </div>
                  
                  <p className="text-[#94a3b8] text-lg leading-relaxed font-light max-w-2xl">{exp.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <div id="education">
            <div className="flex items-center gap-4 mb-16">
               <AnimatedHeading as="h3" className="text-xl font-bold text-primary uppercase tracking-[0.4em] flex flex-wrap">Education</AnimatedHeading>
               <motion.div 
                 className="flex-1 h-px bg-white/5 origin-left"
                 initial={{ scaleX: 0 }}
                 whileInView={{ scaleX: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1 }}
               />
            </div>

            <motion.div 
              className="space-y-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {education.map((edu, i) => (
                <div key={i} className="saas-card p-6 md:p-10 group border-l-4 border-l-primary/60 hover:border-l-primary transition-all">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h4 className="text-2xl font-black text-white group-hover:text-primary transition-colors leading-tight">{edu.school}</h4>
                    <span className="text-xs font-mono text-[#555555] uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg">{edu.period}</span>
                  </div>
                  <p className="text-[#94a3b8] text-lg mb-4 font-light leading-relaxed">{edu.degree}</p>
                  <p className="text-primary text-xs font-black uppercase tracking-[0.4em]">{edu.stats}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Certifications Sidebar */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <motion.div 
            className="sticky top-32"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-12">
               <h3 className="text-xl font-bold text-white uppercase tracking-[0.3em]">Highlights</h3>
            </div>

            <ul className="space-y-6 mb-20">
              {achievements.map((ach, i) => (
                <li key={i} className="saas-card p-6 flex flex-col items-start gap-1 group border-l-2 border-l-primary/40 hover:border-l-primary transition-all cursor-default">
                  <span className="text-sm font-bold text-white group-hover:text-primary transition-all">
                    {ach.name}
                  </span>
                  <span className="text-[10px] text-[#555555] font-black uppercase tracking-widest">
                    {ach.provider}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 mb-12">
               <h3 className="text-xl font-bold text-white uppercase tracking-[0.3em]">Credentials</h3>
            </div>

            <ul className="space-y-6">
              {certifications.map((cert, i) => (
                <li key={i} className="saas-card p-6 flex flex-col items-start group hover:border-primary/30 transition-all duration-300 cursor-default">
                  <span className="text-sm font-bold text-white group-hover:text-primary transition-colors mb-1">
                    {cert.name}
                  </span>
                  <span className="text-[10px] text-[#555555] font-black uppercase tracking-widest">
                    {cert.provider}
                  </span>
                  
                  {cert.file && (
                    <div className="w-full grid grid-rows-[1fr] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-300 ease-out opacity-100 md:opacity-0 md:group-hover:opacity-100">
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-2 mt-4 pb-1">
                           <a
                              href={cert.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-[#94a3b8] bg-white/5 border border-white/5 hover:text-white hover:bg-primary/20 hover:border-primary/50 rounded-xl transition-all duration-300"
                            >
                               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                               View
                            </a>
                            <a
                              href={cert.file}
                              download
                              className="flex items-center justify-center p-2 text-white bg-primary text-black hover:bg-white rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            </a>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
