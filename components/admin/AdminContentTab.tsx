"use client";

import React from "react";
import { SiteContentTexts, CustomServiceItem } from "@/context/SiteContext";
import { HeroCopywritingSection } from "./content/HeroCopywritingSection";
import { ServicesCatalogSection } from "./content/ServicesCatalogSection";

interface AdminContentTabProps {
  isDark: boolean;
  texts: SiteContentTexts;
  onChange: (updated: SiteContentTexts) => void;
}

export function AdminContentTab({
  isDark,
  texts,
  onChange,
}: AdminContentTabProps) {
  const handleFieldChange = (field: keyof SiteContentTexts, value: any) => {
    onChange({
      ...texts,
      [field]: value,
    });
  };

  const handleServicesChange = (services: CustomServiceItem[]) => {
    onChange({
      ...texts,
      customServices: services,
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Hero & Copywriting Texts */}
      <HeroCopywritingSection
        isDark={isDark}
        texts={texts}
        onFieldChange={handleFieldChange}
      />

      {/* 2. Services Catalog CRUD (Add, Edit, Remove) */}
      <ServicesCatalogSection
        isDark={isDark}
        services={texts.customServices || []}
        onServicesChange={handleServicesChange}
      />
    </div>
  );
}
