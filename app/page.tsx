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
  { label: "Partner QBR", value: "2.5 hrs saved" },
  { label: "Business Plan", value: "2.75 hrs saved" },
  { label: "Meeting Follow-Up", value: "1 hr saved" },
  { label: "Account Research", value: "1.5 hrs saved" },
  { label: "Pipeline Review", value: "1.5 hrs saved" },
  { label: "Enablement Content", value: "2 hrs saved" },
  { label: "Executive Update", value: "1 hr saved" },
  { label: "Competitive Intel", value: "1.5 hrs saved" },
  { label: "Partner Recruitment", value: "1.25 hrs saved" },
  { label: "All 9 Agents", value: "~15 hrs saved" },
];

const howItWorks = [
  { step: "01", title: "Pick your workflow", body: "Choose from 9 purpose-built agents covering every core partner management task." },
  { step: "02", title: "Fill in what you know", body: "Answer a few focused questions — or load a realistic example to see it in action." },
  { step: "03", title: "Get a polished output", body: "Receive a copy-ready document in seconds. Refine it, send it, or paste it anywhere." },
];

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
      <header style={{ background: "#2D2828", borderBottom: "3px solid #FF6900" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <svg width="56" height="26" viewBox="0 0 180 80" fill="none" aria-label="8x8">
              <text x="0" y="68" fontFamily="'Arial Black', 'Arial', sans-serif" fontWeight="900" fontSize="80" fill="#FFFFFF" letterSpacing="-2">8x8</text>
            </svg>
            <div className="h-5 w-px bg-white/20 hidden sm:block" />
            <span className="text-sm font-semibold text-white/80 tracking-wide hidden sm:block">Partner Manager Copilot</span>
          </a>
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "rgba(255,105,0,0.15)", color: "#FF6900", border: "1px solid rgba(255,105,0,0.3)" }}>
            Internal Use Only
          </span>
        </div>
      </header>

      {/* Hero */}
      <div className="hero-pattern py-10 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{ background: "rgba(255,105,0,0.15)", color: "#FF6900", border: "1px solid rgba(255,105,0,0.25)" }}>
              ✦ Purpose-built for 8x8's Partner & Channel Team
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
              What are you trying<br />
              to get <span style={{ color: "#FF6900" }}>done today?</span>
            </h1>
            <p className="text-base sm:text-lg text-white/60 max-w-xl leading-relaxed">
              AI assistants that turn raw notes, pipeline data, and partner context into polished, ready-to-use outputs — in minutes, not hours.
            </p>
            <p className="text-sm font-semibold mt-4 max-w-xl" style={{ color: "#FF6900" }}>
              You're the Agent Boss. These AI agents work for you — so you can spend your time on the conversations, relationships, and decisions that actually drive revenue.
            </p>

          </div>

          {/* Stat bar */}
          <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="text-xs text-white/50">{s.label}</span>
                <span className="text-xs font-bold" style={{ color: "#FF6900" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="px-4 sm:px-6 py-8 sm:py-10" style={{ background: "#EFEDE9", borderBottom: "1px solid #E0DDD8" }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">How it works</p>
          <p className="text-sm text-gray-500 mb-6">You direct. The agent delivers. You stay in control — the AI just does the heavy lifting.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {howItWorks.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="text-2xl font-black flex-shrink-0" style={{ color: "#FF6900", opacity: 0.4 }}>{item.step}</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agents grid */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Choose an agent</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} onStart={handleStart} />
          ))}
        </div>
      </main>

      {/* Vision section */}
      <div style={{ background: "#2D2828", borderTop: "3px solid #FF6900" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#FF6900" }}>This is v1. What comes next.</p>
              <h2 className="text-2xl font-black text-white leading-tight mb-4">
                The roadmap for an AI-powered channel team.
              </h2>
              <p className="text-white/75 text-sm leading-relaxed">
                This tool demonstrates what's possible when AI is wired directly into the workflows the channel team runs every day. The infrastructure is in place. Here's where it goes next.
              </p>
              <p className="text-white/70 text-sm leading-relaxed mt-4 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <span className="font-semibold text-white/90">Note:</span> outputs in this prototype are built on structured templates and illustrative data. In production, every output would be generated by live AI and populated with real pipeline data, partner context, and 8x8-specific proof points — making each one genuinely personalized and field-ready.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: "⚡", title: "Real-time AI generation", body: "Replace placeholder outputs with live GPT-4o generation tailored to 8x8's products and partner program." },
                { icon: "🔗", title: "Salesforce & Partner Portal integration", body: "Pull live pipeline data, partner tier status, and deal history directly into every agent — no copy/paste." },
                { icon: "📊", title: "Partner performance dashboard", body: "Track time saved, outputs generated, and partner engagement across the entire channel team." },
                { icon: "📬", title: "8x8 Work, Slack & Teams delivery", body: "Push outputs directly into 8x8 Work — and Slack or Teams for partners — so QBR prep and follow-ups land where your team already works." },
                { icon: "📄", title: "One-click export", body: "When AI-enabled, outputs will export directly to Word, PDF, PowerPoint, Google Docs, or Slides — and agent-specific formats like slide decks, scorecards, and tables will be available as generation options." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-lg" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-white/50 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center gap-2 sm:justify-between">
            <svg width="44" height="20" viewBox="0 0 180 80" fill="none" aria-label="8x8">
              <text x="0" y="68" fontFamily="'Arial Black', 'Arial', sans-serif" fontWeight="900" fontSize="80" fill="rgba(255,255,255,0.3)" letterSpacing="-2">8x8</text>
            </svg>
            <p className="text-xs text-white/50 text-center sm:text-right">
              8x8 Internal Use Only &nbsp;·&nbsp; Partner &amp; Channel Team &nbsp;·&nbsp; Not for distribution outside 8x8
              &nbsp;·&nbsp; © 2026 Chris Archibald. Shared for evaluation purposes only. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
