"use client";

import { useState, useEffect, useRef } from "react";

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}
import { Modifier, mockGenerateOutput } from "@/lib/mockGenerate";
import { Agent } from "@/lib/agents";

interface OutputPanelProps {
  agent: Agent;
  formData: Record<string, string>;
  initialOutput: string;
  onStartOver: () => void;
}

function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/^### (.+)$/gm, '<h3 class="text-sm font-bold text-gray-900 mt-5 mb-1.5 uppercase tracking-wide" style="color:#0F172A">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold mt-6 mb-2" style="color:#0F172A">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-xl font-bold mt-6 mb-2" style="color:#0F172A">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #E8E6E3;margin:16px 0" />')
    .replace(/^\| (.+) \|$/gm, (_, row) => {
      const cells = row.split(" | ");
      return `<tr>${cells.map((c: string) => `<td style="padding:8px 12px;font-size:13px;border:1px solid #E8E6E3;color:#374151">${c.trim()}</td>`).join("")}</tr>`;
    })
    .replace(/^\|[-| ]+\|$/gm, '')
    .replace(/^[-•] \[ \] (.+)$/gm, '<li style="display:flex;gap:8px;font-size:13px;color:#374151;margin-bottom:6px"><span style="margin-top:1px;color:#6366F1">☐</span><span>$1</span></li>')
    .replace(/^[-•] (.+)$/gm, '<li style="font-size:13px;color:#374151;margin-bottom:5px;padding-left:16px;position:relative"><span style="position:absolute;left:0;color:#6366F1">›</span>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li style="font-size:13px;color:#374151;margin-bottom:5px;padding-left:4px;list-style:decimal;list-style-position:inside">$1</li>')
    .replace(/^(<strong\b.+|[^<\n].+)$/gm, '<p style="font-size:13px;color:#374151;margin-bottom:8px;line-height:1.65">$1</p>')
    .replace(/\n\n/g, '\n');
}

function useStreamingText(fullText: string) {
  const [displayed, setDisplayed] = useState("");
  const [streaming, setStreaming] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setDisplayed("");
    setStreaming(true);

    const words = fullText.split(" ");
    let index = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      index += 4;
      if (index >= words.length) {
        setDisplayed(fullText);
        setStreaming(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        setDisplayed(words.slice(0, index).join(" "));
      }
    }, 28);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [fullText]);

  return { displayed, streaming };
}

