"use client";

import React, { useState, useEffect } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import { SiteContentTexts } from "@/context/SiteContext";

interface AdminSwitchesTabProps {
  isDark: boolean;
  texts: SiteContentTexts;
  updateTexts: (newTexts: Partial<SiteContentTexts>) => void;
}

export function AdminSwitchesTab({
  isDark,
  texts,
  updateTexts,
}: AdminSwitchesTabProps) {
  const [formData, setFormData] = useState<SiteContentTexts>(texts);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setFormData(texts);
  }, [texts]);

  const handleSaveSwitches = (e: React.FormEvent) => {
    e.preventDefault();
    updateTexts(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <form
      onSubmit={handleSaveSwitches}
      className={`max-w-2xl space-y-6 rounded-2xl border p-6 sm:p-7 shadow-sm backdrop-blur-xl transition-colors ${
        isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"
      }`}
    >
      <h2
        className={`text-xs font-bold uppercase tracking-wider border-b pb-3 font-mono ${
          isDark ? "border-white/10 text-slate-300" : "border-slate-200 text-slate-700"
        }`}
      >
        Real-Time Public Switches & Visibility
      </h2>

      {/* Marquee Switch */}
      <div
        className={`rounded-xl border p-4 space-y-3 ${
          isDark ? "border-white/10 bg-black/40" : "border-slate-200 bg-slate-50"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase">Top Marquee Ticker</div>
            <div className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Show or hide the continuous ticker above the header
            </div>
          </div>
          <input
            type="checkbox"
            checked={formData.marqueeEnabled}
            onChange={(e) =>
              setFormData({ ...formData, marqueeEnabled: e.target.checked })
            }
            className="h-5 w-5 rounded border-slate-300 text-[#b79f53] focus:ring-[#b79f53] cursor-pointer"
          />
        </div>

        {formData.marqueeEnabled && (
          <div>
            <label
              className={`block text-[11px] uppercase font-bold mb-1 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Ticker Text Content
            </label>
            <textarea
              rows={2}
              value={formData.marqueeText}
              onChange={(e) =>
                setFormData({ ...formData, marqueeText: e.target.value })
              }
              className={`w-full rounded-xl border p-3 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
                isDark
                  ? "border-white/10 bg-black text-white"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
            />
          </div>
        )}
      </div>

      {/* WhatsApp Toggle */}
      <div
        className={`rounded-xl border p-4 space-y-3 ${
          isDark ? "border-white/10 bg-black/40" : "border-slate-200 bg-slate-50"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase">Mobile Dock WhatsApp Button</div>
            <div className={`text-[11px] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Show or hide WhatsApp in mobile bottom dock
            </div>
          </div>
          <input
            type="checkbox"
            checked={formData.whatsappVisible}
            onChange={(e) =>
              setFormData({ ...formData, whatsappVisible: e.target.checked })
            }
            className="h-5 w-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
          />
        </div>

        <div>
          <label
            className={`block text-[11px] uppercase font-bold mb-1 ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            WhatsApp Business Line
          </label>
          <input
            type="text"
            value={formData.whatsappNumber}
            onChange={(e) =>
              setFormData({ ...formData, whatsappNumber: e.target.value })
            }
            className={`w-full rounded-xl border px-3 py-2 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
              isDark
                ? "border-white/10 bg-black text-white"
                : "border-slate-200 bg-white text-slate-900"
            }`}
          />
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between">
        <button
          type="submit"
          className="gold-gradient-btn inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-md cursor-pointer active:scale-95 transition-transform"
        >
          <Save className="h-4 w-4" />
          <span>Update Switches</span>
        </button>

        {saveSuccess && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
            <CheckCircle2 className="h-4 w-4" /> Live
          </span>
        )}
      </div>
    </form>
  );
}
