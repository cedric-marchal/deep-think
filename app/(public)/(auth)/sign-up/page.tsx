import { env } from "@/src/lib/env";

import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";

import Script from "next/script";

import { SignUpForm } from "@/src/components/public/auth/sign-up/sign-up-form";
import { redirectIfAuthenticated } from "@/src/lib/auth/redirect-if-authenticated";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: `Sign up | ${env.NEXT_PUBLIC_APP_NAME}`,
  description:
    "Create your account and access all our features to help you move to Switzerland.",
  keywords: ["sign up", "account", "features"],
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/sign-up`,
  },
  openGraph: {
    title: `Sign up | ${env.NEXT_PUBLIC_APP_NAME}`,
    description:
      "Create your account and access all our features to help you move to Switzerland.",
    url: `${env.NEXT_PUBLIC_BASE_URL}/sign-up`,
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
    title: `Sign up | ${env.NEXT_PUBLIC_APP_NAME}`,
    description:
      "Create your account and access all our features to help you move to Switzerland.",
    images: {
      url: "/images/default-open-graph.png",
      width: 1200,
      height: 630,
      alt: `Default Open Graph image for ${env.NEXT_PUBLIC_APP_NAME}`,
    },
  },
};

export default async function SignUpPage() {
  await redirectIfAuthenticated();

  const schemaOrg: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Sign up | ${env.NEXT_PUBLIC_APP_NAME}`,
    description:
      "Create your account and access all our features to help you move to Switzerland.",
    url: `${env.NEXT_PUBLIC_BASE_URL}/sign-up`,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: env.NEXT_PUBLIC_APP_NAME,
      applicationCategory: "WebApplication",
      offers: {
        "@type": "Offer",
        name: "Create account",
        description:
          "Sign up to access all our features to help you move to Switzerland.",
      },
    },
  };

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <SignUpForm />

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
