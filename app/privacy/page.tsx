"use client";

import React from "react";
import Header from "@/components/navigation/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/navigation/MobileActionBar";
import { ShieldCheck, Lock, FileText, CheckCircle2, Phone, Sparkles } from "lucide-react";
import { useSite } from "@/context/SiteContext";

interface PrivacyContent {
  badge: string;
  title: string;
  subtitle: string;
  cards: {
    icon: typeof Lock;
    num: string;
    title: string;
    badge: string;
    desc: string;
  }[];
}

const PRIVACY_TRANSLATIONS: Record<string, PrivacyContent> = {
  en: {
    badge: "US & NY Regulatory Standards",
    title: "Privacy Policy & Data Security",
    subtitle: "Official data governance standards for WERB Solutions LLC compliant with the New York Stop Hacks and Improve Electronic Data Security Act (NY SHIELD Act) and Federal trade standards.",
    cards: [
      {
        icon: Lock,
        num: "01",
        title: "Information Collection & Technical Intake",
        badge: "DOB NOW™ Filing",
        desc: "WERB Solutions collects technical property information, contact details, and project specifications submitted via our intake wizard, phone hotline, or WhatsApp channel. This information is strictly utilized to file official NYC Department of Buildings permits, schedule field master electrician inspections, and dispatch emergency personnel.",
      },
      {
        icon: FileText,
        num: "02",
        title: "Zero Third-Party Monetization",
        badge: "Strictly Confidential",
        desc: "We never sell, rent, or trade your personal or building data to marketing brokers or third-party advertisers. All customer records remain strictly confidential and encrypted at rest and in transit.",
      },
      {
        icon: ShieldCheck,
        num: "03",
        title: "NY SHIELD Act & Data Encryption",
        badge: "AES-256 Bit",
        desc: "All client blueprints, electrical single-line diagrams, and alteration agreement filings comply with the NY SHIELD Act data safeguards, employing TLS 1.3 transport security and isolated encrypted repositories.",
      },
      {
        icon: Phone,
        num: "04",
        title: "Compliance Officer & Legal Inquiries",
        badge: "24/7 Official Support",
        desc: "For questions regarding privacy, records retention, or permit documentation, contact our compliance officer at info@werbsolutions.com or call our direct NYC hotline at +1 (929) 584-7647.",
      },
    ],
  },
  es: {
    badge: "Normativa Federal y del Estado de Nueva York",
    title: "Política de Privacidad y Seguridad de Datos",
    subtitle: "Estándares oficiales de gobernanza de datos de WERB Solutions LLC bajo la ley New York Stop Hacks and Improve Electronic Data Security Act (NY SHIELD Act) y normativas comerciales federales.",
    cards: [
      {
        icon: Lock,
        num: "01",
        title: "Recopilación de Datos e Ingesta Técnica",
        badge: "Radicación DOB NOW™",
        desc: "WERB Solutions recopila información técnica del inmueble, contactos y especificaciones de obra mediante nuestro asistente de cotización, línea directa o canal de WhatsApp. Estos datos se usan exclusivamente para tramitar permisos ante el NYC DOB y despachar electricistas matriculados.",
      },
      {
        icon: FileText,
        num: "02",
        title: "Cero Comercialización con Terceros",
        badge: "Estricta Confidencialidad",
        desc: "Nunca vendemos, alquilamos ni transferimos sus datos personales o los de su edificio a intermediarios publicitarios. Toda la información permanece encriptada y bajo estricto secreto profesional.",
      },
      {
        icon: ShieldCheck,
        num: "03",
        title: "Cumplimiento NY SHIELD y Cifrado",
        badge: "Cifrado AES-256",
        desc: "Todos los planos unifilares, cartas de carga ConEd y acuerdos de reforma de co-ops se protegen bajo los estándares técnicos de la ley NY SHIELD Act con transporte cifrado TLS 1.3.",
      },
      {
        icon: Phone,
        num: "04",
        title: "Oficial de Cumplimiento y Contacto",
        badge: "Atención Oficial 24/7",
        desc: "Para cualquier consulta sobre protección de datos o retención de expedientes de permisos, contacte a nuestro oficial de cumplimiento en info@werbsolutions.com o llame al +1 (929) 584-7647.",
      },
    ],
  },
  ru: {
    badge: "Нормативные стандарты США и Нью-Йорка",
    title: "Политика конфиденциальности и защита данных",
    subtitle: "Официальные стандарты обработки данных WERB Solutions LLC в соответствии с Законом штата Нью-Йорк о защите данных (NY SHIELD Act) и федеральными стандартами торговли.",
    cards: [
      {
        icon: Lock,
        num: "01",
        title: "Сбор технической информации",
        badge: "Согласование DOB NOW™",
        desc: "WERB Solutions собирает технические данные объектов, контактную информацию и параметры проектов через форму заявки, телефонную линию или WhatsApp исключительно для подачи документов в Департамент зданий NYC DOB и выезда мастеров.",
      },
      {
        icon: FileText,
        num: "02",
        title: "Никакой передачи третьим лицам",
        badge: "Полная конфиденциальность",
        desc: "Мы никогда не продаем, не сдаем в аренду и не передаем ваши персональные данные брокерам данных или рекламодателям. Вся информация зашифрована и строго защищена.",
      },
      {
        icon: ShieldCheck,
        num: "03",
        title: "Закон NY SHIELD и шифрование",
        badge: "Шифрование AES-256",
        desc: "Все чертежи, однолинейные электрические схемы и согласования перепланировок кондоминиумов защищены по протоколам NY SHIELD Act с использованием TLS 1.3.",
      },
      {
        icon: Phone,
        num: "04",
        title: "Служба комплаенса и контакты",
        badge: "Официальная линия 24/7",
        desc: "По вопросам конфиденциальности, хранения документов или архивных разрешений DOB свяжитесь с нашим офицером по комплаенсу: info@werbsolutions.com или +1 (929) 584-7647.",
      },
    ],
  },
  zh: {
    badge: "美国及纽约州法规标准",
    title: "隐私政策与数据安全",
    subtitle: "WERB Solutions LLC 严格遵循纽约州《停止黑客攻击并改进电子数据安全法》（NY SHIELD Act）及联邦贸易标准的数据治理规范。",
    cards: [
      {
        icon: Lock,
        num: "01",
        title: "信息收集与工程受理",
        badge: "DOB NOW™ 申报备案",
        desc: "WERB Solutions 通过线上向导、服务热线或 WhatsApp 收集物业技术资料和工程规格，仅用于向纽约市房屋局（NYC DOB）申报官方电气许可证、安排持牌电工现场勘测及紧急调度。",
      },
      {
        icon: FileText,
        num: "02",
        title: "严禁向第三方变现",
        badge: "严格保密承诺",
        desc: "我们绝不会将您的个人或建筑数据出售、出租或交易给营销中介或第三方广告商。所有客户记录均在传输和存储中保持高度加密。",
      },
      {
        icon: ShieldCheck,
        num: "03",
        title: "NY SHIELD 法案与数据加密",
        badge: "AES-256 级别",
        desc: "所有客户单线电气图纸、大楼改造协议申报文件均严格遵循 NY SHIELD Act 安全基准，采用 TLS 1.3 安全信道与隔离加密存储。",
      },
      {
        icon: Phone,
        num: "04",
        title: "合规官员与法律咨询",
        badge: "24/7 官方支持",
        desc: "如对数据隐私、许可记录保留有任何疑问，请联系我们的合规负责人：info@werbsolutions.com 或致电纽约专线 +1 (929) 584-7647。",
      },
    ],
  },
};

export default function PrivacyPage() {
  const { locale } = useSite();
  const content = PRIVACY_TRANSLATIONS[locale] || PRIVACY_TRANSLATIONS.en;

  return (
    <main className="min-h-screen bg-[#f8fafc] dark:bg-[#050810] text-slate-900 dark:text-slate-100 transition-colors">
      <Header />
      <MobileActionBar />

      <div className="mx-auto max-w-7xl px-4 pt-28 sm:pt-32 pb-20 sm:px-6 lg:px-8 space-y-10">
        {/* Header Banner */}
        <div className="border-b border-slate-200 dark:border-white/10 pb-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-3">
            <ShieldCheck className="h-3.5 w-3.5" />
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
                  <span>Verified Standard</span>
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
