"use client";

import { motion } from "framer-motion";

const socials = [
  { label: "GitHub", href: "https://github.com/Rohitsinghgitid" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rohit-singh-baghel" },
  { label: "Codolio", href: "https://codolio.com/profile/rohitsinghbaghel0802" },
];

export default function Footer() {
  return (
    <footer id="contact" className="section-padding bg-transparent backdrop-blur-sm relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-20 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-radial from-primary/20 to-transparent blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="text-center"
        >
          <span className="text-xs tracking-[0.8em] text-primary uppercase font-bold mb-8 block">Ready for Internships</span>
          <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-16 leading-none select-none">
            Let&apos;s <span className="text-gradient">Talk.</span>
          </h2>
          
          <div className="flex flex-col items-center gap-12">
            <motion.a
              href="mailto:contact@rohitsingh.com"
              className="saas-card px-12 py-8 text-2xl md:text-4xl font-light text-[#94a3b8] hover:text-white transition-all duration-300 border-white/5 hover:border-primary/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              rohitsinghbaghel0802@gmail.com
            </motion.a>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-[0.4em] font-black text-[#555555] hover:text-primary transition-all"
                  whileHover={{ y: -4 }}
                >
                  {social.label}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-40 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-[10px] font-black">
               RS
             </div>
             <p className="text-[10px] uppercase tracking-widest text-[#444444] font-bold">
               © 2024 Rohit Singh. Built with Next.js & Framer Motion.
             </p>
          </div>
          
          <div className="flex gap-4 items-center">
             <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
             <span className="text-[10px] uppercase tracking-widest text-[#444444] font-bold">Specializing in Cyber Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
