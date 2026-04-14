"use client";

import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const navItems = [
  { label: "Profile", to: "about", icon: "👤" },
  { label: "Experience", to: "resume", icon: "💼" },
  { label: "Activity", to: "activity", icon: "📈" },
  { label: "Projects", to: "work", icon: "📂" },
  { label: "Contact", to: "contact", icon: "✉️" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-0 lg:w-64 xl:w-72 bg-[#0a0a0a] border-r border-white/5 z-50 transition-all duration-300 overflow-hidden hidden lg:flex flex-col py-10 px-6">
      <div className="mb-12">
        <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-xs">
            RS
          </span>
          <span className="text-white">Portfolio.</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <ScrollLink
            key={item.to}
            to={item.to}
            spy={true}
            smooth={true}
            duration={500}
            offset={-20}
            activeClass="active-nav"
            className="group flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer text-[#888888] hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            <span className="text-sm opacity-60 group-hover:opacity-100">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
            <motion.div
              className="ml-auto w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-[.active-nav]:opacity-100"
              layoutId="nav-dot"
            />
          </ScrollLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-[#555555] font-bold">
                Available
              </span>
            </div>
            <p className="text-[11px] text-[#888888] leading-tight">
              Looking for software development or cybersecurity internships.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
