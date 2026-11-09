"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Zap, 
  MapPin, 
  Phone, 
  FileText, 
  MessageSquareText, 
  Sparkles 
} from "lucide-react";
import { useSite } from "@/context/SiteContext";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43zm8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.07c0 2 .52 3.95 1.52 5.67L.6 23.65l6.04-1.58a11.33 11.33 0 0 0 5.41 1.38h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03z" />
    </svg>
  );
}

/**
 * Tactical Apple iOS Mobile Action Dock (< md).
 * Sculpted elliptical curvature with circular center notch for high-priority 24/7 Dispatch call.
 */
export default function MobileActionBar() {
  const pathname = usePathname();
  const { texts } = useSite();
  const phoneClean = texts.phone.replace(/\D/g, "") || "19295847647";
  const whatsappClean = texts.whatsappNumber.replace(/\D/g, "") || "19295847647";

  const triggerHaptic = (ms: number = 15) => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(ms);
      } catch {}
    }
  };

  const leftItems = [
    {
      label: "Servicios",
      href: "/services",
      icon: Zap,
      active: pathname === "/services",
    },
    {
      label: "Zonas",
      href: "/#boroughs",
      icon: MapPin,
      active: false,
    },
  ];

  const rightItems = [
    {
      label: "Cotizar",
      href: "/#nyc-lead-wizard",
      icon: Sparkles,
      active: false,
    },
    texts.whatsappVisible
      ? {
          label: "WhatsApp",
          href: `https://wa.me/${whatsappClean}?text=${encodeURIComponent("Hello WERB Solutions, I need an official NYC electrical estimate.")}`,
          icon: WhatsAppIcon,
          external: true,
          active: false,
        }
      : {
          label: "Empresa",
          href: "/#about",
          icon: FileText,
          active: false,
        },
  ];

  return (
    <nav 
      aria-label="Acciones rápidas móviles" 
      className="fixed inset-x-0 bottom-0 z-50 md:hidden select-none pointer-events-auto"
    >
      <div className="relative">
        {/* Apple iOS Drop Shadow */}
        <div aria-hidden className="pointer-events-none absolute inset-0 drop-shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
          <div className="h-full w-full rounded-t-[50%_1.75rem] bg-[#050810]/70 ios-notch-mask" />
        </div>

        {/* Apple Frosted Glass Background with Elliptic Arch & Center Notch */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-t-[50%_1.75rem] border-t border-white/[0.12] bg-[#090e17]/90 backdrop-blur-2xl ios-notch-mask"
        />

        {/* 5-Column Grid */}
        <ul className="relative grid grid-cols-5 items-end px-2 pb-[max(0.6rem,env(safe-area-inset-bottom))]">
          {/* Left Item 1 */}
          <li className="flex h-14 items-end justify-center">
            <Link
              href={leftItems[0].href}
              onClick={() => triggerHaptic(12)}
              className={`flex min-h-12 min-w-11 flex-col items-center justify-end gap-1 rounded-xl px-1 pb-1 transition-all duration-150 active:scale-90 cursor-pointer ${
                leftItems[0].active ? "text-[#e6b93e]" : "text-slate-400 hover:text-white"
              }`}
            >
              <Zap className={`h-5 w-5 ${leftItems[0].active ? "text-[#e6b93e]" : "text-slate-300"}`} />
              <span className="text-[10px] font-semibold leading-none tracking-tight">{leftItems[0].label}</span>
            </Link>
          </li>

          {/* Left Item 2 */}
          <li className="flex h-14 items-end justify-center">
            <Link
              href={leftItems[1].href}
              onClick={() => triggerHaptic(12)}
              className="flex min-h-12 min-w-11 flex-col items-center justify-end gap-1 rounded-xl px-1 pb-1 transition-all duration-150 active:scale-90 text-slate-400 hover:text-white cursor-pointer"
            >
              <MapPin className="h-5 w-5 text-slate-300" />
              <span className="text-[10px] font-semibold leading-none tracking-tight">{leftItems[1].label}</span>
            </Link>
          </li>

          {/* Center Column: Notch Floating Call Button */}
          <li className="relative flex h-14 justify-center">
            <a
              href={`tel:${phoneClean}`}
              onClick={() => triggerHaptic(25)}
              aria-label="24/7 Master Electrician Emergency Call"
              className="group absolute -top-[28px] bottom-0 flex flex-col items-center justify-between pb-1"
            >
              <span className="relative grid h-[58px] w-[58px] place-items-center rounded-full bg-gradient-to-br from-[#e6b93e] to-[#b88c22] text-[#050810] shadow-[0_4px_20px_rgba(230,185,62,0.4)] ring-1 ring-white/30 transition-transform duration-150 group-active:scale-90">
                <span className="absolute inset-0 rounded-full animate-ping bg-[#e6b93e]/30 pointer-events-none" />
                <Phone className="h-6 w-6 fill-current text-[#050810]" aria-hidden />
              </span>
              <span className="whitespace-nowrap text-[10px] font-black leading-none tracking-wider text-[#e6b93e] uppercase drop-shadow">
                24/7 Llamar
              </span>
            </a>
          </li>

          {/* Right Item 1 */}
          <li className="flex h-14 items-end justify-center">
            <Link
              href={rightItems[0].href}
              onClick={() => triggerHaptic(12)}
              className="flex min-h-12 min-w-11 flex-col items-center justify-end gap-1 rounded-xl px-1 pb-1 transition-all duration-150 active:scale-90 text-slate-400 hover:text-white cursor-pointer"
            >
              <Sparkles className="h-5 w-5 text-[#e6b93e]" />
              <span className="text-[10px] font-semibold leading-none tracking-tight">{rightItems[0].label}</span>
            </Link>
          </li>

          {/* Right Item 2 */}
          <li className="flex h-14 items-end justify-center">
            {rightItems[1].external ? (
              <a
                href={rightItems[1].href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerHaptic(12)}
                className="flex min-h-12 min-w-11 flex-col items-center justify-end gap-1 rounded-xl px-1 pb-1 transition-all duration-150 active:scale-90 text-slate-400 hover:text-white cursor-pointer"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                <span className="text-[10px] font-semibold leading-none tracking-tight">{rightItems[1].label}</span>
              </a>
            ) : (
              <Link
                href={rightItems[1].href}
                onClick={() => triggerHaptic(12)}
                className="flex min-h-12 min-w-11 flex-col items-center justify-end gap-1 rounded-xl px-1 pb-1 transition-all duration-150 active:scale-90 text-slate-400 hover:text-white cursor-pointer"
              >
                <FileText className="h-5 w-5 text-slate-300" />
                <span className="text-[10px] font-semibold leading-none tracking-tight">{rightItems[1].label}</span>
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
