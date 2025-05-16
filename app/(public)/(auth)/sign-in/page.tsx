import { env } from "@/src/lib/env";

import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";

import Script from "next/script";

import { SignInForm } from "@/src/components/public/auth/sign-in/sign-in-form";
import { redirectIfAuthenticated } from "@/src/lib/auth/redirect-if-authenticated";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: `Sign in | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: "Sign in to your account to access all our features",
  keywords: ["sign in", "account", "features", "login"],
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/sign-in`,
  },
  openGraph: {
    title: `Sign in | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: "Sign in to your account to access all our features",
    url: `${env.NEXT_PUBLIC_BASE_URL}/sign-in`,
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
    title: `Sign in | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: "Sign in to your account to access all our features",
    images: {
      url: "/images/default-open-graph.png",
      width: 1200,
      height: 630,
      alt: `Default Open Graph image for ${env.NEXT_PUBLIC_APP_NAME}`,
    },
  },
};

export default async function SignInPage() {
  await redirectIfAuthenticated();

  const schemaOrg: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Sign in | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: "Sign in to your account to access all our features",
    url: `${env.NEXT_PUBLIC_BASE_URL}/sign-in`,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: env.NEXT_PUBLIC_APP_NAME,
      applicationCategory: "WebApplication",
      offers: {
        "@type": "Offer",
        name: "Access to your account",
        description: "Sign in to your account to access all our features",
      },
    },
  };

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <SignInForm />

        <Script
          id="schema-org-login"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrg),
          }}
        />
      </div>
    </main>
  );
}
