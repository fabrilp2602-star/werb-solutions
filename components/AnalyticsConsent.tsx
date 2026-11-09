"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X, ShieldCheck } from "lucide-react";

export const OPEN_COOKIE_PREFERENCES_EVENT = "open-cookie-preferences";

export function openCookiePreferences() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES_EVENT));
  }
}

type Preference = "accepted" | "rejected" | null;

export default function AnalyticsConsent() {
  const [preference, setPreference] = useState<Preference>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("werb_cookie_consent");
    if (saved === "accepted" || saved === "rejected") {
      setPreference(saved);
    } else {
      setShowModal(true);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => setShowModal(true);
    window.addEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES_EVENT, handleOpen);
  }, []);

  const handleChoice = (choice: "accepted" | "rejected") => {
    localStorage.setItem("werb_cookie_consent", choice);
    setPreference(choice);
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="rounded-3xl border border-white/15 bg-[#090e17]/95 backdrop-blur-2xl p-5 shadow-[0_12px_40px_rgba(0,0,0,0.8)] text-white">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e6b93e]/15 text-[#e6b93e] border border-[#e6b93e]/30">
              <Cookie className="h-4 w-4" />
            </div>
            <span className="font-bold text-xs uppercase tracking-wider text-slate-200">
              Cookie & Data Privacy Notice
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleChoice("rejected")}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Dismiss cookie notice"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-[11px] text-slate-300 leading-relaxed mb-4">
          We use essential and performance cookies to secure emergency dispatch, optimize DOB NOW™ quote workflows, and comply with the New York SHIELD Act & CCPA.
        </p>

        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => handleChoice("accepted")}
            className="gold-gradient-btn flex-1 rounded-xl py-2 font-bold uppercase tracking-wider text-black text-[11px] shadow-sm"
          >
            Accept Cookies
          </button>
          <button
            type="button"
            onClick={() => handleChoice("rejected")}
            className="flex-1 rounded-xl border border-white/15 bg-white/5 py-2 font-bold uppercase tracking-wider text-slate-300 hover:bg-white/10 transition-colors text-[11px]"
          >
            Essential Only
          </button>
        </div>
      </div>
    </div>
  );
}
