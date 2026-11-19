"use client";

import React from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/navigation/MobileActionBar";
import { ShieldCheck, Scale, Hammer, AlertTriangle, FileCheck2, Clock, CheckCircle2 } from "lucide-react";
import { useSite } from "@/context/SiteContext";

interface TermsContent {
  badge: string;
  title: string;
  subtitle: string;
  cards: {
    icon: typeof Hammer;
    num: string;
    title: string;
    badge: string;
    desc: string;
  }[];
}

const TERMS_TRANSLATIONS: Record<string, TermsContent> = {
  en: {
    badge: "NYC DOB Contracting Standards",
    title: "Terms of Service & DOB Legal Standards",
    subtitle: "Contracting regulations, insurance certificates, and code compliance standards governing all electrical and infrastructure projects undertaken by WERB Solutions LLC across the five boroughs of New York City.",
    cards: [
      {
        icon: Hammer,
        num: "01",
        title: "NYC DOB Permitting & Filing Representation",
        badge: "DOB NOW™ Certified",
        desc: "All high-voltage installations, electrical service cutovers, solar panel canopies, and commercial EV charging stations require official filings with the NYC Department of Buildings through DOB NOW™. WERB Solutions acts as the licensed master electrician of record for certified jobs.",
      },
      {
        icon: ShieldCheck,
        num: "02",
        title: "$2M COI & NY Labor Law 240/241 Compliance",
        badge: "$2,000,000 Verified",
        desc: "WERB Solutions LLC maintains full Comprehensive General Liability ($2,000,000 aggregate), Workers' Compensation, and Disability insurance complying with New York State Labor Law § 240 and § 241 (Scaffold Law). Certificates of Insurance (COI) are generated promptly.",
      },
      {
        icon: Clock,
        num: "03",
        title: "24/7 Emergency Dispatch & SLA Timelines",
        badge: "<45m Target Arrival",
        desc: "24/7 emergency dispatch target response times (under 45 minutes in Manhattan, under 30 minutes in Brooklyn, and under 40 minutes in Queens) are dependent on MTA transit traffic, severe weather events, and active FDNY/NYPD area cordons.",
      },
      {
        icon: FileCheck2,
        num: "04",
        title: "Alteration Agreements & HOA Sign-Offs",
        badge: "Co-op & Condo Ready",
        desc: "We coordinate architectural reviews, ConEdison load verification letters, and building alteration agreements directly with managing agents, coop boards, and condominium trustees to guarantee zero compliance delays.",
      },
    ],
  },
  es: {
    badge: "Estándares Contractuales NYC DOB",
    title: "Términos de Servicio y Normas Legales DOB",
    subtitle: "Reglamentaciones contractuales, certificados de seguro y estándares de cumplimiento del código que rigen todos los proyectos de ingeniería eléctrica ejecutados por WERB Solutions LLC en los cinco distritos de Nueva York.",
    cards: [
      {
        icon: Hammer,
        num: "01",
        title: "Radicación y Permisos Oficiales NYC DOB",
        badge: "Certificado DOB NOW™",
        desc: "Toda instalación de alto voltaje, cambio de acometida, paneles solares y cargadores comerciales de vehículos eléctricos requiere radicación oficial ante el NYC DOB a través de DOB NOW™. WERB Solutions actúa como el Master Electrician matriculado responsable.",
      },
      {
        icon: ShieldCheck,
        num: "02",
        title: "Póliza $2M COI y Ley Laboral NY 240/241",
        badge: "$2,000,000 Verificado",
        desc: "WERB Solutions LLC cuenta con seguro de responsabilidad civil general de $2,000,000, compensación laboral y seguro de incapacidad en estricto cumplimiento con la Ley Laboral de NY § 240 y § 241. Emitimos certificados de seguro (COI) a favor de su edificio de inmediato.",
      },
      {
        icon: Clock,
        num: "03",
        title: "Despacho de Emergencia 24/7 y Tiempos SLA",
        badge: "Menos de 45 min",
        desc: "Los tiempos objetivo de respuesta para emergencias (menos de 45 min en Manhattan, 30 min en Brooklyn y 40 min en Queens) están sujetos a condiciones de tráfico, alertas meteorológicas severas o perímetros activos del FDNY/NYPD.",
      },
      {
        icon: FileCheck2,
        num: "04",
        title: "Acuerdos de Reforma y Aprobación HOA/Co-op",
        badge: "Condos y Co-ops",
        desc: "Gestionamos cartas de carga ante ConEdison, revisiones técnicas y acuerdos de reforma directamente con juntas de condominios y administradores de propiedades para evitar paralizaciones o multas de obra.",
      },
    ],
  },
  ru: {
    badge: "Договорные стандарты NYC DOB",
    title: "Условия обслуживания и регламент DOB",
    subtitle: "Договорные нормы, страховые сертификаты и стандарты соответствия строительным нормам, регулирующие все электромонтажные работы WERB Solutions LLC в пяти боро Нью-Йорка.",
    cards: [
      {
        icon: Hammer,
        num: "01",
        title: "Согласование и разрешения NYC DOB",
        badge: "Сертификация DOB NOW™",
        desc: "Все высоковольтные работы, замена силовых вводов, солнечные электростанции и зарядные станции требуют официальной подачи через систему DOB NOW™. WERB Solutions выступает в качестве лицензированного мастера-электрика.",
      },
      {
        icon: ShieldCheck,
        num: "02",
        title: "Страховка $2M COI и законы NY 240/241",
        badge: "$2,000,000 Проверено",
        desc: "WERB Solutions LLC имеет полное страховое покрытие на сумму $2,000,000, страхование от несчастных случаев и инвалидности в соответствии со статьями 240 и 241 Трудового кодекса Нью-Йорка. Страховые сертификаты (COI) выдаются незамедлительно.",
      },
      {
        icon: Clock,
        num: "03",
        title: "Аварийный выезд 24/7 и регламент SLA",
        badge: "До 45 минут в пути",
        desc: "Целевое время прибытия аварийной бригады (до 45 минут на Манхэттене, 30 минут в Бруклине и 40 минут в Квинсе) зависит от дорожной ситуации, погодных условий и зон оцепления FDNY/NYPD.",
      },
      {
        icon: FileCheck2,
        num: "04",
        title: "Согласования с HOA и управляющими Co-op",
        badge: "Готово для кондоминиумов",
        desc: "Мы согласовываем расчеты нагрузок ConEdison и договоры на проведение ремонтных работ напрямую с управляющими компаниями и советами кооперативов без проволочек.",
      },
    ],
  },
  zh: {
    badge: "纽约市房屋局（DOB）承包规范",
    title: "服务条款与房屋局法律标准",
    subtitle: "规范 WERB Solutions LLC 在纽约市五大区开展的所有电气及基础设施工程的承包法规、保险凭证及建筑合规标准。",
    cards: [
      {
        icon: Hammer,
        num: "01",
        title: "纽约市房屋局（DOB）许可申报代表",
        badge: "DOB NOW™ 官方认证",
        desc: "所有高压电气安装、电表盘升级、太阳能光伏与商用充电桩均须通过 DOB NOW™ 向纽约市房屋局申报。WERB Solutions 作为持牌总电气工程师全程负责申报签字与验收。",
      },
      {
        icon: ShieldCheck,
        num: "02",
        title: "200万美元责任险与劳工法240/241合规",
        badge: "已验资 2,000,000 美元",
        desc: "WERB Solutions LLC 具备 200 万美元综合商业责任险、工伤赔偿险及伤残保险，严格遵守纽约州劳工法第 240 及 241 条（脚手架法案）。在合同签订后立即为大楼业委会开具正式保险证书（COI）。",
      },
      {
        icon: Clock,
        num: "03",
        title: "24/7 紧急调度与响应时效 SLA",
        badge: "目标45分钟内到达",
        desc: "24小时紧急抢修目标响应时效（曼哈顿45分钟内、布鲁克林30分钟内、皇后区40分钟内）受大都会运输署交通状况、极端天气及消防/警务临时管制影响。",
      },
      {
        icon: FileCheck2,
        num: "04",
        title: "合作公寓/共管公寓改造协议审核",
        badge: "公寓管委会对接",
        desc: "我们直接对接大楼物业管理公司与业委会，协助办理联合爱迪生（ConEd）负荷计算信函及建筑装修许可协议，确保零施工延误。",
      },
    ],
  },
};

