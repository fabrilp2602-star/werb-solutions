import { Locale, TranslationDictionary } from "@/data/i18n";

export function getLocalizedServiceName(rawService: string, t: TranslationDictionary, locale: Locale): string {
  if (!rawService) return "";
  const s = rawService.toLowerCase();
  const matched = t.servicesSection?.items?.find((item) => item.targetService === rawService || item.id === rawService || s.includes(item.id.toLowerCase()));
  if (matched?.title) return matched.title;
  if (s.includes("panel") || s.includes("voltage") || s.includes("200a") || s === "panel-upgrade") return t.slides?.[0]?.title || t.servicesSection?.items?.[0]?.title || "200A Smart Electrical Panel Upgrade";
  if (s.includes("solar") || s.includes("battery") || s.includes("powerwall") || s === "solar-battery") return t.slides?.[1]?.title || t.servicesSection?.items?.[3]?.title || "Solar Rooftop & Battery Backup System";
  if (s.includes("lighting") || s.includes("lutron") || s.includes("light") || s === "architectural-lighting") return t.slides?.[2]?.title || t.servicesSection?.items?.[2]?.title || "Lutron Architectural Smart Lighting";
  if (s.includes("fire") || s.includes("alarm") || s.includes("fdny") || s === "fire-alarm") return t.slides?.[3]?.title || "FDNY Fire Alarm & Life Safety Systems";
  if (s.includes("demolition") || s.includes("drywall") || s.includes("finishes") || s.includes("construction") || s === "construction") return t.slides?.[4]?.title || "Controlled Demolition, Level-5 Drywall & Fine Finishes";
  if (s.includes("charger") || s.includes("ev") || s === "ev-charging") return t.servicesSection?.items?.[1]?.title || "Level-2 EV Charger Dedicated Line";
  if (s.includes("commercial") || s.includes("3-phase") || s.includes("phase")) return locale === "es" ? "Instalación de Energía Comercial Trifásica" : locale === "ru" ? "Коммерческое 3-фазное электроснабжение" : "Commercial 3-Phase Power Installation";
  if (s.includes("dob") || s.includes("permit") || s.includes("violation")) return locale === "es" ? "Tramitación de Permisos DOB NOW y Retiro de Infracciones" : locale === "ru" ? "Согласование DOB NOW и снятие нарушений" : "DOB NOW Permit Filing & Violation Removal";
  if (s.includes("emergency") || s.includes("outage") || s.includes("repair") || s.includes("circuit")) return locale === "es" ? "Corte Eléctrico de Emergencia 24/7 y Reparación de Circuitos" : locale === "ru" ? "Аварийное отключение 24/7 и ремонт сетей" : "24/7 Emergency Outage & Circuit Repair";
  return rawService;
}
