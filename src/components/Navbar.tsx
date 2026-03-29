"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#resume" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Glass background that appears on scroll */}
        <motion.div
          className="absolute inset-0 rounded-b-2xl pointer-events-none"
          style={{
            opacity: bgOpacity,
            background: "rgba(10,10,10,0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        />

        <div className="relative max-w-6xl mx-auto flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="/"
            id="nav-logo"
            className="font-black text-xl tracking-tight"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #f0f0f0, rgb(var(--primary)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              RSB.
            </span>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                className="relative overflow-hidden group text-sm text-[#888888] hover:text-white font-light tracking-wide flex items-center py-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <span className="absolute inset-0 flex items-center justify-center translate-y-[120%] group-hover:translate-y-0 text-primary transition-transform duration-500 ease-[0.22,1,0.36,1]">
                  {link.label}
                </span>
                <span className="transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-[120%] inline-block">
                  {link.label}
                </span>
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              id="nav-cta"
              className="text-xs px-5 py-2.5 rounded-full font-medium tracking-wide transition-all duration-300"
              style={{
                background: "rgba(var(--primary) / 0.15)",
                border: "1px solid rgba(var(--primary) / 0.3)",
                color: "rgb(var(--primary-light))",
              }}
              whileHover={{
                background: "rgba(var(--primary) / 0.25)",
                borderColor: "rgba(var(--primary) / 0.6)",
                scale: 1.04,
              }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            id="nav-mobile-toggle"
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-5 h-px bg-[#f0f0f0]"
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-5 h-px bg-[#f0f0f0]"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-5 h-px bg-[#f0f0f0]"
              animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
        style={{
          background: "rgba(10,10,10,0.97)",
          backdropFilter: "blur(20px)",
        }}
        initial={false}
        animate={menuOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="relative overflow-hidden group text-3xl font-bold text-[#f0f0f0] transition-colors duration-300 flex items-center py-1"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.07 }}
            >
              <span className="absolute inset-0 flex items-center justify-center translate-y-[120%] group-hover:translate-y-0 text-primary transition-transform duration-500 ease-[0.22,1,0.36,1]">
                {link.label}
              </span>
              <span className="transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-[120%] inline-block">
                {link.label}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
}
