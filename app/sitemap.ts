import { env } from "@/src/lib/env";

import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}/philosophers`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}/sign-up`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}/sign-in`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${env.NEXT_PUBLIC_BASE_URL}/forgot-password`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
  ];
}
