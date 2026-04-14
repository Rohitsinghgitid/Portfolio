"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AnimatedHeading from "./AnimatedHeading";
import dynamic from 'next/dynamic';
import { format, subDays, formatDistanceToNow } from "date-fns";

const ActivityCalendar = dynamic(
  () => import("react-activity-calendar").then((mod) => mod.ActivityCalendar),
  { ssr: false }
);

type ActivityData = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

interface StatsState {
  leetCodeData: ActivityData[];
  codeForcesData: ActivityData[];
  leetCodeTotal: number;
  leetCodeSolved: number;
  codeForcesTotal: number;
  codeForcesSolved: number;
  loading: boolean;
  lastUpdated: Date | null;
}

// Function to safely calculate levels based on counts mimicking GitHub
const getLevel = (count: number): 0 | 1 | 2 | 3 | 4 => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  return 4;
};

// Default empty data to prevent react-activity-calendar from crashing
const generateEmptyData = (): ActivityData[] => {
  const data: ActivityData[] = [];
  const today = new Date();
  for (let i = 365; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toISOString().split('T')[0],
      count: 0,
      level: 0,
    });
  }
  return data;
};

export default function CodingActivity() {
  const [stats, setStats] = useState<StatsState>({
    leetCodeData: generateEmptyData(),
    codeForcesData: generateEmptyData(),
    leetCodeTotal: 0,
    leetCodeSolved: 0,
    codeForcesTotal: 0,
    codeForcesSolved: 0,
    loading: true,
    lastUpdated: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [lcRes, lcStatsRes, cfRes] = await Promise.all([
          fetch("https://alfa-leetcode-api.onrender.com/leetcoder0802/calendar").catch(() => null),
          fetch("https://leetcode-stats-api.herokuapp.com/leetcoder0802").catch(() => null),
          fetch("https://codeforces.com/api/user.status?handle=rohit08022005").catch(() => null),
        ]);

        const lcData = lcRes ? await lcRes.json() : null;
        const lcStatsData = lcStatsRes ? await lcStatsRes.json() : null;
        const cfData = cfRes ? await cfRes.json() : null;

        // Initialize 365 days empty arrays with UTC keys
        const lcMap: Record<string, number> = {};
        const cfMap: Record<string, number> = {};
        const today = new Date();
        
        for (let i = 365; i >= 0; i--) {
          const d = new Date(today);
          d.setDate(d.getDate() - i);
          const dateStr = d.toISOString().split('T')[0];
          lcMap[dateStr] = 0;
          cfMap[dateStr] = 0;
        }

        let lcTotalSubmissions = 0;
        let cfTotalSubmissions = 0;
        const cfUniqueSolved = new Set<string>();

        // Parse Leetcode Calendar (UNIX Timestamp -> Count)
        if (lcData && lcData.submissionCalendar) {
          const lcRaw = JSON.parse(lcData.submissionCalendar);
          Object.keys(lcRaw).forEach((timestamp) => {
            const dateStr = new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
            if (lcMap[dateStr] !== undefined) {
              lcMap[dateStr] += lcRaw[timestamp];
              lcTotalSubmissions += lcRaw[timestamp];
            }
          });
        }

        // Parse Codeforces Submissions (ONLY OK VERDICTS)
        if (cfData && cfData.status === "OK") {
          cfData.result.forEach((sub: { verdict: string; creationTimeSeconds: number; problem: { contestId?: number; index?: string } }) => {
            if (sub.verdict === "OK") {
              const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
              cfUniqueSolved.add(problemId);
              
              const dateStr = new Date(sub.creationTimeSeconds * 1000).toISOString().split('T')[0];
              if (cfMap[dateStr] !== undefined) {
                cfMap[dateStr] += 1;
                cfTotalSubmissions += 1;
              }
            }
          });
        }

        // Convert mappings to required arrays
        const constructData = (recordMap: Record<string, number>) => {
          return Object.keys(recordMap).sort().map((date) => ({
            date,
            count: recordMap[date],
            level: getLevel(recordMap[date]),
          }));
        };

        setStats({
          leetCodeData: constructData(lcMap),
          codeForcesData: constructData(cfMap),
          leetCodeTotal: lcTotalSubmissions,
          leetCodeSolved: lcStatsData?.totalSolved || 0,
          codeForcesTotal: cfTotalSubmissions,
          codeForcesSolved: cfUniqueSolved.size,
          loading: false,
          lastUpdated: new Date(),
        });

      } catch (error) {
        console.error("Error fetching activity stats:", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    }
    fetchData();
  }, []);

  return (
    <section id="activity" className="section-padding bg-transparent relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -ml-64 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10 w-full overflow-hidden">
        <div className="mb-16">
          <motion.span 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="text-xs tracking-[0.4em] text-primary uppercase font-bold mb-4 block"
          >
             Activity Tracker
          </motion.span>
          <AnimatedHeading className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight" as="h2">
            Competitive <span className="text-gradient">Contributions.</span>
          </AnimatedHeading>
          {stats.lastUpdated && (
            <div className="mt-4 flex items-center gap-2 text-[10px] text-[#555] uppercase font-bold tracking-widest">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Synced {formatDistanceToNow(stats.lastUpdated)} ago
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8 w-full">
          {/* LeetCode Activity Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="saas-card p-6 md:p-10 w-full overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <span className="text-yellow-500 text-xl font-black">L</span>
              </div>
              <div>
                <a href="https://leetcode.com/u/leetcoder0802/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                   <h3 className="text-xl font-bold text-white flex items-center gap-2">
                     LeetCode 
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#666]"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                   </h3>
                </a>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs text-[#888888]">
                    <span className="text-white font-bold">{stats.leetCodeSolved}</span> Questions Solved
                  </p>
                  <div className="w-1 h-1 rounded-full bg-[#333]" />
                  <p className="text-xs text-[#555555]">
                    <span className="font-bold">{stats.leetCodeTotal}</span> annual submissions
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
              <div className="min-w-[800px]">
                {stats.loading ? (
                  <div className="h-[120px] bg-white/5 rounded-xl animate-pulse" />
                ) : (
                  <ActivityCalendar
                    data={stats.leetCodeData}
                    theme={{
                      light: ['#1c1c1c', '#00b8a344', '#00b8a377', '#00b8a3aa', '#00b8a3'],
                      dark: ['#1c1c1c', '#00b8a344', '#00b8a377', '#00b8a3aa', '#00b8a3'],
                    }}
                    colorScheme="dark"
                    blockSize={12}
                    blockMargin={4}
                    fontSize={12}
                    labels={{
                       legend: {
                          less: 'Less',
                          more: 'More',
                       },
                       months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
                       totalCount: '{{count}} submissions in the past year'
                    }}
                  />
                )}
              </div>
            </div>
          </motion.div>

          {/* CodeForces Activity Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="saas-card p-6 md:p-10 w-full overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <span className="text-blue-500 text-xl font-black">CF</span>
              </div>
              <div>
                <a href="https://codeforces.com/profile/rohit08022005" target="_blank" rel="noopener noreferrer" className="hover:underline">
                   <h3 className="text-xl font-bold text-white flex items-center gap-2">
                     CodeForces
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#666]"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                   </h3>
                </a>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs text-[#888888]">
                    <span className="text-white font-bold">{stats.codeForcesSolved}</span> Problems Solved
                  </p>
                  <div className="w-1 h-1 rounded-full bg-[#333]" />
                  <p className="text-xs text-[#555555]">
                    <span className="font-bold">{stats.codeForcesTotal}</span> annual submissions
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
               <div className="min-w-[800px]">
                  {stats.loading ? (
                    <div className="h-[120px] bg-white/5 rounded-xl animate-pulse" />
                  ) : (
                    <ActivityCalendar
                      data={stats.codeForcesData}
                      theme={{
                        light: ['#1c1c1c', '#3b82f644', '#3b82f677', '#3b82f6aa', '#3b82f6'],
                        dark: ['#1c1c1c', '#3b82f644', '#3b82f677', '#3b82f6aa', '#3b82f6'],
                      }}
                      colorScheme="dark"
                      blockSize={12}
                      blockMargin={4}
                      fontSize={12}
                      labels={{
                         legend: {
                            less: 'Less',
                            more: 'More',
                         },
                         months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
                         totalCount: '{{count}} submissions in the past year'
                      }}
                    />
                  )}
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
