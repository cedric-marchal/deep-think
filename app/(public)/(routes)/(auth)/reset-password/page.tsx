import { env } from "@/src/lib/env";

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Script from "next/script";
import type { WebPage, WithContext } from "schema-dts";

import { getUserSession } from "@/src/lib/auth-session";
import { ResetPasswordForm } from "./_components/reset-password-form";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: `Reset password | ${env.NEXT_PUBLIC_APP_NAME}`,
  description:
    "Create a new password for your account and regain access to all features.",
  keywords: ["reset password", "account recovery", "security"],
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/reset-password`,
  },
  openGraph: {
    title: `Reset password | ${env.NEXT_PUBLIC_APP_NAME}`,
    description:
      "Create a new password for your account and regain access to all features.",
    url: `${env.NEXT_PUBLIC_BASE_URL}/reset-password`,
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
    title: `Reset password | ${env.NEXT_PUBLIC_APP_NAME}`,
    description:
      "Create a new password for your account and regain access to all features.",
    images: {
      url: "/images/default-open-graph.png",
      width: 1200,
      height: 630,
      alt: `Default Open Graph image for ${env.NEXT_PUBLIC_APP_NAME}`,
    },
  },
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const userSession = await getUserSession();

  if (userSession) {
    redirect("/dashboard");
  }

  const resolvedParams = await searchParams;

  if (!resolvedParams.token) {
    redirect("/forgot-password");
  }

  const schemaOrg: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Reset password | ${env.NEXT_PUBLIC_APP_NAME}`,
    description:
      "Create a new password for your account and regain access to all features.",
    url: `${env.NEXT_PUBLIC_BASE_URL}/reset-password`,
    mainEntity: {
      "@type": "WebContent",
      name: "Reset password form",
      description: "Use this form to set a new password for your account",
    },
  };

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <section className="mx-auto w-full max-w-md">
          <ResetPasswordForm token={resolvedParams.token} />
        </section>

        <Script
          id="schema-org-reset-password"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrg),
          }}
        />
      </div>
    </main>
  );
}
