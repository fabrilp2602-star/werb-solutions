import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://werbsolutions.com";
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}`,
          es: `${baseUrl}/?lang=es`,
          zh: `${baseUrl}/?lang=zh`,
          ru: `${baseUrl}/?lang=ru`,
        },
      },
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/services`,
          es: `${baseUrl}/services?lang=es`,
          zh: `${baseUrl}/services?lang=zh`,
          ru: `${baseUrl}/services?lang=ru`,
        },
      },
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
