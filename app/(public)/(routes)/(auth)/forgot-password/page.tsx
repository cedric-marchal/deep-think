import { env } from "@/src/lib/env";

import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";

import Script from "next/script";

import { getUserSession } from "@/src/lib/auth-session";
import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "./_components/forgot-password-form";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: `Forgot password | ${env.NEXT_PUBLIC_APP_NAME}`,
  description:
    "Reset your password to regain access to your account and all our features.",
  keywords: ["forgot password", "reset", "account"],
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/forgot-password`,
  },
  openGraph: {
    title: `Forgot password | ${env.NEXT_PUBLIC_APP_NAME}`,
    description:
      "Reset your password to regain access to your account and all our features.",
    url: `${env.NEXT_PUBLIC_BASE_URL}/forgot-password`,
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
    title: `Forgot password | ${env.NEXT_PUBLIC_APP_NAME}`,
    description:
      "Reset your password to regain access to your account and all our features.",
    images: {
      url: "/images/default-open-graph.png",
      width: 1200,
      height: 630,
      alt: `Default Open Graph image for ${env.NEXT_PUBLIC_APP_NAME}`,
    },
  },
};

export default async function ForgotPasswordPage() {
  const userSession = await getUserSession();

  if (userSession) {
    redirect("/dashboard/chat");
  }

  const schemaOrg: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Forgot password | ${env.NEXT_PUBLIC_APP_NAME}`,
    description:
      "Reset your password to regain access to your account and all our features.",
    url: `${env.NEXT_PUBLIC_BASE_URL}/forgot-password`,
    mainEntity: {
      "@type": "WebContent",
      name: "Forgot password form",
      description: "Use this form to reset your password",
    },
  };

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <ForgotPasswordForm />

        <Script
          id="schema-org-forgot-password"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrg),
          }}
        />
      </div>
    </main>
  );
}
