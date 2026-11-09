"use client";

import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Zap, 
  FileText,
  Sparkles,
  Building,
  ShieldCheck
} from "lucide-react";

interface FormData {
  propertyType: string;
  borough: string;
  service: string;
  urgency: string;
  fullName: string;
  phone: string;
  propertyAddress: string;
  dobJobNumber?: string;
  notes?: string;
}

const PROPERTY_TYPES = [
  { id: "condo", title: "NYC Luxury Condo", desc: "Alteration Agreement with board approval requirements" },
  { id: "coop", title: "NYC Co-op Building", desc: "Strict management building rules & insurance riders" },
  { id: "brownstone", title: "Historic Brownstone", desc: "Townhouse rewiring, 200A upgrade & gas-to-electric conversion" },
  { id: "commercial", title: "Commercial Space", desc: "Midtown/FiDi office, retail, 3-phase power or warehouse" }
];

const BOROUGHS = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island", "Long Island"];

export const PRECONFIGURED_SERVICES = [
  "200A Smart Electrical Panel Upgrade",
  "Level-2 EV Charger Dedicated Line",
  "Lutron Architectural Smart Lighting",
  "Solar Rooftop & Battery Backup System",
  "Commercial 3-Phase Power Installation",
  "DOB NOW Permit Filing & Violation Removal",
  "24/7 Emergency Outage & Circuit Repair"
];

interface NycLeadWizardProps {
  selectedService?: string;
  onClearService?: () => void;
}

