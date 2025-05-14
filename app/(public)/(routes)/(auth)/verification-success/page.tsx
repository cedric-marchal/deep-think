import { env } from "@/src/lib/env";
import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import type { WebPage, WithContext } from "schema-dts";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { getCurrentSession } from "@/src/lib/auth-session";
import { CheckCircle2 } from "lucide-react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: `Email Verified | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: "Your email has been successfully verified",
  alternates: {
    canonical: `${env.NEXT_PUBLIC_BASE_URL}/verification-success`,
  },
};

export default async function VerificationSuccessPage({
  searchParams,
}: {
  searchParams: { token?: string };
}) {
  const currentSession = await getCurrentSession();

  if (!currentSession || !searchParams.token) {
    redirect("/sign-in");
  }

  const schemaOrg: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Email Verified | ${env.NEXT_PUBLIC_APP_NAME}`,
    description: "Your email has been successfully verified",
    url: `${env.NEXT_PUBLIC_BASE_URL}/verification-success`,
  };

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <section className="mx-auto w-full max-w-md">
          <Card className="border-border shadow-lg">
            <CardHeader className="flex flex-col items-center space-y-2">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-7 w-7 text-green-600" />
              </div>
              <CardTitle className="text-center text-2xl font-bold">
                Email Verified
              </CardTitle>
              <CardDescription className="text-muted-foreground text-center">
                Your email has been successfully verified
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="mb-6 text-center text-sm text-gray-600">
                You can now access all features of your account.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Button asChild>
                <Link href="/dashboard">Continue to dashboard</Link>
              </Button>
            </CardFooter>
          </Card>
        </section>

        <Script
          id="schema-org-verification"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaOrg),
          }}
        />
      </div>
    </main>
  );
}
