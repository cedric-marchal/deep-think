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

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-background">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Something went wrong
              </CardTitle>
              <CardDescription>
                We're sorry, but we encountered a critical problem
              </CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="space-y-4 pt-6">
              <p className="text-muted-foreground text-center">
                The application is currently unable to respond properly. We are
                aware of this issue and working to resolve it.
              </p>
              {error.digest && (
                <p className="text-muted-foreground text-center text-xs">
                  Reference code: {error.digest}
                </p>
              )}
              <div className="bg-muted/50 text-muted-foreground rounded-md p-3 text-sm">
                <p className="text-center">
                  Please contact our support team at{" "}
                  <Link
                    href={`mailto:${env.NEXT_PUBLIC_SUPPORT_EMAIL}?subject=Critical%20Error%20Reference:%20${error.digest || "Unknown"}`}
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
        </div>
      </body>
    </html>
  );
}