export default function TermsPage() {
  const { locale } = useSite();
  const content = TERMS_TRANSLATIONS[locale] || TERMS_TRANSLATIONS.en;

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#050810] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />
      <MobileActionBar />

      <div className="mx-auto max-w-7xl px-4 pt-28 sm:pt-32 pb-20 sm:px-6 lg:px-8 space-y-10">
        {/* Header Banner */}
        <div className="border-b border-slate-200 dark:border-white/10 pb-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e6b93e]/30 bg-[#e6b93e]/10 px-3.5 py-1 text-xs font-mono font-bold uppercase text-[#b88c22] dark:text-[#e6b93e] mb-3">
            <Scale className="h-3.5 w-3.5" />
            <span>{content.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white uppercase">
            {content.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="apple-glass-card group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-[#090e17]/80 backdrop-blur-xl shadow-sm hover:border-[#b79f53]/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs font-bold text-[#b79f53] dark:text-[#ece8a6]">
                      {card.num}
                    </span>
                    <span className="rounded-full bg-[#b79f53]/15 text-[#b79f53] dark:text-[#ece8a6] border border-[#b79f53]/30 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase">
                      {card.badge}
                    </span>
                  </div>

                  <div className="h-11 w-11 rounded-2xl bg-[#b79f53]/10 border border-[#b79f53]/25 flex items-center justify-center text-[#b79f53] dark:text-[#ece8a6] mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-base font-bold font-headline text-slate-900 dark:text-white leading-snug">
                    {card.title}
                  </h3>

                  <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>DOB & NYS Compliant</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </main>
  );
}
