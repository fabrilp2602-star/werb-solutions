import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteProvider } from "@/context/SiteContext";
import AnalyticsConsent from "@/components/AnalyticsConsent";

export const viewport: Viewport = {
  themeColor: "#050810",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://werbsolutions.com"),
  title: "WERB Solutions | NYC Licensed Master Electrician 24/7",
  description: "Licensed Master Electrician in NYC. 24/7 Emergency electrical dispatch, 200A panel upgrades, EV charging, DOB NOW™ filings for Manhattan, Brooklyn, Queens.",
  keywords: [
    "NYC Licensed Master Electrician",
    "24/7 Emergency Electrician Manhattan",
    "DOB NOW Electrical Filing NYC",
    "200A Panel Upgrade Brooklyn",
    "EV Charger Installation Queens",
    "Alteration Agreement Electrician NYC",
    "ConEd Load Letter Filing",
    "$2M COI Master Electrician",
    "Electricista Matriculado Nueva York",
    "纽约持牌电气工程师"
  ],
  alternates: {
    canonical: "https://werbsolutions.com",
    languages: {
      "en-US": "https://werbsolutions.com",
      "es-US": "https://werbsolutions.com/?lang=es",
      "zh-Hans-US": "https://werbsolutions.com/?lang=zh",
      "ru-US": "https://werbsolutions.com/?lang=ru",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://werbsolutions.com",
    siteName: "WERB Solutions LLC",
    title: "WERB Solutions | NYC Licensed Master Electrician 24/7",
    description: "Class-A NYC DOB Licensed Master Electrician. Emergency dispatch <45m in Manhattan & Brooklyn, 200A panel upgrades, $2M COI.",
    images: [
      {
        url: "/media/og_whatsapp_share.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "WERB Solutions NYC Licensed Master Electrician",
      },
      {
        url: "/media/og_whatsapp_share.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "WERB Solutions NYC Licensed Master Electrician",
      },
      {
        url: "/media/logo_wapp.png",
        width: 1098,
        height: 341,
        type: "image/png",
        alt: "WERB Solutions Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WERB Solutions | NYC Licensed Master Electrician 24/7",
    description: "NYC DOB Licensed Master Electrician. Emergency dispatch <45m, 200A panel upgrades, $2M COI insurance.",
    images: ["/media/og_whatsapp_share.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Electrician", "Organization", "LocalBusiness"],
      "@id": "https://werbsolutions.com/#organization",
      "name": "WERB Solutions LLC",
      "legalName": "WERB Solutions LLC",
      "alternateName": ["WERB Electrical NYC", "WERB Solutions"],
      "url": "https://werbsolutions.com",
      "logo": "https://werbsolutions.com/media/brand_logo_master_gemini.jpg",
      "image": "https://werbsolutions.com/media/brand_logo_master_gemini.jpg",
      "telephone": "+19295847647",
      "email": "info@werbsolutions.com",
      "priceRange": "$$",
      "description": "NYC Department of Buildings Class-A Licensed Master Electrician (DOB License #008472). 24/7 high-voltage emergency dispatch, 200A smart panel upgrades, FDNY fire alarm systems, and EV chargers.",
      "areaServed": [
        { "@type": "City", "name": "New York" },
        { "@type": "AdministrativeArea", "name": "Manhattan" },
        { "@type": "AdministrativeArea", "name": "Brooklyn" },
        { "@type": "AdministrativeArea", "name": "Queens" },
        { "@type": "AdministrativeArea", "name": "Bronx" },
        { "@type": "AdministrativeArea", "name": "Staten Island" }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "New York",
        "addressRegion": "NY",
        "addressCountry": "US"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Licensed Electrical Scopes",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "200A Smart Electrical Panel Upgrade & DOB Filing"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "24/7 Emergency Electrical Outage Dispatch"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Level-2 EV Charger & Dedicated Conduit Installation"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "FDNY Code Title 3 RCNY §907 Fire Alarm System"
            }
          }
        ]
      }
    }
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#eef7f3] dark:bg-[#050810] text-[#090e17] dark:text-[#f8fafc] antialiased selection:bg-[#e6b93e]/30 selection:text-[#e6b93e]">
        <SiteProvider>
          {children}
          {/* Universal Cookie & Consent Notice (USA Legal Standard) */}
          <AnalyticsConsent />
        </SiteProvider>
      </body>
    </html>
  );
}
