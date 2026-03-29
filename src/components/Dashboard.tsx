"use client";



export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:ml-64 xl:ml-72 min-h-screen bg-[#050505] selection:bg-[#8b5cf6]/30">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#8b5cf6]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-[#34d399]/5 blur-[100px]" />
      </div>

      <main className="relative z-10 p-6 md:p-10 lg:p-14 max-w-7xl mx-auto space-y-10">
        {children}
      </main>

      {/* Mobile Top Bar (Only visible on small screens) */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 z-40 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
           <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] flex items-center justify-center text-white text-[10px] font-black">
            RS
          </div>
          <span className="text-white font-bold tracking-tighter">Portfolio.</span>
        </div>
      </div>
    </div>
  );
}
