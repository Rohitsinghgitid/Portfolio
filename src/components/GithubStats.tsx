"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GithubRepo {
  stargazers_count: number;
  language: string | null;
  name: string;
}

interface GithubStatsData {
  stars: number;
  repos: number;
  followers: number;
  languages: { name: string; color: string; percent: number }[];
  loading: boolean;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  "C++": "#f34b7d",
  Java: "#b07219",
  Shell: "#89e051",
};

export default function GithubStats() {
  const [data, setData] = useState<GithubStatsData>({
    stars: 0,
    repos: 0,
    followers: 0,
    languages: [],
    loading: true,
  });

  useEffect(() => {
    async function fetchGithubData() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/Rohitsinghgitid"),
          fetch("https://api.github.com/users/Rohitsinghgitid/repos?per_page=100"),
        ]);

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        if (!Array.isArray(reposData)) {
           throw new Error("Invalid repos data");
        }

        // Calculate stars
        const stars = reposData.reduce((acc: number, repo: GithubRepo) => acc + repo.stargazers_count, 0);

        // Calculate languages
        const langMap: Record<string, number> = {};
        reposData.forEach((repo: GithubRepo) => {
          if (repo.language) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
          }
        });

        const totalLangs = Object.values(langMap).reduce((acc, val) => acc + val, 0);
        const languages = Object.entries(langMap)
          .map(([name, count]) => ({
            name,
            percent: Math.round((count / totalLangs) * 100),
            color: LANGUAGE_COLORS[name] || "#888888",
          }))
          .sort((a, b) => b.percent - a.percent)
          .slice(0, 5);

        setData({
          stars,
          repos: userData.public_repos,
          followers: userData.followers,
          languages,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setData(prev => ({ ...prev, loading: false }));
      }
    }

    fetchGithubData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="saas-card p-6 md:p-10 w-full overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
          </div>
          <div>
            <a href="https://github.com/Rohitsinghgitid" target="_blank" rel="noopener noreferrer" className="hover:underline">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                GitHub Dashboard
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#666]"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </h3>
            </a>
            <p className="text-xs text-[#888888] mt-1">Real-time open source statistics</p>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="text-center">
            <div className="text-2xl font-black text-white">{data.loading ? "..." : data.stars}</div>
            <div className="text-[10px] text-[#555] uppercase font-bold tracking-widest">Stars</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white">{data.loading ? "..." : data.repos}</div>
            <div className="text-[10px] text-[#555] uppercase font-bold tracking-widest">Repos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-white">{data.loading ? "..." : data.followers}</div>
            <div className="text-[10px] text-[#555] uppercase font-bold tracking-widest">Followers</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
           <h4 className="text-xs font-bold text-[#888] uppercase tracking-widest">Most Used Languages</h4>
        </div>
        
        {data.loading ? (
          <div className="h-2 w-full bg-white/5 rounded-full animate-pulse" />
        ) : (
          <div className="space-y-6">
            <div className="h-2.5 w-full flex rounded-full overflow-hidden bg-white/5">
              {data.languages.map((lang, idx) => (
                <motion.div
                  key={lang.name}
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percent}%` }}
                  transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                  style={{ backgroundColor: lang.color }}
                  className="h-full"
                />
              ))}
            </div>
            
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {data.languages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                  <span className="text-xs font-bold text-white">{lang.name}</span>
                  <span className="text-xs text-[#555] font-mono">{lang.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
