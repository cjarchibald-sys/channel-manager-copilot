import { ReactNode } from "react";

function ClarixLogo({ dim = false }: { dim?: boolean }) {
  const textOpacity = dim ? "0.35" : "1";
  const barOpacity = dim ? "0.35" : "1";
  return (
    <svg width="80" height="22" viewBox="0 0 160 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Clarix">
      <rect width="7" height="44" rx="2" fill={`rgba(99,102,241,${barOpacity})`} />
      <rect x="11" width="7" height="44" rx="2" fill={`rgba(99,102,241,${dim ? "0.2" : "0.5"})`} />
      <text x="26" y="33" fontFamily="'Arial Black', 'Arial', sans-serif" fontWeight="900" fontSize="33" fill={`rgba(255,255,255,${textOpacity})`} letterSpacing="-1">clarix</text>
    </svg>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F7F6F4" }}>
      <header style={{ background: "#0F172A", borderBottom: "3px solid #6366F1" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <ClarixLogo />
            <div className="h-5 w-px bg-white/20 hidden sm:block" />
            <span className="text-sm font-semibold text-white/80 tracking-wide hidden sm:block">Channel Manager Copilot</span>
          </a>
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "rgba(99,102,241,0.15)", color: "#818CF8", border: "1px solid rgba(99,102,241,0.3)" }}>
            Demo
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        {children}
      </main>

      <footer style={{ borderTop: "1px solid #E5E3DF", background: "#0F172A" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center gap-2 sm:justify-between">
          <ClarixLogo dim />
          <p className="text-xs text-white/50 text-center sm:text-right">
            Clarix Channel Manager Copilot &nbsp;·&nbsp; Partner &amp; Channel Team &nbsp;·&nbsp; Product Demo
            &nbsp;·&nbsp; © 2026 Clarix. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
