import { env } from "@/src/lib/env";
import { Suspense } from "react";

import type { PhilosophicalEra, Prisma } from "@/prisma/generated/prisma";
import type { Metadata } from "next";
import type { WebSite, WithContext } from "schema-dts";

import Script from "next/script";

import { prisma } from "@/src/lib/prisma";
import { philosopherFilterParamsCache } from "@/src/utils/api/search-params";
import { PhilosopherList } from "@/components/philosopher-list";
import { PhilosophersFilter } from "@/components/philosophers-filter";

import {
  headerAnimation,
  staggerContainer,
  subHeaderAnimation,
} from "@/components/animations";
import {
  MotionHeading,
  MotionMain,
  MotionParagraph,
} from "@/components/motion-components";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: `Philosophers | ${env.NEXT_PUBLIC_APP_NAME}`,
  description:
    "Explore our collection of philosophers and their ideas. Chat with them to learn more about their thoughts and theories.",
  keywords: ["philosophy", "philosophers", "philosophy chat"],
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/philosophers`,
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

export default async function PhilosophersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { name, eras } = philosopherFilterParamsCache.parse(await searchParams);

  // Build the query with filters
  const where: Prisma.PhilosopherWhereInput = {};

  if (name) {
    where.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  if (eras && eras.length > 0) {
    where.era = {
      in: eras as PhilosophicalEra[],
    };
  }

  const philosophers = await prisma.philosopher.findMany({
    where,
    orderBy: {
      name: "asc",
    },
  });

  const schemaOrg: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: env.NEXT_PUBLIC_APP_NAME,
    url: env.NEXT_PUBLIC_BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${env.NEXT_PUBLIC_BASE_URL}/search?q={search_term_string}`,
    },
    description:
      "Explore the ideas and theories of philosophers throughout history",
    headline: "Philosophers",
    image: `${env.NEXT_PUBLIC_BASE_URL}/images/default-open-graph.png`,
    sameAs: [
      "https://www.facebook.com/your-facebook-page",
      "https://twitter.com/your-twitter-handle",
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
    <MotionMain
      className="flex flex-col items-center px-4"
      {...staggerContainer}
    >
      <MotionHeading
        className="mt-8 mb-6 text-3xl font-bold"
        {...headerAnimation}
      >
        Philosophers
      </MotionHeading>

      <MotionParagraph
        className="text-muted-foreground mb-8 text-center text-lg"
        {...subHeaderAnimation}
      >
        Explore our collection of philosophers and their ideas.
      </MotionParagraph>

      <Suspense fallback={<div>Loading filters...</div>}>
        <PhilosophersFilter />
      </Suspense>

      <PhilosopherList philosophers={philosophers} isLoggedIn={false} />

      <Script
        id="schema-org-philosophers"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrg),
        }}
      />
    </MotionMain>
  );
}
