"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  FileEdit,
  Inbox,
  SlidersHorizontal,
  Users,
  LogOut,
} from "lucide-react";
import { useSite, SiteContentTexts } from "@/context/SiteContext";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminContentTab } from "@/components/admin/AdminContentTab";
import { AdminSwitchesTab } from "@/components/admin/AdminSwitchesTab";
import { AdminLeadsTab, LeadItem } from "@/components/admin/AdminLeadsTab";
import { AdminUsersTab } from "@/components/admin/AdminUsersTab";
import { AdminSidebar, NavItemConfig } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminBottomBar } from "@/components/admin/AdminBottomBar";

type AdminTab = "content" | "leads" | "users" | "settings";

export default function AdminPage() {
  const {
    texts,
    updateTexts,
    resetTexts,
    theme,
    toggleTheme,
    isAuthenticated,
    login,
    logout,
  } = useSite();

  const [activeTab, setActiveTab] = useState<AdminTab>("content");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [pendingTexts, setPendingTexts] = useState<SiteContentTexts>(texts);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync pending texts when site texts update
  useEffect(() => {
    setPendingTexts(texts);
  }, [texts]);

  // Leads state
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [leadSearch, setLeadSearch] = useState("");

  // Users count
  const [usersCount, setUsersCount] = useState<number>(2);

  const isDark = theme === "dark";

  const loadLeads = useCallback(async () => {
    setLoadingLeads(true);
    try {
      const res = await fetch("/api/leads");
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
      }
    } catch (e) {
      console.error("Error loading leads:", e);
    } finally {
      setLoadingLeads(false);
    }
  }, []);

  const loadUsersCount = useCallback(async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        setUsersCount(data.users.length);
      }
    } catch (e) {
      console.error("Error loading users count:", e);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
      loadUsersCount();
    }
  }, [isAuthenticated, loadLeads, loadUsersCount]);

  const updateLeadStatus = async (
    id: string,
    newStatus: LeadItem["status"]
  ) => {
    try {
      await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
      );
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  const handleSaveAll = () => {
    updateTexts(pendingTexts);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleResetAll = () => {
    if (!confirm("¿Restaurar todos los textos y servicios a los valores predeterminados?")) return;
    resetTexts();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // IF NOT AUTHENTICATED: SHOW APPLE-CLASS DUAL-THEME LOGIN
  if (!isAuthenticated) {
    return (
      <AdminLoginForm
        isDark={isDark}
        toggleTheme={toggleTheme}
        onLoginSuccess={() => {
          loadLeads();
          loadUsersCount();
        }}
        login={login}
      />
    );
  }

  const navItems: NavItemConfig[] = [
    {
      id: "content",
      label: "Editor de Contenidos",
      icon: FileEdit,
      count: "Live",
    },
    {
      id: "leads",
      label: "Inbound NYC Leads",
      icon: Inbox,
      count: leads.length,
    },
    {
      id: "users",
      label: "Usuarios y Roles",
      icon: Users,
      count: usersCount,
    },
    {
      id: "settings",
      label: "Switches & Toggles",
      icon: SlidersHorizontal,
      count: "2",
    },
  ];

  // Header Titles and Descriptions
  const headerMeta: Record<
    AdminTab,
    { title: string; desc: string }
  > = {
    content: {
      title: "NYC Content & Services CMS",
      desc: "Gestión en tiempo real de textos del hero, servicios y especificaciones",
    },
    leads: {
      title: "NYC Inbound Lead Pipeline & CRM",
      desc: "Pipeline de captación y gestión de prospectos eléctricos DOB NOW",
    },
    users: {
      title: "Usuarios & Permisos de Acceso HQ",
      desc: "Administración de usuarios, tramitadores DOB e inspectores de campo",
    },
    settings: {
      title: "Global Switches & Toggles",
      desc: "Interruptores globales de visibilidad y marquesina en tiempo real",
    },
  };

  return (
    <div
      className={`h-screen w-full flex font-sans transition-colors duration-200 overflow-hidden ${
        isDark ? "bg-[#050810] text-slate-100" : "bg-[#FAF8F5]/90 text-slate-900"
      }`}
    >
      {/* 1. Left Sidebar: Header Izquierdo (h-16), User Profile debajo, Scrollable Nav, Bottom Bar (h-16 Logout) */}
      <AdminSidebar
        isDark={isDark}
        activeTab={activeTab}
        onTabChange={(id: AdminTab) => {
          setActiveTab(id);
          if (id === "leads") loadLeads();
          if (id === "users") loadUsersCount();
        }}
        navItems={navItems}
        logout={logout}
      />

      {/* 2. Main Area: Right Header (h-16), Scrollable Content (pb-24), Fixed Bottom Bar (h-16) */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden relative">
        <AdminHeader
          isDark={isDark}
          activeTab={activeTab}
          headerMeta={headerMeta}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
          leadSearch={leadSearch}
          setLeadSearch={setLeadSearch}
          toggleTheme={toggleTheme}
        />

        {/* Mobile Drawer */}
        {mobileSidebarOpen && (
          <div
            className={`md:hidden border-b p-4 space-y-2 z-40 backdrop-blur-2xl shadow-xl transition-all ${
              isDark ? "border-white/10 bg-[#090e17]/98" : "border-stone-200 bg-white/98"
            }`}
          >
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 mb-3 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#ece8a6] to-[#b79f53] flex items-center justify-center text-[#1a1608] font-bold text-xs">
                PG
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white">Pablo García</div>
                <div className="text-[10px] font-mono text-slate-400">admin@werbsolutions.com</div>
              </div>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id as AdminTab);
                    setMobileSidebarOpen(false);
                    if (item.id === "leads") loadLeads();
                    if (item.id === "users") loadUsersCount();
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                    active
                      ? "gold-gradient-btn text-[#1a1608]"
                      : isDark
                      ? "text-slate-300 bg-white/5"
                      : "text-slate-700 bg-stone-100"
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

            <button
              type="button"
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-500 bg-rose-500/10 mt-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        )}

        {/* Scrollable Content Workspace with pb-24 */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 pb-24">
          <div className="max-w-6xl mx-auto">
            {activeTab === "content" && (
              <AdminContentTab
                isDark={isDark}
                texts={pendingTexts}
                onChange={setPendingTexts}
              />
            )}

            {activeTab === "leads" && (
              <AdminLeadsTab
                isDark={isDark}
                leads={leads}
                loadingLeads={loadingLeads}
                leadSearch={leadSearch}
                setLeadSearch={setLeadSearch}
                loadLeads={loadLeads}
                updateLeadStatus={updateLeadStatus}
              />
            )}

            {activeTab === "users" && (
              <AdminUsersTab isDark={isDark} />
            )}

            {activeTab === "settings" && (
              <AdminSwitchesTab
                isDark={isDark}
                texts={pendingTexts}
                updateTexts={(partial) =>
                  setPendingTexts((prev) => ({ ...prev, ...partial }))
                }
              />
            )}
          </div>
        </main>

        {/* 3. Fixed Bottom Action Bar (h-16) on Right Section */}
        {(activeTab === "content" || activeTab === "settings") && (
          <AdminBottomBar
            isDark={isDark}
            saveSuccess={saveSuccess}
            onReset={handleResetAll}
            onSave={handleSaveAll}
          />
        )}
      </div>
    </div>
  );
}
