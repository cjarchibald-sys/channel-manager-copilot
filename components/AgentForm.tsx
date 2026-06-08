"use client";

import { useState } from "react";
import { Agent, FormField } from "@/lib/agents";

interface AgentFormProps {
  agent: Agent;
  onSubmit: (formData: Record<string, string>) => void;
  onBack: () => void;
}

function Field({ field, value, onChange }: {
  field: FormField;
  value: string;
  onChange: (val: string) => void;
}) {
  const base = "w-full border border-gray-200 rounded-lg px-3 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 bg-white transition-all";
  const focusStyle = { "--tw-ring-color": "rgba(99,102,241,0.3)" } as React.CSSProperties;

  if (field.type === "textarea") {
    return (
      <textarea
        id={field.id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={4}
        style={focusStyle}
        className={`${base} resize-y`}
      />
    );
  }

  if (field.type === "select" && field.options) {
    const isDemoLocked = field.id === "competitor";
    return (
      <div>
        <select
          id={field.id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={focusStyle}
          className={base}
        >
          <option value="">Select...</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt} disabled={isDemoLocked && opt !== "Genesys"}>
              {isDemoLocked && opt !== "Genesys" ? `${opt} — available when AI-enabled` : opt}
            </option>
          ))}
        </select>
        {isDemoLocked && (
          <p className="text-xs mt-1.5" style={{ color: "#9B8B80" }}>
            Full competitive library available when AI-enabled. This demo includes Genesys.
          </p>
        )}
      </div>
    );
  }

  return (
    <input
      id={field.id}
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      style={focusStyle}
      className={base}
    />
  );
}

export default function AgentForm({ agent, onSubmit, onBack }: AgentFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(() =>
    Object.fromEntries(agent.fields.map((f) => [f.id, ""]))
  );

  function handleChange(fieldId: string, value: string) {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(formData);
  }

  function loadExample() {
    setFormData({ ...Object.fromEntries(agent.fields.map((f) => [f.id, ""])), ...agent.example });
  }

  const hasRequired = agent.fields
    .filter((f) => f.required)
    .every((f) => formData[f.id]?.trim());

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="text-sm text-gray-500 hover:text-gray-800 mb-5 flex items-center gap-1 transition-colors py-1"
      >
        ← Back to agents
      </button>

      {/* Agent header */}
      <div className="rounded-xl p-4 sm:p-5 mb-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
        style={{ background: "#0F172A" }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)" }}>
            {agent.icon}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">{agent.name}</h2>
            <p className="text-sm text-white/60 mt-0.5">{agent.description}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={loadExample}
          className="shrink-0 text-sm font-semibold px-4 py-2.5 rounded-lg text-white transition-all w-full sm:w-auto"
          style={{ background: "#6366F1" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#E55A00")}
          onMouseLeave={e => (e.currentTarget.style.background = "#6366F1")}
        >
          Load Example
        </button>
      </div>

      {/* Prototype note */}
      <div className="rounded-lg px-4 py-3 mb-5 flex items-start gap-3" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.2)" }}>
        <span className="text-sm mt-0.5" style={{ color: "#6366F1" }}>ℹ</span>
        <p className="text-xs leading-relaxed" style={{ color: "#6B5B4E" }}>
          <span className="font-semibold">Prototype note:</span> fields are filled in manually here. When AI-enabled and connected to Salesforce and the Clarix Partner Portal, data fields — pipeline, account details, partner tier, deal history — will populate automatically. Fields requiring human input, such as meeting notes, observations, and strategic context, will always be entered by the channel manager.
        </p>
      </div>

      <div className="bg-white rounded-xl p-4 sm:p-6" style={{ border: "1px solid #E8E6E3", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
        <form onSubmit={handleSubmit} className="space-y-5">
          {agent.fields.map((field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-semibold text-gray-700 mb-1.5">
                {field.label}
                {field.required && <span className="text-gray-400 font-normal ml-1">(required)</span>}
              </label>
              <Field
                field={field}
                value={formData[field.id] || ""}
                onChange={(val) => handleChange(field.id, val)}
              />
            </div>
          ))}

          <div className="pt-2">
            <button
              type="submit"
              disabled={!hasRequired}
              className="w-full font-bold py-4 rounded-lg text-white text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: hasRequired ? "#6366F1" : undefined }}
              onMouseEnter={e => { if (hasRequired) (e.currentTarget as HTMLButtonElement).style.background = "#E55A00"; }}
              onMouseLeave={e => { if (hasRequired) (e.currentTarget as HTMLButtonElement).style.background = "#6366F1"; }}
            >
              Generate Output →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
