"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function GlowBlob() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for a fluid, floating feel
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Center the blob on the mouse (blob size is 600px)
      mouseX.set(e.clientX - 300);
      mouseY.set(e.clientY - 300);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      <motion.div
        style={{
          x: springX,
          y: springY,
          willChange: "transform",
        }}
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.2] blur-[80px] bg-primary/20 bg-gradient-to-br from-primary/30 to-primary-light/10"
      />
    </div>
  );
}
