"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function PhilosopherError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Error Loading Philosopher
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Sorry, we couldn't load the philosopher you were looking for. This
            might be due to a temporary issue or the philosopher might not exist
            in our database.
          </p>
          <div className="mt-2 rounded-md bg-red-100 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-300">
            <p className="text-sm">
              Error details: {error.message || "Unknown error"}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
          <Button
            variant="outline"
            onClick={() => reset()}
            className="w-full justify-center gap-2 sm:w-auto"
            type="button"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Button
            asChild
            className="w-full justify-center gap-2 sm:w-auto"
            type="button"
          >
            <Link href="/philosophers">
              <ArrowLeft className="h-4 w-4" />
              Return to Philosophers
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
