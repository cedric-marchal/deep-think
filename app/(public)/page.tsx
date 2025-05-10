import { env } from "@/src/lib/env";

import type { Metadata } from "next";
import type { WebSite } from "schema-dts";

import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: `Home | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: "description",
  keywords: ["keywords"],
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/`,
  },
  openGraph: {
    title: `Home | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: "description",
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
    title: `Home | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: "description",
    images: {
      url: "/images/default-open-graph.png",
      width: 1200,
      height: 630,
      alt: `Default Open Graph image for ${env.NEXT_PUBLIC_APP_NAME}`,
    },
  },
};

export default function HomePage() {
  //main();

  const schemaOrg: WebSite = {
    "@type": "WebSite",
    name: env.NEXT_PUBLIC_APP_NAME,
    url: env.NEXT_PUBLIC_BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${env.NEXT_PUBLIC_BASE_URL}/search?q={search_term_string}`,
    },
    description: "description",
    headline: "Home", // TODO: add title
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
    <main className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <h1>Hello World</h1>

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
