import { ReactNode } from "react";

function EightByEightLogo() {
  return (
    <svg width="56" height="26" viewBox="0 0 180 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="8x8">
      <text x="0" y="68" fontFamily="'Arial Black', 'Arial', sans-serif" fontWeight="900" fontSize="80" fill="#FFFFFF" letterSpacing="-2">8x8</text>
    </svg>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F7F6F4" }}>
      <header style={{ background: "#2D2828", borderBottom: "3px solid #FF6900" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <EightByEightLogo />
            <div className="h-5 w-px bg-white/20 hidden sm:block" />
            <span className="text-sm font-semibold text-white/80 tracking-wide hidden sm:block">Partner Manager Copilot</span>
          </a>
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "rgba(255,105,0,0.15)", color: "#FF6900", border: "1px solid rgba(255,105,0,0.3)" }}>
            Internal Use Only
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10">
        {children}
      </main>

      <footer style={{ borderTop: "1px solid #E5E3DF", background: "#2D2828" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center gap-2 sm:justify-between">
          <div className="flex items-center gap-3">
            <EightByEightLogo />
          </div>
          <p className="text-xs text-white/50 text-center sm:text-right">
            8x8 Internal Use Only &nbsp;·&nbsp; Partner &amp; Channel Team &nbsp;·&nbsp; Not for distribution outside 8x8
            &nbsp;·&nbsp; © 2026 Chris Archibald. Shared for evaluation purposes only. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
