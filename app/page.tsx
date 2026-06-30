"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import AgentCard from "@/components/AgentCard";
import AgentForm from "@/components/AgentForm";
import OutputPanel from "@/components/OutputPanel";
import { agents, getAgent } from "@/lib/agents";
import { mockGenerateOutput } from "@/lib/mockGenerate";

type Screen = "home" | "form" | "output";

const stats = [
  { label: "Partner QBR", value: "2.5 hrs" },
  { label: "Business Plan", value: "2.75 hrs" },
  { label: "Meeting Follow-Up", value: "1 hr" },
  { label: "Account Research", value: "1.5 hrs" },
  { label: "Pipeline Review", value: "1.5 hrs" },
  { label: "Enablement Content", value: "2 hrs" },
  { label: "Executive Update", value: "1 hr" },
  { label: "Competitive Intel", value: "1.5 hrs" },
  { label: "Partner Recruitment", value: "1.25 hrs" },
];

const outcomes = [
  {
    icon: "🤝",
    title: "More partner conversations",
    body: "Your team's highest-value work is relationship-building. Channel Manager Copilot shifts hours away from documentation and back to the conversations that actually build partner revenue.",
  },
  {
    icon: "⏱",
    title: "Less administrative drag",
    body: "QBR prep, business plans, follow-up emails, pipeline reviews — done in minutes. Your team stops losing afternoons to admin and starts driving outcomes.",
  },
  {
    icon: "📈",
    title: "Consistent output across your team",
    body: "Every Channel Manager produces QBR briefs, business plans, and executive updates at the same high standard — regardless of tenure or experience level.",
  },
];

const execPoints = [
  {
    title: "Every Channel Manager walks into every meeting prepared",
    body: "No more chasing your team for QBR briefs or partner update docs. Consistent preparation, every partner, every time — without you having to ask.",
  },
  {
    title: "New hires ramp faster",
    body: "New Channel Managers get up to speed faster when every workflow has a purpose-built AI assistant behind it. The institutional knowledge is built in from day one.",
  },
  {
    title: "Quality becomes consistent across the team",
    body: "Executive updates, pipeline reviews, and business plans become complete and consistent regardless of who writes them — so your team's output reflects the standard you actually want.",
  },
  {
    title: "Time shifts to revenue-generating activities",
    body: "When your team spends less time on documentation, they spend more time on partner conversations. That's where pipeline comes from.",
  },
];

