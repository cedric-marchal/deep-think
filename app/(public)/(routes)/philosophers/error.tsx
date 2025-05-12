"use client";

import { Button } from "@/src/components/ui/button";

export default function PhilosophersError({
  error: _error, // eslint-disable-line @typescript-eslint/no-unused-vars
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[400px] flex-col items-center justify-center py-8 text-center">
      <h2 className="mb-4 text-2xl font-bold">Something went wrong</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        We encountered an error while loading the philosophers. Please try
        again.
      </p>
      <Button type="button" onClick={reset}>
        Try again
      </Button>
    </section>
  );
}
