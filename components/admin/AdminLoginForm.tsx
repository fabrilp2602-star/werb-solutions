"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Sun, Moon, AlertCircle } from "lucide-react";

interface AdminLoginFormProps {
  isDark: boolean;
  toggleTheme: () => void;
  onLoginSuccess: () => void;
  login: (u: string, p: string) => boolean;
}

export function AdminLoginForm({
  isDark,
  toggleTheme,
  onLoginSuccess,
  login,
}: AdminLoginFormProps) {
  const [username, setUsername] = useState("admin@werbsolutions.com");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      onLoginSuccess();
    }
  };

  const handleFastPass = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    const success = login(u, p);
    if (success) {
      setLoginError(false);
      onLoginSuccess();
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors ${
        isDark ? "bg-[#050810] text-slate-100" : "bg-[#f1f5f9] text-slate-900"
      }`}
    >
      {/* Ambient Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-br from-[#ece8a6]/20 via-[#b79f53]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Theme switcher on login page */}
      <div className="absolute top-5 right-5 z-20">
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all cursor-pointer ${
            isDark
              ? "border-white/15 bg-white/10 text-slate-200 hover:bg-white/15"
              : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          {isDark ? (
            <Sun className="h-3.5 w-3.5 text-amber-300" />
          ) : (
            <Moon className="h-3.5 w-3.5 text-slate-700" />
          )}
          <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>

      <div
        className={`w-full max-w-md rounded-3xl border p-8 shadow-2xl backdrop-blur-2xl relative z-10 transition-colors ${
          isDark
            ? "border-white/15 bg-[#090e17]/90 text-white"
            : "border-slate-200/90 bg-white/95 text-slate-900"
        }`}
      >
        <div className="text-center mb-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ece8a6] to-[#b79f53] text-[#1a1608] mb-4 shadow-lg shadow-[#b79f53]/20">
            <Lock className="h-6 w-6 stroke-[2.5]" />
          </div>
          <h1 className="text-lg font-bold uppercase tracking-wider font-sans">
            WERB Solutions • Admin Portal
          </h1>
          <p
            className={`text-xs mt-1 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Restricted Area for NYC Licensed Master Electricians & Staff
          </p>
        </div>

        {loginError && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-500 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>Invalid credentials. Enter registered admin email and password.</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Admin Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@werbsolutions.com"
              className={`w-full rounded-xl border px-4 py-2.5 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
                isDark
                  ? "border-white/10 bg-black/40 text-white placeholder-slate-500"
                  : "border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white"
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Secure Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className={`w-full rounded-xl border px-4 py-2.5 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
                isDark
                  ? "border-white/10 bg-black/40 text-white placeholder-slate-500"
                  : "border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:bg-white"
              }`}
            />
          </div>

          <button
            type="submit"
            className="gold-gradient-btn w-full mt-2 rounded-xl py-3 text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-md cursor-pointer active:scale-95 transition-transform"
          >
            Authenticate Session
          </button>
        </form>

        {/* Quick Demo Access Pills */}
        <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-white/10 text-center">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
            Fast Demo Access
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleFastPass("pablofgarciaf@gmail.com", "werb2026")}
              className="rounded-lg border border-[#b79f53]/40 bg-[#b79f53]/15 px-3 py-1.5 text-xs font-mono font-bold text-[#b79f53] dark:text-[#ece8a6] hover:bg-[#b79f53]/25 active:scale-95 transition-all cursor-pointer"
            >
              ⚡ Pablo García (Direct Pass)
            </button>
            <button
              type="button"
              onClick={() => handleFastPass("admin@werbsolutions.com", "admin123")}
              className="rounded-lg border border-slate-300 dark:border-white/20 bg-white/10 px-3 py-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-200 hover:text-white hover:bg-white/15 active:scale-95 transition-all cursor-pointer"
            >
              ⚡ Admin Master (Direct Pass)
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className={`text-xs transition-colors hover:underline ${
              isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
