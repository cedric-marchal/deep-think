import { env } from "@/src/lib/env";

import { getUserSession } from "@/src/lib/auth-session";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import Script from "next/script";
import type { Person, WithContext } from "schema-dts";
import { PhilosopherDetails } from "./_components/philosopher-details";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const philosopher = await prisma.philosopher.findUnique({
    where: {
      slug,
    },
  });

  if (!philosopher) {
    return notFound();
  }

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
    title: `${philosopher.name} | ${env.NEXT_PUBLIC_APP_NAME}`,
    description:
      philosopher.description ||
      "Explore the ideas and theories of this influential philosopher. Chat to learn more about their philosophical contributions.",
    keywords: [
      "philosophy",
      philosopher.name,
      philosopher.era,
      "philosophy chat",
    ],
    alternates: {
      canonical: `${env.NEXT_PUBLIC_BASE_URL}/philosophers/${slug}`,
    },
    openGraph: {
      title: `${philosopher.name} | ${env.NEXT_PUBLIC_APP_NAME}`,
      description:
        philosopher.description ||
        "Explore the ideas and theories of this influential philosopher. Chat to learn more about their philosophical contributions.",
      siteName: env.NEXT_PUBLIC_APP_NAME,
      url: `${env.NEXT_PUBLIC_BASE_URL}/philosophers/${slug}`,
      images: [
        {
          url: "/images/default-open-graph.png",
          width: 1200,
          height: 630,
          alt: `${philosopher.name} - ${env.NEXT_PUBLIC_APP_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${philosopher.name} | ${env.NEXT_PUBLIC_APP_NAME}`,
      description:
        philosopher.description ||
        "Explore the ideas and theories of this influential philosopher. Chat to learn more about their philosophical contributions.",
      images: {
        url: "/images/default-open-graph.png",
        width: 1200,
        height: 630,
        alt: `${philosopher.name} - ${env.NEXT_PUBLIC_APP_NAME}`,
      },
    },
  };
}

export default async function PhilosopherPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const user = await getUserSession();
  const isLoggedIn = !!user;

  const philosopher = await prisma.philosopher.findUnique({
    where: {
      slug,
    },
  });

  if (!philosopher) {
    return notFound();
  }

  const birthDate = philosopher.birthDate.toISOString().split("T")[0];
  const deathDate = philosopher.deathDate
    ? philosopher.deathDate.toISOString().split("T")[0]
    : undefined;

  const schemaOrg: WithContext<Person> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: philosopher.name,
    description: philosopher.description,
    birthDate,
    deathDate,
    birthPlace: {
      "@type": "Place",
      name: philosopher.birthPlace,
    },
    deathPlace: philosopher.deathPlace
      ? {
          "@type": "Place",
          name: philosopher.deathPlace,
        }
      : undefined,
    image: philosopher.imageUrl,
    sameAs: [philosopher.wikipediaUrl],
    jobTitle: "Philosopher",
    knowsAbout: philosopher.mainIdeas,
    affiliation: {
      "@type": "Organization",
      name: philosopher.schoolOfThought,
    },
    nationality: philosopher.birthPlace.split(",").pop()?.trim(),
    additionalType: "Philosopher",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${env.NEXT_PUBLIC_BASE_URL}/philosophers/${philosopher.slug}`,
    },
    award: philosopher.notableWorks.join(", "),
    disambiguatingDescription:
      philosopher.quotes.length > 0
        ? `Quote: "${philosopher.quotes[0]}"`
        : undefined,
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <PhilosopherDetails
        id={philosopher.id}
        name={philosopher.name}
        slug={philosopher.slug}
        era={philosopher.era}
        imageUrl={philosopher.imageUrl}
        description={philosopher.description}
        birthDate={philosopher.birthDate}
        deathDate={philosopher.deathDate}
        birthPlace={philosopher.birthPlace}
        deathPlace={philosopher.deathPlace}
        schoolOfThought={philosopher.schoolOfThought}
        notableWorks={philosopher.notableWorks}
        mainIdeas={philosopher.mainIdeas}
        influences={philosopher.influences}
        influenced={philosopher.influenced}
        quotes={philosopher.quotes}
        wikipediaUrl={philosopher.wikipediaUrl}
        isLoggedIn={isLoggedIn}
      />

      <Script
        id="schema-org-philosopher"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrg),
        }}
      />
    </main>
  );
}
