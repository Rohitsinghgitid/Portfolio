"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useTransform, useMotionValueEvent, motion, MotionValue } from "framer-motion";
import Overlay from "./Overlay";



const TOTAL_FRAMES = 80;
const FRAME_BASE = "/sequence/";

// Generate frame filenames matching the actual files
const getFramePath = (index: number): string => {
  const padded = String(index).padStart(2, "0");
  return `${FRAME_BASE}frame_${padded}_delay-0.062s.png`;
};

export default function ScrollyCanvas({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Draw frame on canvas with cover logic
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const ox = (cw - nw) / 2;
    const oy = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, ox, oy, nw, nh);
  }, []);

  // Preload (same as before)
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      images[0] = firstImg;
      imagesRef.current = images;
      drawFrame(0);
      setIsLoaded(true);
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loaded++;
        images[i] = img;
        imagesRef.current = images;
        const progress = Math.round((loaded / TOTAL_FRAMES) * 100);
        setLoadProgress(progress);
      };
      images[i] = img;
    }
  }, [drawFrame]);

  // Resize (same as before)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  // Motion Event (using the passed scrollYProgress)
  useMotionValueEvent(scrollYProgress, "change", (latest: number) => {
    const frameIndex = Math.min(
      Math.floor(latest * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    );

    if (frameIndex !== currentFrameRef.current) {
      currentFrameRef.current = frameIndex;

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        drawFrame(frameIndex);
      });
    }
  });

  return (
    <div style={{ height: "500vh" }} className="relative pointer-events-none">
      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Loading screen */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]">
            <div className="mb-8 text-xs font-light tracking-[0.4em] text-[#888888] uppercase">
              Loading Experience
            </div>
            <div className="w-48 h-px bg-[#1c1c1c] relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7c6af7] to-[#a78bfa]"
                initial={{ width: "0%" }}
                animate={{ width: `${loadProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="mt-4 text-xs text-[#555555] font-mono">
              {loadProgress}%
            </div>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
        />

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
        
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,10,0.5) 100%)"
          }}
        />

        {/* Cinematic Content Overlays */}
        <Overlay scrollYProgress={scrollYProgress} />

        {/* Scroll indicator (fades out as user scrolls) */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
        >
          <span className="text-xs tracking-[0.3em] text-[#666666] uppercase font-light">
            Scroll
          </span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-[#7c6af7] to-transparent"
            animate={{ scaleY: [0, 1, 0], y: [0, 8, 16] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
