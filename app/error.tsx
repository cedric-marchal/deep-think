"use client";

import { env } from "@/src/lib/env";
import { HomeIcon, RefreshCcw } from "lucide-react";

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

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Something went wrong
          </CardTitle>
          <CardDescription>
            We&apos;re sorry, but we encountered an unexpected problem
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 pt-6">
          <p className="text-muted-foreground text-center">
            The application has encountered an error. Please try refreshing the
            page or return to the home page.
          </p>
          {error.digest && (
            <p className="text-muted-foreground text-center text-xs">
              Reference code: {error.digest}
            </p>
          )}
          <div className="bg-muted/50 text-muted-foreground rounded-md p-3 text-sm">
            <p className="text-center">
              If this problem persists, please contact our support team at{" "}
              <Link
                href={`mailto:${env.NEXT_PUBLIC_SUPPORT_EMAIL}?subject=Error%20Reference:%20${error.digest || "Unknown"}`}
                className="hover:text-primary font-medium underline underline-offset-4"
              >
                {env.NEXT_PUBLIC_SUPPORT_EMAIL}
              </Link>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => reset()}
            className="gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Try again
          </Button>
          <Button variant="default" size="lg" asChild className="gap-2">
            <Link href="/">
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
