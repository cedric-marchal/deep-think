import { env } from "@/src/lib/env";

import type { Metadata } from "next";
import type { WebSite } from "schema-dts";

import Script from "next/script";

import { prisma } from "@/src/lib/prisma";
import { PhilosopherList } from "./_components/philosopher-list";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: `Philosophers | ${env.NEXT_PUBLIC_APP_NAME}`,
  description:
    "Explore our collection of philosophers and their ideas. Chat with them to learn more about their thoughts and theories.",
  keywords: ["philosophy", "philosophers", "philosophy chat"],
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/`,
  },
  openGraph: {
    title: `Philosophers | ${env.NEXT_PUBLIC_APP_NAME}`,
    description:
      "Explore our collection of philosophers and their ideas. Chat with them to learn more about their thoughts and theories.",
    siteName: env.NEXT_PUBLIC_APP_NAME,
    url: env.NEXT_PUBLIC_BASE_URL,
    images: [
      {
        url: "/images/default-open-graph.png",
        width: 1200,
        height: 630,
        alt: `Default Open Graph image for ${env.NEXT_PUBLIC_APP_NAME}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Philosophers | ${env.NEXT_PUBLIC_APP_NAME}`,
    description:
      "Explore our collection of philosophers and their ideas. Chat with them to learn more about their thoughts and theories.",
    images: {
      url: "/images/default-open-graph.png",
      width: 1200,
      height: 630,
      alt: `Default Open Graph image for ${env.NEXT_PUBLIC_APP_NAME}`,
    },
  },
};

export default async function PhilosophersPage() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const philosophers = await prisma.philosopher.findMany();

  const schemaOrg: WebSite = {
    "@type": "WebSite",
    name: env.NEXT_PUBLIC_APP_NAME,
    url: env.NEXT_PUBLIC_BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${env.NEXT_PUBLIC_BASE_URL}/search?q={search_term_string}`,
    },
    description: "description",
    headline: "Philosophers",
    image: `${env.NEXT_PUBLIC_BASE_URL}/images/default-open-graph.png`,
    sameAs: [
      "https://www.facebook.com/your-facebook-page",
      "https://twitter.com/your-twitter-handle",
      // Add other social media links here
    ],
    publisher: {
      "@type": "Organization",
      name: env.NEXT_PUBLIC_APP_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${env.NEXT_PUBLIC_BASE_URL}/images/logo-app-name.png`,
      },
    },
  };

  return (
    <main className="flex flex-col items-center">
      <h1 className="mt-8 mb-6 text-3xl font-bold">Philosophers</h1>
      <p className="text-muted-foreground mb-8 text-lg">
        Explore our collection of philosophers and their ideas.
      </p>

      <PhilosopherList philosophers={philosophers} />

      <Script
        id="schema-org-philosophers"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrg),
        }}
      />
    </main>
  );
}
