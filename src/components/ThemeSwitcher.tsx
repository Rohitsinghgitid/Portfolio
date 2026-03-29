"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Theme, useTheme } from "./ThemeProvider";

const themes: { id: Theme; color: string; label: string }[] = [
  { id: "violet", color: "#8b5cf6", label: "Violet" },
  { id: "emerald", color: "#34d399", label: "Emerald" },
  { id: "rose", color: "#f43f5e", label: "Rose" },
  { id: "amber", color: "#f59e0b", label: "Amber" },
  { id: "blue", color: "#3b82f6", label: "Blue" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-0 mb-4 flex flex-col gap-3 p-4 saas-card w-40"
          >
             <h4 className="text-[10px] font-black uppercase text-[#888888] tracking-widest mb-1 border-b border-white/5 pb-2">
                Brand Color
             </h4>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                   setTheme(t.id);
                   setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full text-left text-xs font-bold transition-all px-2 py-1.5 rounded-lg ${theme === t.id ? "bg-white/10 text-white" : "text-[#888888] hover:text-white hover:bg-white/5"}`}
              >
                <div 
                  className="w-3.5 h-3.5 rounded-full outline outline-2 outline-offset-2 outline-transparent"
                  style={{ 
                     backgroundColor: t.color,
                     outlineColor: theme === t.id ? t.color : "transparent"
                  }} 
                />
                {t.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 rounded-full saas-card flex items-center justify-center text-[#888888] hover:text-white transition-colors border border-white/10 shadow-xl"
        style={{
           boxShadow: isOpen ? "0 0 30px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)"
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
           <circle cx="12" cy="12" r="3"></circle>
           <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </motion.button>
    </div>
  );
}
