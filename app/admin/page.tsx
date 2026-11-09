"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Settings, 
  FileEdit,
  Save, 
  CheckCircle2, 
  Search, 
  Lock, 
  LogOut,
  RefreshCw,
  Phone,
  Mail,
  ShieldCheck,
  Building2,
  Sparkles,
  AlertCircle,
  ExternalLink,
  SlidersHorizontal,
  Layers,
  Inbox,
  LayoutDashboard,
  Shield,
  HelpCircle,
  ChevronRight,
  Menu,
  X,
  Globe,
  Sun,
  Moon,
  Clock,
  Zap,
  Filter,
  Eye,
  Check
} from "lucide-react";
import { useSite } from "@/context/SiteContext";

interface LeadItem {
  id: string;
  createdAt: string;
  borough: string;
  propertyType: string;
  service: string;
  urgency: string;
  fullName: string;
  phone: string;
  propertyAddress: string;
  dobJobNumber?: string;
  status: 'pending' | 'contacted' | 'dispatched' | 'closed';
}

export default function AdminPage() {
  const { 
    texts, 
    updateTexts, 
    resetTexts, 
    theme, 
    toggleTheme, 
    setTheme, 
    isAuthenticated, 
    login, 
    logout 
  } = useSite();

  // Login form state
  const [username, setUsername] = useState("admin@werbsolutions.com");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Admin tabs / modules
  const [activeTab, setActiveTab] = useState<'content' | 'leads' | 'settings'>('content');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Leads state
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [leadSearch, setLeadSearch] = useState("");
  const [leadStatusFilter, setLeadStatusFilter] = useState<'all' | 'pending' | 'contacted' | 'dispatched' | 'closed'>('all');
  const [selectedLeadDetail, setSelectedLeadDetail] = useState<LeadItem | null>(null);

  // Content editing state
  const [formData, setFormData] = useState(texts);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Keep formData in sync if texts change externally
  useEffect(() => {
    setFormData(texts);
  }, [texts]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      loadLeads();
    }
  };

  const loadLeads = async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingLeads(false);
    }
  };

  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    updateTexts(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const updateLeadStatus = async (id: string, newStatus: LeadItem['status']) => {
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
      if (selectedLeadDetail?.id === id) {
        setSelectedLeadDetail(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isDark = theme === "dark";

  // IF NOT AUTHENTICATED: SHOW APPLE-CLASS DUAL-THEME LOGIN
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors ${
        isDark ? "bg-[#050810] text-slate-100" : "bg-[#f1f5f9] text-slate-900"
      }`}>
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
            {isDark ? <Sun className="h-3.5 w-3.5 text-amber-300" /> : <Moon className="h-3.5 w-3.5 text-slate-700" />}
            <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>

        <div className={`w-full max-w-md rounded-3xl border p-8 shadow-2xl backdrop-blur-2xl relative z-10 transition-colors ${
          isDark 
            ? "border-white/15 bg-[#090e17]/90 text-white" 
            : "border-slate-200/90 bg-white/95 text-slate-900"
        }`}>
          <div className="text-center mb-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ece8a6] to-[#b79f53] text-[#1a1608] mb-4 shadow-lg shadow-[#b79f53]/20">
              <Lock className="h-6 w-6 stroke-[2.5]" />
            </div>
            <h1 className="text-lg font-bold uppercase tracking-wider">
              WERB Solutions • Admin Portal
            </h1>
            <p className={`text-xs mt-1 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Restricted Area for NYC Licensed Master Electricians & Staff
            </p>
          </div>

          {loginError && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-500 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>Invalid credentials. Enter registered admin email and password.</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}>
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
              <label className={`block text-xs font-bold uppercase tracking-wider mb-1 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}>
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

          <div className="mt-8 text-center">
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

  // NAVIGATION ITEMS FOR SIDEBAR (100% VISIBLE WITHIN VIEWPORT)
  const navItems = [
    { id: 'content' as const, label: 'Content Editor', icon: FileEdit, count: 'Live' },
    { id: 'leads' as const, label: 'Inbound NYC Leads', icon: Inbox, count: leads.length },
    { id: 'settings' as const, label: 'Switches & Toggles', icon: SlidersHorizontal, count: '2' },
  ];

  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.fullName.toLowerCase().includes(leadSearch.toLowerCase()) || 
      l.phone.includes(leadSearch) || 
      l.borough.toLowerCase().includes(leadSearch.toLowerCase()) ||
      l.service.toLowerCase().includes(leadSearch.toLowerCase());
    const matchesStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={`h-screen w-full flex flex-col font-sans transition-colors duration-200 overflow-hidden ${
      isDark ? "bg-[#050810] text-slate-100" : "bg-[#f8fafc] text-slate-900"
    }`}>
      
      {/* ─────────────────────────────────────────────────────────────
          1. FIXED TOP APP BAR (ALWAYS PINNED, NEVER SCROLLS AWAY)
      ───────────────────────────────────────────────────────────── */}
      <header className={`h-16 shrink-0 z-30 border-b flex items-center justify-between px-4 sm:px-6 backdrop-blur-xl transition-colors ${
        isDark ? "border-white/10 bg-[#090e17]/95 text-white" : "border-slate-200 bg-white/95 text-slate-900 shadow-sm"
      }`}>
        {/* Left: Brand & Status */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#ece8a6] to-[#b79f53] flex items-center justify-center text-[#1a1608] font-bold text-xs shrink-0 shadow-sm">
            WS
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm uppercase tracking-wider block truncate">
                WERB Solutions
              </span>
              <span className="hidden md:inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Node
              </span>
            </div>
            <span className={`text-[10px] block truncate ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              NYC DOB Licensed Master Electrician • Control Command
            </span>
          </div>
        </div>

        {/* Right: Theme Toggle, Site Link & Admin Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Apple-Style Light / Dark Toggle Switch */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-95 ${
              isDark 
                ? "border-white/15 bg-white/10 text-slate-200 hover:bg-white/20" 
                : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
            title="Toggle Light / Dark Appearance"
          >
            {isDark ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-300" />
                <span className="hidden sm:inline text-[11px]">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-slate-700" />
                <span className="hidden sm:inline text-[11px]">Dark Mode</span>
              </>
            )}
          </button>

          {/* View Live Site */}
          <Link
            href="/"
            target="_blank"
            className={`hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
              isDark 
                ? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white" 
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Globe className="h-3.5 w-3.5 text-[#b79f53]" />
            <span className="text-[11px]">Live Site</span>
            <ExternalLink className="h-3 w-3 text-slate-400" />
          </Link>

          {/* User Session Pill */}
          <div className={`hidden md:flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
            isDark ? "border-white/10 bg-white/5 text-slate-300" : "border-slate-200 bg-slate-100 text-slate-700"
          }`}>
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-[11px]">admin@werbsolutions.com</span>
          </div>

          {/* Log Out Button */}
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer active:scale-95"
            title="Log Out of Admin Session"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline text-[11px]">Log Out</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className={`md:hidden flex h-8 w-8 items-center justify-center rounded-lg border ${
              isDark ? "border-white/10 text-white" : "border-slate-200 text-slate-800"
            }`}
          >
            {mobileSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. WORKSPACE BODY: FIXED SIDEBAR + INDEPENDENT SCROLL MAIN
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* DESKTOP SIDEBAR (100% VISIBLE, HEIGHT-CONSTRAINED, NO CUT-OFFS) */}
        <aside className={`hidden md:flex w-64 shrink-0 h-full flex-col justify-between border-r p-4 transition-colors z-20 ${
          isDark ? "border-white/10 bg-[#070b12]" : "border-slate-200 bg-white shadow-sm"
        }`}>
          {/* Top Nav Items */}
          <div className="space-y-1.5">
            <div className={`text-[10px] uppercase font-bold tracking-wider px-3 py-2 ${
              isDark ? "text-slate-500" : "text-slate-400"
            }`}>
              Control Workspaces
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    if (item.id === 'leads') loadLeads();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    active 
                      ? isDark 
                        ? "bg-[#b79f53]/20 text-[#ece8a6] border border-[#b79f53]/40 shadow-sm font-bold" 
                        : "bg-[#e2c97d]/25 text-[#735408] border border-[#b79f53]/30 shadow-sm font-bold"
                      : isDark
                        ? "text-slate-400 hover:text-white hover:bg-white/5"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`h-4 w-4 shrink-0 ${active ? "text-[#b79f53]" : "text-slate-400"}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${
                    active 
                      ? isDark ? "bg-[#b79f53]/30 text-white" : "bg-[#b79f53]/20 text-[#735408]" 
                      : isDark ? "bg-white/5 text-slate-400" : "bg-slate-100 text-slate-500"
                  }`}>
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Card in Sidebar (Always anchored, 100% visible) */}
          <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-white/10">
            <div className={`rounded-xl p-3 border text-xs space-y-1.5 ${
              isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-slate-50"
            }`}>
              <div className="flex items-center gap-1.5 font-bold uppercase text-[10px] tracking-wider text-[#b79f53]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>NYC Credentials Active</span>
              </div>
              <div className={`text-[11px] font-mono ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                Lic: {texts.licenseNumber}
              </div>
              <div className={`text-[11px] font-mono ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                COI: {texts.coiAmount} Verified
              </div>
            </div>

            <div className="text-[10px] font-mono text-center text-slate-400">
              WERB Engine v2.0 • 2026
            </div>
          </div>
        </aside>

        {/* MOBILE DRAWER */}
        {mobileSidebarOpen && (
          <div className={`md:hidden absolute inset-x-0 top-0 border-b p-4 space-y-2 z-40 backdrop-blur-2xl shadow-xl ${
            isDark ? "border-white/10 bg-[#090e17]/95" : "border-slate-200 bg-white/95"
          }`}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                    if (item.id === 'leads') loadLeads();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                    active 
                      ? "gold-gradient-btn text-[#1a1608]" 
                      : isDark ? "text-slate-300 bg-white/5" : "text-slate-700 bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-mono text-[10px]">{item.count}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            3. MAIN CONTENT (INDEPENDENT VERTICAL SCROLL AREA)
        ───────────────────────────────────────────────────────────── */}
        <main className="flex-1 h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Header info badge */}
            <div className={`rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm backdrop-blur-xl transition-colors ${
              isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white shadow-sm"
            }`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#b79f53]">
                    Active Production Module
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold uppercase tracking-tight mt-1">
                  {activeTab === 'content' && "Live Website Copy & Editorial CMS"}
                  {activeTab === 'leads' && "NYC Inbound Lead Pipeline & CRM"}
                  {activeTab === 'settings' && "Feature Toggles & Public Switches"}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono px-3 py-1 rounded-full border ${
                  isDark ? "border-white/10 bg-white/5 text-slate-400" : "border-slate-200 bg-slate-100 text-slate-600"
                }`}>
                  Port 6001 • SSL/Zero-Trust
                </span>
              </div>
            </div>

            {/* TAB 1: CONTENT EDITOR */}
            {activeTab === 'content' && (
              <form onSubmit={handleSaveContent} className="space-y-6">
                <div className={`rounded-2xl border p-6 sm:p-7 space-y-5 shadow-sm backdrop-blur-xl transition-colors ${
                  isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"
                }`}>
                  
                  <div className={`flex items-center justify-between border-b pb-3 ${
                    isDark ? "border-white/10" : "border-slate-200"
                  }`}>
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
                      <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}>
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
                      <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}>
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
                      <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}>
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
                        <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                          isDark ? "text-slate-400" : "text-slate-600"
                        }`}>
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
                        <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                          isDark ? "text-slate-400" : "text-slate-600"
                        }`}>
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
                        <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                          isDark ? "text-slate-400" : "text-slate-600"
                        }`}>
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
                        <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                          isDark ? "text-slate-400" : "text-slate-600"
                        }`}>
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
                      <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1 ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}>
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

                  <div className={`pt-4 border-t flex items-center justify-between ${
                    isDark ? "border-white/10" : "border-slate-200"
                  }`}>
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
            )}

            {/* TAB 2: LEADS CRM */}
            {activeTab === 'leads' && (
              <div className="space-y-4">
                
                {/* Search & Filter Toolbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by name, borough, phone, or service..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className={`w-full rounded-xl border pl-9 pr-4 py-2 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
                        isDark 
                          ? "border-white/10 bg-black/40 text-white placeholder-slate-500" 
                          : "border-slate-200 bg-white text-slate-900 placeholder-slate-400"
                      }`}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Status Filter Buttons */}
                    <div className={`flex rounded-xl border p-1 text-xs ${
                      isDark ? "border-white/10 bg-black/30" : "border-slate-200 bg-white"
                    }`}>
                      {(['all', 'pending', 'contacted', 'dispatched'] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setLeadStatusFilter(st)}
                          className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-all cursor-pointer text-[11px] ${
                            leadStatusFilter === st
                              ? "gold-gradient-btn text-[#1a1608] shadow-sm"
                              : isDark ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={loadLeads}
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all cursor-pointer ${
                        isDark 
                          ? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10" 
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm"
                      }`}
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Refresh</span>
                    </button>
                  </div>
                </div>

                {loadingLeads ? (
                  <div className="py-20 text-center text-xs text-slate-500">Accessing secure pipeline...</div>
                ) : filteredLeads.length === 0 ? (
                  <div className={`rounded-2xl border p-12 text-center text-xs ${
                    isDark ? "border-white/10 bg-white/[0.02] text-slate-400" : "border-slate-200 bg-white text-slate-500 shadow-sm"
                  }`}>
                    No active inquiries match this filter. Test the Lead Wizard on the homepage to simulate intake.
                  </div>
                ) : (
                  <div className={`overflow-x-auto rounded-2xl border ${
                    isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white shadow-sm"
                  }`}>
                    <table className="w-full text-left text-xs">
                      <thead className={`border-b text-[11px] font-mono uppercase ${
                        isDark ? "border-white/10 bg-white/5 text-slate-400" : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}>
                        <tr>
                          <th className="p-3.5">Date</th>
                          <th className="p-3.5">Customer & Phone</th>
                          <th className="p-3.5">Location & Borough</th>
                          <th className="p-3.5">Pre-Selected Scope</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Dispatch Action</th>
                        </tr>
                      </thead>
                      <tbody className={`divide-y ${
                        isDark ? "divide-white/[0.06]" : "divide-slate-100"
                      }`}>
                        {filteredLeads.map((lead) => (
                          <tr 
                            key={lead.id} 
                            onClick={() => setSelectedLeadDetail(lead)}
                            className={`transition-colors cursor-pointer ${
                              isDark ? "hover:bg-white/5" : "hover:bg-slate-50"
                            }`}
                          >
                            <td className="p-3.5 font-mono text-slate-400 whitespace-nowrap">
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-3.5">
                              <div className="font-bold">{lead.fullName}</div>
                              <a 
                                href={`tel:${lead.phone}`} 
                                onClick={(e) => e.stopPropagation()} 
                                className="text-[#b79f53] hover:underline font-mono"
                              >
                                {lead.phone}
                              </a>
                            </td>
                            <td className="p-3.5">
                              <div className="font-bold">{lead.borough}</div>
                              <div className={`text-[11px] truncate max-w-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                                {lead.propertyAddress}
                              </div>
                            </td>
                            <td className="p-3.5">
                              <span className="font-semibold text-slate-800 dark:text-slate-200">
                                {lead.service}
                              </span>
                            </td>
                            <td className="p-3.5">
                              <span className={`inline-block rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase ${
                                lead.status === 'dispatched' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                lead.status === 'contacted' ? 'bg-sky-500/10 text-sky-500 border border-sky-500/20' :
                                'bg-[#b79f53]/15 text-[#b79f53] border border-[#b79f53]/30'
                              }`}>
                                {lead.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                                className={`rounded-lg border px-2 py-1 text-[11px] focus:outline-none focus:border-[#b79f53] cursor-pointer ${
                                  isDark ? "border-white/20 bg-black text-slate-200" : "border-slate-200 bg-white text-slate-800"
                                }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="contacted">Contacted</option>
                                <option value="dispatched">Dispatched</option>
                                <option value="closed">Closed</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* MODAL: LEAD DETAIL INSPECTION */}
                {selectedLeadDetail && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className={`w-full max-w-lg rounded-3xl border p-6 sm:p-8 space-y-4 shadow-2xl ${
                      isDark ? "border-white/15 bg-[#090e17] text-white" : "border-slate-200 bg-white text-slate-900"
                    }`}>
                      <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm uppercase">Inbound Lead Specification</span>
                          <span className="text-[10px] font-mono text-[#b79f53] bg-[#b79f53]/10 px-2 py-0.5 rounded">
                            {selectedLeadDetail.status.toUpperCase()}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedLeadDetail(null)}
                          className="h-7 w-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Customer</span>
                            <span className="font-bold">{selectedLeadDetail.fullName}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone</span>
                            <a href={`tel:${selectedLeadDetail.phone}`} className="font-mono text-[#b79f53] underline">
                              {selectedLeadDetail.phone}
                            </a>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Pre-Selected Electrical Scope</span>
                          <span className="font-bold text-sm text-[#b79f53]">{selectedLeadDetail.service}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Borough & Property</span>
                            <span>{selectedLeadDetail.borough} • {selectedLeadDetail.propertyType}</span>
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Urgency</span>
                            <span className="capitalize">{selectedLeadDetail.urgency}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">NYC Property Address</span>
                          <span className="font-mono">{selectedLeadDetail.propertyAddress}</span>
                        </div>

                        {selectedLeadDetail.dobJobNumber && (
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">DOB Job # / Notes</span>
                            <span className="font-mono text-[#b79f53]">{selectedLeadDetail.dobJobNumber}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t flex justify-end gap-3">
                        <a
                          href={`tel:${selectedLeadDetail.phone}`}
                          className="gold-gradient-btn inline-flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#1a1608]"
                        >
                          <Phone className="h-3.5 w-3.5" /> Call Customer
                        </a>
                        <button
                          type="button"
                          onClick={() => setSelectedLeadDetail(null)}
                          className={`rounded-xl border px-4 py-2 text-xs font-semibold ${
                            isDark ? "border-white/10 text-slate-300" : "border-slate-200 text-slate-700"
                          }`}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SWITCHES & TOGGLES */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveContent} className={`max-w-2xl space-y-6 rounded-2xl border p-6 sm:p-7 shadow-sm backdrop-blur-xl transition-colors ${
                isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"
              }`}>
                <h2 className={`text-xs font-bold uppercase tracking-wider border-b pb-3 font-mono ${
                  isDark ? "border-white/10 text-slate-300" : "border-slate-200 text-slate-700"
                }`}>
                  Real-Time Public Switches & Visibility
                </h2>

                {/* Marquee Switch */}
                <div className={`rounded-xl border p-4 space-y-3 ${
                  isDark ? "border-white/10 bg-black/40" : "border-slate-200 bg-slate-50"
                }`}>
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
                      onChange={(e) => setFormData({ ...formData, marqueeEnabled: e.target.checked })}
                      className="h-5 w-5 rounded border-slate-300 text-[#b79f53] focus:ring-[#b79f53] cursor-pointer"
                    />
                  </div>

                  {formData.marqueeEnabled && (
                    <div>
                      <label className={`block text-[11px] uppercase font-bold mb-1 ${
                        isDark ? "text-slate-400" : "text-slate-600"
                      }`}>
                        Ticker Text Content
                      </label>
                      <textarea
                        rows={2}
                        value={formData.marqueeText}
                        onChange={(e) => setFormData({ ...formData, marqueeText: e.target.value })}
                        className={`w-full rounded-xl border p-3 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
                          isDark ? "border-white/10 bg-black text-white" : "border-slate-200 bg-white text-slate-900"
                        }`}
                      />
                    </div>
                  )}
                </div>

                {/* WhatsApp Toggle */}
                <div className={`rounded-xl border p-4 space-y-3 ${
                  isDark ? "border-white/10 bg-black/40" : "border-slate-200 bg-slate-50"
                }`}>
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
                      onChange={(e) => setFormData({ ...formData, whatsappVisible: e.target.checked })}
                      className="h-5 w-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className={`block text-[11px] uppercase font-bold mb-1 ${
                      isDark ? "text-slate-400" : "text-slate-600"
                    }`}>
                      WhatsApp Business Line
                    </label>
                    <input
                      type="text"
                      value={formData.whatsappNumber}
                      onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                      className={`w-full rounded-xl border px-3 py-2 text-xs transition-colors focus:outline-none focus:border-[#b79f53] ${
                        isDark ? "border-white/10 bg-black text-white" : "border-slate-200 bg-white text-slate-900"
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
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
