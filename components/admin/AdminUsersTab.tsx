"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Users,
  UserPlus,
  ShieldCheck,
  Search,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  Mail,
  User,
  KeyRound,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";
import { AdminUser } from "@/types/admin";

interface AdminUsersTabProps {
  isDark: boolean;
  isCreateModalOpen?: boolean;
  setIsCreateModalOpen?: (open: boolean) => void;
  onUsersUpdated?: () => void;
}

export function AdminUsersTab({
  isDark,
  isCreateModalOpen,
  setIsCreateModalOpen,
  onUsersUpdated,
}: AdminUsersTabProps) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const isModalOpen = isCreateModalOpen !== undefined ? isCreateModalOpen : internalModalOpen;
  const setIsModalOpen = setIsCreateModalOpen || setInternalModalOpen;
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // New user form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    identification: "",
    role: "tec" as AdminUser["role"],
  });

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      if (data.success && Array.isArray(data.users)) {
        setUsers(data.users);
      }
    } catch (e) {
      console.error("Error loading users:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          identification: formData.identification,
          role: formData.role,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        setFormData({
          name: "",
          email: "",
          identification: "",
          role: "tec",
        });
        setFeedbackMsg("Usuario creado exitosamente");
        setTimeout(() => setFeedbackMsg(null), 3000);
        loadUsers();
        onUsersUpdated?.();
      } else {
        alert(data.error || "Error al crear usuario");
      }
    } catch (e) {
      console.error(e);
      alert("Error al conectar con el servidor");
    }
  };

  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`¿Eliminar al usuario ${name}?`)) return;
    try {
      const res = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        setFeedbackMsg("Usuario eliminado");
        setTimeout(() => setFeedbackMsg(null), 3000);
        onUsersUpdated?.();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleToggleStatus = async (user: AdminUser) => {
    const newStatus = user.status === "active" ? "suspended" : "active";
    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, status: newStatus }),
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner and Actions */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 shadow-sm backdrop-blur-xl transition-colors ${
          isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#b79f53]" />
              <h2 className="text-sm sm:text-base font-bold font-headline">
                Equipo & Control de Accesos HQ
              </h2>
            </div>
            <p
              className={`text-xs mt-1 ${
                isDark ? "text-slate-400" : "text-stone-500"
              }`}
            >
              Gestión de credenciales de administradores, tramitadores DOB NOW e inspectores de campo.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {feedbackMsg && (
              <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="h-4 w-4" /> {feedbackMsg}
              </span>
            )}

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="gold-gradient-btn inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-md cursor-pointer active:scale-95 transition-transform"
            >
              <UserPlus className="h-4 w-4" />
              <span>Crear Usuario</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full h-9 pl-9 pr-3 rounded-xl text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-[#b79f53]/40 ${
                isDark
                  ? "border border-white/10 bg-black/40 text-white placeholder-slate-500"
                  : "border border-stone-200 bg-stone-50 text-stone-900 placeholder-stone-400 focus:bg-white"
              }`}
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {["all", "super", "tec"].map(
              (r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    roleFilter === r
                      ? "bg-[#b79f53]/20 text-[#b79f53] dark:text-[#ece8a6] border border-[#b79f53]/40 font-bold"
                      : isDark
                      ? "bg-white/5 text-slate-400 hover:text-white"
                      : "bg-stone-100 text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {r === "all" ? "Todos los Roles" : r}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Users List */}
      <div
        className={`rounded-2xl border overflow-hidden shadow-sm backdrop-blur-xl transition-colors ${
          isDark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white"
        }`}
      >
        <div className="divide-y divide-white/10">
          {filteredUsers.length === 0 ? (
            <div className="p-10 text-center text-slate-500 text-xs">
              No se encontraron usuarios registrados con los criterios seleccionados.
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#ece8a6] to-[#b79f53] flex items-center justify-center text-[#1a1608] font-bold text-xs shrink-0 shadow-sm">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold truncate">
                        {user.name}
                      </span>
                      {user.status === "active" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Activo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-500">
                          Suspendido
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400 mt-0.5">
                      <span className="font-mono">{user.email}</span>
                      {user.identification && <><span>•</span><span className="font-mono text-amber-500">ID: {user.identification}</span></>}
                      <span>•</span>
                      <span className="text-[#b79f53] font-medium">{user.role}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[10px]">
                        <Clock className="h-3 w-3" /> Acceso: {user.lastLogin}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(user)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      user.status === "active"
                        ? "border-amber-500/30 text-amber-500 hover:bg-amber-500/10"
                        : "border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10"
                    }`}
                  >
                    {user.status === "active" ? "Suspender" : "Reactivar"}
                  </button>

                  {user.role !== "super" && (
                    <button
                      type="button"
                      onClick={() => handleDeleteUser(user.id, user.name)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Eliminar usuario"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal: Crear Usuario */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div
            className={`w-full max-w-md rounded-2xl border p-6 shadow-2xl transition-all ${
              isDark ? "border-white/10 bg-[#090e17]" : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-[#b79f53]" />
                <h3 className="text-sm font-bold font-headline">Registrar Nuevo Usuario</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 pt-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="ej. Carlos Méndez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#b79f53] ${
                      isDark
                        ? "border-white/10 bg-black/40 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="correo@dominio.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#b79f53] ${
                      isDark
                        ? "border-white/10 bg-black/40 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Rol Asignado
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                  <select
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value as AdminUser["role"] })
                    }
                    className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#b79f53] ${
                      isDark
                        ? "border-white/10 bg-black/40 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
                    }`}
                  >
                    <option value="tec">tec</option>
                    <option value="super">super</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1 text-slate-400">
                  Identificación inicial
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="Documento de identidad"
                    value={formData.identification}
                    onChange={(e) => setFormData({ ...formData, identification: e.target.value })}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#b79f53] ${
                      isDark
                        ? "border-white/10 bg-black/40 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-900 focus:bg-white"
                    }`}
                  />
                </div>
                <p className="mt-1 text-[10px] text-slate-500">Se usa como clave inicial y debe cambiarse en el primer acceso.</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="gold-gradient-btn px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-md cursor-pointer active:scale-95 transition-transform"
                >
                  Guardar Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
