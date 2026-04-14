"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const skills = [
  "C++", "Python", "Java", "HTML5", "CSS3", "JavaScript",
  "Express.js", "MySQL", "Git", "GitHub", "Kali Linux",
  "Metasploit", "Penetration Testing", "Problem-Solving", "Cloud Computing",
  "React", "Next.js", "TypeScript", "Docker", "Node.js"
];

export default function TechOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<{ name: string; x: number; y: number; z: number }[]>([]);
  const [radius, setRadius] = useState(200);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const newRadius = isMobile ? 120 : 200;
      setRadius(newRadius);

      const newItems = skills.map((skill, i) => {
        const phi = Math.acos(-1 + (2 * i) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        
        return {
          name: skill,
          x: newRadius * Math.sin(phi) * Math.cos(theta),
          y: newRadius * Math.sin(phi) * Math.sin(theta),
          z: newRadius * Math.cos(phi),
        };
      });
      setItems(newItems);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) * 0.1);
    mouseY.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[280px] md:h-[400px] flex items-center justify-center cursor-default perspective-[1000px] select-none"
    >
      <motion.div 
        style={{ 
          rotateY: springX, 
          rotateX: useTransform(springY, (v) => -v) 
        }}
        className="relative w-full h-full preserve-3d"
      >
        {items.map((item, i) => (
          <SkillItem key={i} item={item} radius={radius} />
        ))}
      </motion.div>
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
    </div>
  );
}

function SkillItem({ item, radius }: { item: { name: string; x: number; y: number; z: number }; radius: number }) {
  const opacity = (item.z + radius * 1.25) / (radius * 2.5);
  const scale = 0.5 + (item.z + radius * 1.25) / (radius * 3);

  return (
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        x: item.x,
        y: item.y,
        z: item.z,
        opacity: Math.max(0.15, opacity),
        scale: Math.max(0.4, scale),
      }}
      className="whitespace-nowrap px-2 py-1 md:px-3 md:py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-bold text-[#888] hover:text-white hover:border-primary/50 hover:bg-primary/20 transition-colors pointer-events-auto"
      whileHover={{ scale: scale * 1.2, color: "#fff", z: item.z + 50 }}
    >
      {item.name}
    </motion.div>
  );
}
