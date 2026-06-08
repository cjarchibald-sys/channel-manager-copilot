"use client";

import { Agent } from "@/lib/agents";

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}

interface AgentCardProps {
  agent: Agent;
  onStart: (agentId: string) => void;
}

export default function AgentCard({ agent, onStart }: AgentCardProps) {
  return (
    <div
      className="bg-white rounded-xl p-6 flex flex-col gap-4 cursor-pointer group transition-all duration-200 relative overflow-hidden"
      style={{
        border: "1px solid #E8E6E3",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.1), -3px 0 0 #FF6900";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#D4D0CB";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "#E8E6E3";
      }}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center text-xl"
          style={{ background: "rgba(255,105,0,0.08)", border: "1px solid rgba(255,105,0,0.15)" }}>
          {agent.icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">{agent.name}</h3>
          <p className="text-gray-500 text-sm leading-snug">{agent.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
        <span className="text-xs font-medium" style={{ color: "#FF6900" }}>
          ⏱ Saves ~{formatTime(agent.estimatedMinutes)}
        </span>
        <button
          onClick={() => onStart(agent.id)}
          className="text-sm font-semibold px-5 py-2 rounded-lg text-white transition-all duration-150"
          style={{ background: "#FF6900" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#E55A00")}
          onMouseLeave={e => (e.currentTarget.style.background = "#FF6900")}
        >
          Start →
        </button>
      </div>
    </div>
  );
}
