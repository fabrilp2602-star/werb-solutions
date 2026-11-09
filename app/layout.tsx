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
  title: "WERB Solutions | NYC Licensed Master Electrician 24/7",
  description: "Licensed Master Electrician in NYC. 24/7 Emergency electrical dispatch, 200A panel upgrades, EV charging, DOB NOW™ filings for Manhattan, Brooklyn, Queens.",
  icons: {
    icon: "/media/logo_navbar.webp",
    apple: "/media/logo_navbar.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#f8fafc] dark:bg-[#050810] text-[#090e17] dark:text-[#f8fafc] antialiased selection:bg-[#e6b93e]/30 selection:text-[#e6b93e]">
        <SiteProvider>
          {children}
          {/* Universal Cookie & Consent Notice (USA Legal Standard) */}
          <AnalyticsConsent />
        </SiteProvider>
      </body>
    </html>
  );
}
