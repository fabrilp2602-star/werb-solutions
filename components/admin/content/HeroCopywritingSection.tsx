"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { SiteContentTexts } from "@/context/SiteContext";

interface HeroCopywritingSectionProps {
  isDark: boolean;
  texts: SiteContentTexts;
  onFieldChange: (field: keyof SiteContentTexts, value: any) => void;
}

export function HeroCopywritingSection({
  isDark,
  texts,
  onFieldChange,
}: HeroCopywritingSectionProps) {
  return (
    <div
      className={`rounded-2xl border p-6 sm:p-7 space-y-5 shadow-sm backdrop-blur-xl transition-colors ${
        isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"
      }`}
    >
      <div
        className={`flex items-center justify-between border-b pb-3 ${
          isDark ? "border-white/10" : "border-slate-200"
        }`}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#b79f53]" />
          <h2 className="text-xs font-bold uppercase tracking-wider font-mono">
            Hero & Copywriting Editorial
          </h2>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Visible en portada
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label
            className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Hero Tagline Pill
          </label>
          <input
            type="text"
            value={texts.heroTagline}
            onChange={(e) => onFieldChange("heroTagline", e.target.value)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
              isDark
                ? "border-white/10 bg-black/40 text-white"
                : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
            }`}
          />
        </div>

        <div>
          <label
            className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Titular Principal Hero (H1)
          </label>
          <input
            type="text"
            value={texts.heroHeadline}
            onChange={(e) => onFieldChange("heroHeadline", e.target.value)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
              isDark
                ? "border-white/10 bg-black/40 text-white"
                : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
            }`}
          />
        </div>

        <div>
          <label
            className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Descripción / Subtítulo Hero
          </label>
          <textarea
            rows={3}
            value={texts.heroSubtitle}
            onChange={(e) => onFieldChange("heroSubtitle", e.target.value)}
            className={`w-full rounded-xl border p-3 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
              isDark
                ? "border-white/10 bg-black/40 text-white"
                : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
            }`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Teléfono Directo 24/7 Hotline
            </label>
            <input
              type="text"
              value={texts.phone}
              onChange={(e) => onFieldChange("phone", e.target.value)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
                isDark
                  ? "border-white/10 bg-black/40 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Correo de Consultas Públicas
            </label>
            <input
              type="text"
              value={texts.email}
              onChange={(e) => onFieldChange("email", e.target.value)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
                isDark
                  ? "border-white/10 bg-black/40 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Referencia de Licencia NYC DOB
            </label>
            <input
              type="text"
              value={texts.licenseNumber}
              onChange={(e) => onFieldChange("licenseNumber", e.target.value)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
                isDark
                  ? "border-white/10 bg-black/40 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Monto de Seguro COI Verified
            </label>
            <input
              type="text"
              value={texts.coiAmount}
              onChange={(e) => onFieldChange("coiAmount", e.target.value)}
              className={`w-full rounded-xl border px-3.5 py-2.5 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
                isDark
                  ? "border-white/10 bg-black/40 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
              }`}
            />
          </div>
        </div>

        <div>
          <label
            className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Narrativa Corporativa "About Firm"
          </label>
          <textarea
            rows={3}
            value={texts.aboutText}
            onChange={(e) => onFieldChange("aboutText", e.target.value)}
            className={`w-full rounded-xl border p-3 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
              isDark
                ? "border-white/10 bg-black/40 text-white"
                : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