function ClarixLogo() {
  return (
    <svg width="72" height="20" viewBox="0 0 160 44" fill="none" aria-label="Clarix">
      <rect width="7" height="44" rx="2" fill="rgba(99,102,241,1)" />
      <rect x="11" width="7" height="44" rx="2" fill="rgba(99,102,241,0.5)" />
      <text x="26" y="33" fontFamily="'Arial Black', 'Arial', sans-serif" fontWeight="900" fontSize="33" fill="rgba(255,255,255,1)" letterSpacing="-1">clarix</text>
    </svg>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [output, setOutput] = useState<string>("");

  const activeAgent = activeAgentId ? getAgent(activeAgentId) : null;

  function handleStart(agentId: string) {
    setActiveAgentId(agentId);
    setScreen("form");
  }

  function handleFormSubmit(data: Record<string, string>) {
    setFormData(data);
    const result = mockGenerateOutput(activeAgentId!, data, null);
    setOutput(result);
    setScreen("output");
  }

  function handleStartOver() {
    setScreen("home");
    setActiveAgentId(null);
    setFormData({});
    setOutput("");
  }

  if (screen === "form" && activeAgent) {
    return (
      <Layout>
        <AgentForm agent={activeAgent} onSubmit={handleFormSubmit} onBack={() => setScreen("home")} />
      </Layout>
    );
  }

  if (screen === "output" && activeAgent) {
    return (
      <Layout>
        <OutputPanel agent={activeAgent} formData={formData} initialOutput={output} onStartOver={handleStartOver} />
      </Layout>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F7F6F4" }}>

      {/* Header */}
      <header style={{ background: "#0F172A", borderBottom: "3px solid #6366F1" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <ClarixLogo />
            <div className="h-5 w-px bg-white/20 hidden sm:block" />
            <span className="text-sm font-semibold text-white tracking-wide hidden sm:block">Channel Manager Copilot</span>
          </a>
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "rgba(99,102,241,0.15)", color: "#818CF8", border: "1px solid rgba(99,102,241,0.3)" }}>
            Demo
          </span>
        </div>
      </header>

      {/* Hero */}
      <div className="hero-pattern py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{ background: "rgba(99,102,241,0.2)", color: "#C4B5FD", border: "1px solid rgba(99,102,241,0.35)" }}>
              ✦ Purpose-built for channel &amp; partner teams
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-5">
              Your channel managers should be<br className="hidden sm:block" />
              building relationships.<br />
              <span style={{ color: "#C4B5FD" }}>Not documents.</span>
            </h1>
            <p className="text-base sm:text-lg max-w-2xl leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.88)" }}>
              Channel Manager Copilot gives every Channel Manager on your team a dedicated AI workforce — so QBR prep, business plans, partner follow-ups, and pipeline reviews take minutes, not afternoons.
            </p>
            <p className="text-sm max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              Purpose-built for channel sales. Not adapted from a general-purpose AI tool.
            </p>
          </div>

          {/* Stat bar */}
          <div className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>Time saved per workflow</p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.75)" }}>{s.label}</span>
                  <span className="text-xs font-bold" style={{ color: "#C4B5FD" }}>{s.value}</span>
                </div>
              ))}
            </div>
            <p className="text-sm font-bold mt-4" style={{ color: "#C4B5FD" }}>
              ≈ 15 hours returned to every Channel Manager, every week.
            </p>
          </div>
        </div>
      </div>

      {/* What your team gets */}
      <div className="px-4 sm:px-6 py-10 sm:py-12" style={{ background: "#EFEDE9", borderBottom: "1px solid #E0DDD8" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">What your team gets</p>
          <p className="text-sm text-gray-500 mb-8">The shift that happens when every Channel Manager has an AI workforce behind every workflow.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {outcomes.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* For channel leaders */}
      <div className="px-4 sm:px-6 py-10 sm:py-12" style={{ background: "#EEF2FF", borderBottom: "1px solid #C7D2FE" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#4338CA" }}>For Directors and VPs of Channel Sales</p>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-tight mb-2">
            You&apos;re not buying a tool.<br className="hidden sm:block" />
            You&apos;re giving every Channel Manager an AI-powered support team.
          </h2>
          <p className="text-sm text-gray-600 mb-8 max-w-2xl leading-relaxed">
            When your entire channel team has purpose-built AI behind every workflow, the impact compounds. Here&apos;s what changes at the leadership level.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {execPoints.map((pt) => (
              <div key={pt.title} className="flex gap-3 p-4 rounded-lg bg-white" style={{ border: "1px solid #C7D2FE" }}>
                <span className="text-indigo-600 font-black text-sm flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">{pt.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{pt.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* White-label note */}
          <div className="flex items-start gap-3 pt-6 border-t" style={{ borderColor: "#C7D2FE" }}>
            <span className="text-lg flex-shrink-0">🎨</span>
            <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
              <span className="font-semibold text-gray-900">This is a white-label demo.</span>{" "}
              When deployed for your organization, everything — brand, product names, partner program tiers, agent examples, and output templates — is fully customized to match how your channel team actually works.
            </p>
          </div>
        </div>
      </div>

      {/* Agents grid */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-12">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">9 AI agents. Every core Channel Manager workflow.</p>
        <p className="text-sm text-gray-500 mb-6">Select an agent to see it in action. Load the example to see a realistic output — or enter your own context.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onStart={handleStart} />
          ))}
        </div>
      </main>

      {/* Purpose-built AI + Roadmap */}
      <div style={{ background: "#0F172A", borderTop: "3px solid #6366F1" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Left: differentiation */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#A5B4FC" }}>Purpose-built vs. general-purpose AI</p>
              <h2 className="text-2xl font-black text-white leading-tight mb-4">
                ChatGPT can write.<br />It doesn&apos;t know channel sales.
              </h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.88)" }}>
                Generic AI tools produce generic output. They don&apos;t know what goes into a partner QBR, how to structure a joint business plan, or how to position against a competitor in a partner-led deal. You still spend an hour editing before anything is usable — if it&apos;s usable at all.
              </p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.82)" }}>
                Channel Manager Copilot was built from the ground up for one job: making channel managers more productive in the specific workflows they run every day. Every agent knows the context, structure, and language of channel sales. The output is ready to use — not ready to edit.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {[
                  { label: "Generic AI", items: ["Blank page requiring detailed prompting", "Output needs substantial editing", "No channel-specific context or structure", "Doesn't know your partner program"] },
                  { label: "Channel Manager Copilot", items: ["Purpose-built for channel workflows", "Output ready to send or present", "Structured for how channel sales works", "Built around your program and context"], highlight: true },
                ].map((col) => (
                  <div key={col.label} className="rounded-lg p-4" style={{
                    background: col.highlight ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
                    border: col.highlight ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.1)"
                  }}>
                    <p className="text-xs font-bold mb-3" style={{ color: col.highlight ? "#C4B5FD" : "rgba(255,255,255,0.5)" }}>{col.label}</p>
                    <ul className="space-y-2">
                      {col.items.map((item) => (
                        <li key={item} className="text-xs leading-snug flex gap-2" style={{ color: col.highlight ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.55)" }}>
                          <span className="flex-shrink-0">{col.highlight ? "✓" : "–"}</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-sm leading-relaxed mt-6 border-t pt-5" style={{ color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.12)" }}>
                <span className="font-semibold text-white">Note:</span> outputs in this prototype are built on structured templates and illustrative data. In production, every output is generated by live AI and populated with real pipeline data, partner context, and product-specific proof points — making each one genuinely personalized and field-ready.
              </p>
            </div>

            {/* Right: roadmap */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#A5B4FC" }}>What the full product delivers</p>
              <div className="space-y-4">
                {[
                  { icon: "⚡", title: "Live AI generation", body: "Every output generated in real time by AI — tailored to your specific partner, program, and competitive context. Not templates. Not placeholders." },
                  { icon: "🔗", title: "CRM & Partner Portal sync", body: "Live pipeline data, partner tier status, and deal history pulled directly into every agent. Your team stops copying data and starts making decisions." },
                  { icon: "📊", title: "Team-level performance visibility", body: "See time saved, outputs generated, and partner engagement across your entire channel team — so you can coach to what actually matters." },
                  { icon: "📬", title: "Delivery where your team works", body: "Push outputs directly to Slack or Teams. QBR briefs and partner follow-ups land where your team already is — not in a tool they have to remember to open." },
                  { icon: "📄", title: "One-click export to Word, PDF, PowerPoint", body: "Agent-specific formats — slide decks, scorecards, one-pagers, QBR briefs — exported directly to the format your team needs to present or share." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}>
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col items-center gap-2">
            <svg width="60" height="18" viewBox="0 0 160 44" fill="none" aria-label="Clarix">
              <rect width="7" height="44" rx="2" fill="rgba(99,102,241,0.35)" />
              <rect x="11" width="7" height="44" rx="2" fill="rgba(99,102,241,0.2)" />
              <text x="26" y="33" fontFamily="'Arial Black', 'Arial', sans-serif" fontWeight="900" fontSize="33" fill="rgba(255,255,255,0.35)" letterSpacing="-1">clarix</text>
            </svg>
            <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.65)" }}>
              Clarix Channel Manager Copilot &nbsp;·&nbsp; Partner &amp; Channel Team
              &nbsp;·&nbsp; Not for distribution without written approval
              &nbsp;·&nbsp; © 2026 Chris Archibald. Shared for evaluation purposes only. All rights reserved.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