export default function OutputPanel({ agent, formData, initialOutput, onStartOver }: OutputPanelProps) {
  const [output, setOutput] = useState(initialOutput);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState<Modifier | null>(null);
  const { displayed, streaming } = useStreamingText(output);

  function applyModifier(modifier: Modifier) {
    setLoading(modifier);
    setTimeout(() => {
      setOutput(mockGenerateOutput(agent.id, formData, modifier));
      setLoading(null);
    }, 400);
  }

  const MANAGER_MARKER = '<!-- MANAGER_NOTES -->';
  const [distributionOutput, managerOutput] = output.split(MANAGER_MARKER);
  const [displayedDistribution, displayedManager] = displayed.split(MANAGER_MARKER);

  function copyOutput() {
    const textToCopy = (distributionOutput || output).trim();
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function sendAsEmail() {
    const textToSend = (distributionOutput || output).trim();
    const subject = encodeURIComponent(`Clarix — ${agent.name} Output`);
    const body = encodeURIComponent(textToSend.replace(/#{1,3} /g, '').replace(/\*\*/g, '').replace(/---/g, '---'));
    window.open(`mailto:?subject=${subject}&body=${body}`);
  }

  return (
    <div className="max-w-3xl mx-auto fade-in-up">
      {/* Header */}
      <div className="rounded-xl px-4 sm:px-5 py-4 mb-4 flex items-center justify-between"
        style={{ background: "#0F172A" }}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{agent.icon}</span>
          <div>
            <h2 className="font-bold text-white text-base leading-tight">{agent.name}</h2>
            <p className="text-xs text-white/50 mt-0.5 hidden sm:block">Output ready — copy, refine, or send</p>
          </div>
        </div>
        <button
          onClick={onStartOver}
          className="text-sm font-semibold text-white/80 hover:text-white border border-white/40 hover:border-white/70 px-4 py-2 rounded-lg transition-all"
        >
          ← Choose Another Agent
        </button>
      </div>

      {/* Time saved + modifier buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1", border: "1px solid rgba(99,102,241,0.2)" }}>
          ⏱ Saves ~{formatTime(agent.estimatedMinutes)}
        </div>

        <div className="flex-1 hidden sm:block" />

        {(["shorter", "executive", "action_items"] as Modifier[]).map((mod) => (
          <button
            key={mod}
            onClick={() => applyModifier(mod)}
            disabled={!!loading || streaming}
            className="text-xs font-medium border px-3 py-2 rounded-lg text-gray-600 hover:text-gray-900 hover:border-gray-400 bg-white transition-all disabled:opacity-40"
            style={{ border: "1px solid #E8E6E3" }}
          >
            {loading === mod ? "Working..." : mod === "shorter" ? "Make Shorter" : mod === "executive" ? "More Executive-Ready" : "Add Action Items"}
          </button>
        ))}
      </div>

      {/* Output document */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: "1px solid #E8E6E3", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        {/* Document top bar */}
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between" style={{ background: "#F7F6F4", borderBottom: "1px solid #E8E6E3" }}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: "#6366F1" }} />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Clarix Channel Manager Copilot — Output</span>
          </div>
          {streaming && (
            <span className="text-xs font-medium" style={{ color: "#6366F1" }}>● Generating...</span>
          )}
        </div>

        {/* Content */}
        <div className="px-4 sm:px-7 py-5 sm:py-6 min-h-64 overflow-x-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#6366F1", borderTopColor: "transparent" }} />
              <p className="text-sm text-gray-400">Regenerating output...</p>
            </div>
          ) : (
            <>
              <div
                className={streaming && !displayedManager ? "streaming-cursor" : ""}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(displayedDistribution || displayed) }}
              />
              {displayedManager && (
                <div className="mt-6 rounded-lg overflow-hidden" style={{ border: "1px solid #E8D9C0" }}>
                  <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: "#FDF3E3", borderBottom: "1px solid #E8D9C0" }}>
                    <span className="text-sm">📋</span>
                    <span className="text-xs font-bold uppercase tracking-wide" style={{ color: "#92601A" }}>For Your Reference — Not for Distribution</span>
                  </div>
                  <div
                    className={streaming ? "streaming-cursor" : ""}
                    style={{ background: "#FFFAF3", padding: "16px 24px" }}
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(displayedManager) }}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Paste tip */}
      <p className="mt-3 text-xs text-gray-400 text-center px-2">
        Tip: paste directly into Google Docs, Word, or Slides — headers, bold, and bullets carry over. To convert to slides, paste into ChatGPT or Claude and ask it to reformat as a slide outline.
      </p>

      {/* Action buttons */}
      <div className="mt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-between">
        <button
          onClick={sendAsEmail}
          disabled={streaming}
          className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 border bg-white px-4 py-3 rounded-lg transition-all disabled:opacity-40"
          style={{ border: "1px solid #E8E6E3" }}
        >
          ✉ Send as Email Draft
        </button>

        <button
          onClick={copyOutput}
          disabled={streaming}
          className="flex items-center justify-center gap-2 text-sm font-bold px-5 py-3 rounded-lg text-white transition-all disabled:opacity-40"
          style={{ background: copied ? "#16a34a" : "#6366F1" }}
          onMouseEnter={e => { if (!copied) (e.currentTarget as HTMLButtonElement).style.background = "#E55A00"; }}
          onMouseLeave={e => { if (!copied) (e.currentTarget as HTMLButtonElement).style.background = "#6366F1"; }}
        >
          {copied ? "✓ Copied to Clipboard" : "Copy Output"}
        </button>
      </div>
    </div>
  );
}
