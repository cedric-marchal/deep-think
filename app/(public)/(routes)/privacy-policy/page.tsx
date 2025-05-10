import { env } from "@/src/lib/env";

import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";

import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: `Privacy Policy | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: "Privacy Policy for the app.",
  keywords: ["privacy", "policy"],
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/privacy-policy`,
  },
  openGraph: {
    title: `Privacy Policy | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: "Privacy Policy for the app.",
    url: `${env.NEXT_PUBLIC_BASE_URL}/privacy-policy`,
    siteName: env.NEXT_PUBLIC_APP_NAME,
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
    title: `Privacy Policy | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: "Privacy Policy for the app.",
    images: {
      url: "/images/default-open-graph.png",
      width: 1200,
      height: 630,
      alt: `Default Open Graph image for ${env.NEXT_PUBLIC_APP_NAME}`,
    },
  },
};

export default function SignUpPage() {
  const schemaOrg: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Privacy Policy | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: "Privacy Policy for the app.",
    url: `${env.NEXT_PUBLIC_BASE_URL}/privacy-policy`,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: env.NEXT_PUBLIC_APP_NAME,
      applicationCategory: "WebApplication",
      offers: {
        "@type": "Offer",
        name: "Create account",
        description: "Privacy Policy for the app.",
      },
    },
  };

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
      </div>

      <Script
        id="schema-org-signup"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaOrg),
        }}
      />
    </main>
  );
}