export default function NycLeadWizard({ selectedService, onClearService }: NycLeadWizardProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    propertyType: "condo",
    borough: "Manhattan",
    service: selectedService || "200A Smart Electrical Panel Upgrade",
    urgency: "standard",
    fullName: "",
    phone: "",
    propertyAddress: "",
    dobJobNumber: "",
    notes: ""
  });

  // Sync selectedService prop with internal state
  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-10 text-center backdrop-blur-md">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="mt-5 text-2xl font-bold uppercase text-slate-900 dark:text-white">
          Intake Registered Successfully
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
          Our NYC Master Electrician technical desk has received your request for <strong>{formData.service}</strong>. We will contact you within 15 minutes with scheduling options and the formal Certificate of Insurance (COI).
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => { setSubmitted(false); setStep(1); }}
            className="text-xs font-bold uppercase tracking-wider text-[#b79f53] dark:text-[#ece8a6] hover:underline cursor-pointer"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#090e17] p-6 sm:p-10 shadow-lg backdrop-blur-md transition-colors">
      
      {/* 🎯 PRE-SELECTED SERVICE BANNER (APPLE PILL STYLE) */}
      {selectedService && (
        <div className="mb-6 rounded-2xl border border-[#b79f53]/40 bg-[#e2c97d]/15 p-4 flex items-center justify-between backdrop-blur-md animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#ece8a6] to-[#b79f53] flex items-center justify-center text-[#1a1608] shadow-sm shrink-0">
              <Sparkles className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#b79f53] dark:text-[#ece8a6] block">
                Pre-Selected Electrical Scope
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {formData.service}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase">
              Selected
            </span>
            {onClearService && (
              <button
                type="button"
                onClick={onClearService}
                className="text-[11px] font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white underline cursor-pointer"
              >
                Change
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step Indicators */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 text-xs font-bold uppercase tracking-wider">
        <div className={`flex items-center gap-2 ${step >= 1 ? "text-[#b79f53] dark:text-[#ece8a6]" : "text-slate-400"}`}>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-[11px]">1</span>
          <span>Property</span>
        </div>
        <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-800" />
        <div className={`flex items-center gap-2 ${step >= 2 ? "text-[#b79f53] dark:text-[#ece8a6]" : "text-slate-400"}`}>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-[11px]">2</span>
          <span>Service</span>
        </div>
        <div className="h-0.5 w-12 bg-slate-200 dark:bg-slate-800" />
        <div className={`flex items-center gap-2 ${step >= 3 ? "text-[#b79f53] dark:text-[#ece8a6]" : "text-slate-400"}`}>
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-[11px]">3</span>
          <span>Contact</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* STEP 1: PROPERTY & BOROUGH */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                Select NYC Property Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {PROPERTY_TYPES.map((pt) => (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, propertyType: pt.id })}
                    className={`rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                      formData.propertyType === pt.id
                        ? "border-[#b79f53] bg-[#e2c97d]/15 text-slate-900 dark:text-white shadow-sm"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    <div className="font-bold text-sm">{pt.title}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">{pt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                NYC Borough Location
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {BOROUGHS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setFormData({ ...formData, borough: b })}
                    className={`rounded-xl border py-2.5 text-xs font-bold transition-all cursor-pointer ${
                      formData.borough === b
                        ? "border-[#b79f53] bg-gradient-to-br from-[#ece8a6] to-[#b79f53] text-[#1a1608] shadow-sm"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="gold-gradient-btn inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-md cursor-pointer active:scale-95 transition-transform"
              >
                <span>Continue to Service Scope</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SERVICE SCOPE & URGENCY */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                Required Electrical Infrastructure Scope
              </label>
              <div className="space-y-2">
                {PRECONFIGURED_SERVICES.map((srv) => (
                  <label
                    key={srv}
                    className={`flex items-center justify-between rounded-xl border p-3.5 cursor-pointer text-xs font-semibold transition-all ${
                      formData.service === srv
                        ? "border-[#b79f53] bg-[#e2c97d]/15 text-slate-900 dark:text-white shadow-sm"
                        : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="service"
                        checked={formData.service === srv}
                        onChange={() => setFormData({ ...formData, service: srv })}
                        className="text-[#b79f53] focus:ring-[#b79f53]"
                      />
                      <span>{srv}</span>
                    </div>
                    {formData.service === srv && (
                      <span className="text-[10px] font-mono font-bold uppercase text-[#b79f53] dark:text-[#ece8a6] bg-[#b79f53]/10 px-2 py-0.5 rounded">
                        Active Selection
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Dispatch Urgency Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, urgency: "standard" })}
                  className={`rounded-xl border p-3 text-left transition-all cursor-pointer ${
                    formData.urgency === "standard"
                      ? "border-[#b79f53] bg-[#e2c97d]/15 text-slate-900 dark:text-white"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-sky-500" /> Standard Scheduled Inspection
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Free estimate & formal DOB permit consultation</div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, urgency: "emergency" })}
                  className={`rounded-xl border p-3 text-left transition-all cursor-pointer ${
                    formData.urgency === "emergency"
                      ? "border-[#b79f53] bg-[#e2c97d]/15 text-slate-900 dark:text-white"
                      : "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <div className="text-xs font-bold flex items-center gap-1.5 text-[#b79f53] dark:text-[#ece8a6]">
                    <Zap className="h-4 w-4" /> 24/7 Immediate Emergency Dispatch
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Power outage, DOB stop-work order or hazardous fault</div>
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="gold-gradient-btn inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-md cursor-pointer active:scale-95 transition-transform"
              >
                <span>Continue to Contact Details</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT INFORMATION */}
        {step === 3 && (
          <div className="space-y-4">
            
            {/* Quick summary strip */}
            <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/30 p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-500 dark:text-slate-400">Target:</span>
                <span className="font-bold text-slate-900 dark:text-white">{formData.service}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <span>{formData.borough}</span>
                <span>•</span>
                <span className="capitalize">{formData.propertyType}</span>
                <span>•</span>
                <span className="text-[#b79f53] dark:text-[#ece8a6] font-semibold">{formData.urgency === 'emergency' ? '24/7 Emergency' : 'Standard'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name / Management Rep
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Michael Vance"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-[#b79f53] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Direct Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g. (917) 555-0192"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-[#b79f53] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                NYC Property Address & Unit #
              </label>
              <input
                type="text"
                required
                value={formData.propertyAddress}
                onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                placeholder="e.g. 142 Franklin St, Apt 4B, New York, NY 10013"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-[#b79f53] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                DOB NOW Job # / Alteration Notes (Optional)
              </label>
              <input
                type="text"
                value={formData.dobJobNumber}
                onChange={(e) => setFormData({ ...formData, dobJobNumber: e.target.value })}
                placeholder="e.g. DOB Job #B0091823 or Building Alteration packet"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-[#b79f53] focus:outline-none"
              />
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="gold-gradient-btn inline-flex items-center gap-2 rounded-xl px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#1a1608] shadow-md cursor-pointer active:scale-95 transition-transform"
              >
                <span>{loading ? "Registering..." : "Transmit to Master Electrician"}</span>
                <CheckCircle2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
