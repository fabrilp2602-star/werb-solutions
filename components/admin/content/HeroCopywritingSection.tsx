"use client";

import React, { useState } from "react";
import { Sparkles, Globe, Copy, Check, Construction, FileText } from "lucide-react";
import { SiteContentTexts } from "@/context/SiteContext";

interface HeroCopywritingSectionProps {
  isDark: boolean;
  texts: SiteContentTexts;
  onFieldChange: (field: keyof SiteContentTexts, value: any) => void;
}

type ContentLangTab = "en" | "es" | "ru" | "zh";

export function HeroCopywritingSection({
  isDark,
  texts,
  onFieldChange,
}: HeroCopywritingSectionProps) {
  const [activeLangTab, setActiveLangTab] = useState<ContentLangTab>("en");
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const langTabs: { id: ContentLangTab; label: string; badge: string; flag: string }[] = [
    { id: "en", label: "English", badge: "Activo", flag: "🇺🇸" },
    { id: "es", label: "Español", badge: "En construcción", flag: "🇪🇸" },
    { id: "ru", label: "Русский", badge: "En construcción", flag: "🇷🇺" },
    { id: "zh", label: "中文", badge: "En construcción", flag: "🇨🇳" },
  ];

  const handleCopyPrompt = () => {
    const targetLangName =
      activeLangTab === "es"
        ? "Español (América / España)"
        : activeLangTab === "ru"
        ? "Ruso (Русский)"
        : "Chino simplificado (中文)";

    const promptText = `Actúa como traductor y copywriter técnico especializado en ingeniería eléctrica para el mercado de Nueva York (NYC DOB, ConEdison, FDNY).
Traduce los siguientes textos al idioma ${targetLangName} manteniendo un tono corporativo premium de alta gama (estilo Apple / Stripe para construcción de lujo y co-ops en Manhattan):

JSON Fuente en Inglés:
{
  "heroTagline": "${texts.heroTagline}",
  "heroHeadline": "${texts.heroHeadline}",
  "heroSubtitle": "${texts.heroSubtitle}",
  "aboutText": "${texts.aboutText}"
}

Devuelve únicamente el bloque JSON traducido con las mismas claves.`;

    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <div
      className={`rounded-2xl border p-6 sm:p-7 space-y-6 shadow-sm backdrop-blur-xl transition-colors ${
        isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"
      }`}
    >
      {/* Header with Title and Language Tabs */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
          isDark ? "border-white/10" : "border-slate-200"
        }`}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#b79f53]" />
          <h2 className="text-xs font-bold uppercase tracking-wider font-mono">
            Hero & Copywriting Editorial
          </h2>
        </div>

        {/* Language Tabs Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {langTabs.map((tab) => {
            const active = activeLangTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveLangTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  active
                    ? "bg-[#b79f53]/20 text-[#b79f53] dark:text-[#ece8a6] border border-[#b79f53]/40 shadow-xs font-bold"
                    : isDark
                    ? "text-slate-400 hover:text-white hover:bg-white/5"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                <span>{tab.flag}</span>
                <span>{tab.label}</span>
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.2 rounded ${
                    tab.id === "en"
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold"
                      : "bg-amber-500/20 text-amber-600 dark:text-amber-400 font-medium"
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. ENGLISH (CANONICAL SOURCE OF TRUTH - ACTIVE)
      ───────────────────────────────────────────────────────────── */}
      {activeLangTab === "en" ? (
        <div className="space-y-4 animate-in fade-in duration-200">
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
      ) : (
        /* ─────────────────────────────────────────────────────────────
            2. OTHER LANGUAGES (EN CONSTRUCCIÓN + PROMPT IA DISPONIBLE)
        ───────────────────────────────────────────────────────────── */
        <div className="p-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-5 animate-in fade-in duration-200 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
              <Construction className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-sm font-bold font-headline">
                  Módulo de Traducción ({langTabs.find((t) => t.id === activeLangTab)?.label}) • En Construcción
                </h3>
                <span className="rounded-full bg-amber-500/20 text-amber-500 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase">
                  Fase 2
                </span>
              </div>
              <p
                className={`text-xs mt-1 leading-relaxed ${
                  isDark ? "text-slate-400" : "text-stone-600"
                }`}
              >
                Los contenidos se guardan actualmente en inglés como fuente canónica. Puedes copiar el prompt maestro estructurado para traducir instantáneamente con ChatGPT o Claude y sincronizarlo.
              </p>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border font-mono text-[11px] text-left space-y-2 ${
              isDark ? "border-white/10 bg-black/40 text-slate-300" : "border-stone-200 bg-white text-stone-700"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-[#b79f53] font-bold">
              <span>Vista previa de variables en inglés listas para traducir:</span>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#b79f53]/20 hover:bg-[#b79f53]/30 text-[#b79f53] dark:text-[#ece8a6] transition-colors cursor-pointer text-[11px]"
              >
                {copiedPrompt ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedPrompt ? "¡Prompt Copiado!" : "Copiar Prompt de Traducción IA"}</span>
              </button>
            </div>
            <div className="opacity-80 truncate">heroHeadline: "{texts.heroHeadline}"</div>
            <div className="opacity-80 truncate">heroSubtitle: "{texts.heroSubtitle}"</div>
            <div className="opacity-80 truncate">aboutText: "{texts.aboutText}"</div>
          </div>
        </div>
      )}
    </div>
  );
}
