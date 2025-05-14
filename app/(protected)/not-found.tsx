import { env } from "@/src/lib/env";

import { HomeIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";

export const metadata: Metadata = {
  title: `404 - Not Found | ${env.NEXT_PUBLIC_APP_NAME}`,
};

export default function ProtectedNotFoundPage() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            404 - Page not found
          </CardTitle>
          <CardDescription>
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 pt-6">
          <p className="text-muted-foreground text-center">
            We couldn&apos;t find the page you were looking for. Please check
            the URL and try again, or return to the home page.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="default" size="lg" asChild className="gap-2">
            <Link href="/dashboard/settings">
              <HomeIcon className="h-4 w-4" />
              Return to dashboard
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
