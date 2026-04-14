"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 30 });

  // Shine position
  const shineX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]));
  const shineY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    mouseX.set(mouseXPos / width - 0.5);
    mouseY.set(mouseYPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative perspective-1000 ${className}`}
    >
      {/* Shine Overlay */}
      <motion.div
        style={{
          background: useTransform(
            [shineX, shineY],
            ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.1) 0%, transparent 60%)`
          ),
          position: "absolute",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          borderRadius: "inherit",
        }}
      />
      
      {/* Actual Content - slightly lifted */}
      <motion.div style={{ translateZ: 20 }} className="w-full h-full">
        {children}
      </motion.div>
    </motion.div>
  );
}
