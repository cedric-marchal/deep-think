import { env } from "@/src/lib/env";
import { prisma } from "@/src/lib/prisma";

import type { MetadataRoute } from "next";

import type { Philosopher } from "@/prisma/generated/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const philosophers = await prisma.philosopher.findMany();

  const philosophersSitemap = philosophers.map((philosopher: Philosopher) => ({
    url: `${env.NEXT_PUBLIC_BASE_URL}/philosophers/${philosopher.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

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
    ...philosophersSitemap,
  ];
}
