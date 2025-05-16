import { env } from "@/src/lib/env";

import type { Metadata } from "next";
import type { WebSite } from "schema-dts";

import Script from "next/script";

import { CtaSection } from "@/src/components/public/home/cta-section";
import { FeaturedPhilosophers } from "@/src/components/public/home/featured-philosophers";
import { FeaturesSection } from "@/src/components/public/home/features-section";
import { HeroSection } from "@/src/components/public/home/hero-section";
import { PricingSection } from "@/src/components/public/home/pricing-section";
import { TestimonialsSection } from "@/src/components/public/home/testimonials-section";
import { prisma } from "@/src/lib/prisma";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: `Chat with Philosophers | ${env.NEXT_PUBLIC_APP_NAME}`,
  description:
    "Engage with history's greatest philosophical minds through AI. DeepThink lets you chat with Socrates, Nietzsche, Kant, and many more to explore their ideas and perspectives.",
  keywords: [
    "philosophy",
    "AI chat",
    "philosophers",
    "learn philosophy",
    "Socrates",
    "Nietzsche",
    "Kant",
  ],
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/`,
  },
  openGraph: {
    title: `DeepThink - Chat with Philosophers | ${env.NEXT_PUBLIC_APP_NAME}`,
    description:
      "Engage with history's greatest philosophical minds through AI. DeepThink lets you chat with Socrates, Nietzsche, Kant, and many more to explore their ideas and perspectives.",
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
    title: `DeepThink - Chat with Philosophers | ${env.NEXT_PUBLIC_APP_NAME}`,
    description:
      "Engage with history's greatest philosophical minds through AI. DeepThink lets you chat with Socrates, Nietzsche, Kant, and many more to explore their ideas and perspectives.",
    images: {
      url: "/images/default-open-graph.png",
      width: 1200,
      height: 630,
      alt: `Default Open Graph image for ${env.NEXT_PUBLIC_APP_NAME}`,
    },
  },
};

export default async function HomePage() {
  //main();

  const philosophers = await prisma.philosopher.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  const schemaOrg: WebSite = {
    "@type": "WebSite",
    name: env.NEXT_PUBLIC_APP_NAME,
    url: env.NEXT_PUBLIC_BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${env.NEXT_PUBLIC_BASE_URL}/search?q={search_term_string}`,
    },
    description:
      "Engage with history's greatest philosophical minds through AI. DeepThink lets you chat with Socrates, Nietzsche, Kant, and many more to explore their ideas and perspectives.",
    headline: "DeepThink - Chat with Philosophers",
    image: `${env.NEXT_PUBLIC_BASE_URL}/images/default-open-graph.png`,
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
    <main className="flex min-h-screen flex-col items-center">
      <HeroSection />
      <FeaturedPhilosophers philosophers={philosophers} />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CtaSection />

      <Script
        id="schema-org-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrg),
        }}
      />
    </main>
  );
}
