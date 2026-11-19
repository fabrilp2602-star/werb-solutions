"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Save, CheckCircle2 } from "lucide-react";
import { SiteContentTexts } from "@/context/SiteContext";

interface AdminContentTabProps {
  isDark: boolean;
  texts: SiteContentTexts;
  updateTexts: (newTexts: Partial<SiteContentTexts>) => void;
  resetTexts: () => void;
}

export function AdminContentTab({
  isDark,
  texts,
  updateTexts,
  resetTexts,
}: AdminContentTabProps) {
  const [formData, setFormData] = useState<SiteContentTexts>(texts);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setFormData(texts);
  }, [texts]);

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateTexts(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <form onSubmit={handleSaveContent} className="space-y-6">
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
          <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2 font-mono">
            <Sparkles className="h-4 w-4 text-[#b79f53]" />
            <span>Hero & Headline Texts</span>
          </h2>
          {saveSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-500 animate-in fade-in">
              <CheckCircle2 className="h-4 w-4" /> Changes Applied Live
            </span>
          )}
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
              value={formData.heroTagline}
              onChange={(e) => setFormData({ ...formData, heroTagline: e.target.value })}
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
              Main Hero Headline (H1)
            </label>
            <input
              type="text"
              value={formData.heroHeadline}
              onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
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
              Hero Subtitle Description
            </label>
            <textarea
              rows={3}
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
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
                Direct 24/7 Hotline Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                Public Inquiries Email
              </label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                NYC DOB License Reference
              </label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
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
                COI Insurance Aggregate Coverage
              </label>
              <input
                type="text"
                value={formData.coiAmount}
                onChange={(e) => setFormData({ ...formData, coiAmount: e.target.value })}
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
              About Firm Narrative
            </label>
            <textarea
              rows={3}
              value={formData.aboutText}
              onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
              className={`w-full rounded-xl border p-3 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
                isDark
                  ? "border-white/10 bg-black/40 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
              }`}
            />
          </div>
        </div>

        <div
          className={`pt-4 border-t flex items-center justify-between ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <button
            type="submit"
            className="gold-gradient-btn inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-md cursor-pointer active:scale-95 transition-transform"
          >
            <Save className="h-4 w-4" />
            <span>Publish Changes</span>
          </button>

          <button
            type="button"
            onClick={resetTexts}
            className={`text-xs hover:underline cursor-pointer ${
              isDark ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Reset Defaults
          </button>
        </div>
      </div>
    </form>
  );
}
