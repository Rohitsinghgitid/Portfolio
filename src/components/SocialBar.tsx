"use client";

import { motion } from "framer-motion";

export const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Rohitsinghgitid",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rohit-singh-baghel-bb6410321",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/leetcoder0802/",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.88 9.88a1.374 1.374 0 0 0 0 1.94l9.88 9.88a1.374 1.374 0 0 0 1.94 0l9.88-9.88a1.374 1.374 0 0 0 0-1.94L14.444.414A1.374 1.374 0 0 0 13.483 0zm0 2.214a.8.8 0 0 1 .56.242l8.36 8.36a.8.8 0 0 1 0 1.134l-8.36 8.36a.8.8 0 0 1-1.12 0l-8.36-8.36a.8.8 0 0 1 0-1.134l8.36-8.36a.8.8 0 0 1 .56-.242zM12.5 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
      </svg>
    ),
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/rohit08022005",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
      </svg>
    ),
  },
  {
    label: "HackerRank",
    href: "https://www.hackerrank.com/profile/rohitbaghel0802",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    label: "Codolio",
    href: "https://codolio.com/profile/rohitsinghbaghel0802",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
];

export default function SocialBar() {
  return (
    <motion.div
      className="fixed left-6 bottom-0 z-50 hidden xl:flex flex-col items-center gap-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="flex flex-col items-center gap-6">
        {socials.map((social) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            id={`side-social-${social.label.toLowerCase()}`}
            className="text-[#555555] hover:text-[#7c6af7] transition-all duration-300"
            whileHover={{ y: -4, scale: 1.1 }}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
      {/* Vertical line connection */}
      <div className="w-px h-24 bg-gradient-to-b from-[#555555] to-transparent mt-2" />
    </motion.div>
  );
}
