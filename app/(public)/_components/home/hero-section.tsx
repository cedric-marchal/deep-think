"use client";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="from-background via-background to-background/80 flex w-full flex-col items-center bg-gradient-to-b px-4 py-20 text-center md:py-32">
      <Badge className="mb-4">Now Available</Badge>
      <h1 className="mb-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Chat with History&apos;s Greatest{" "}
        <span className="text-primary">Philosophical Minds</span>
      </h1>
      <p className="text-muted-foreground mb-8 max-w-2xl text-lg">
        Engage with Socrates, Kant, Nietzsche, and many more. Explore profound
        ideas and gain new perspectives through natural conversations powered by
        AI.
      </p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Button asChild size="lg" type="button">
          <Link href="/sign-up">Get Started</Link>
        </Button>
        <Button asChild size="lg" variant="outline" type="button">
          <Link href="/philosophers">Explore Philosophers</Link>
        </Button>
      </div>
    </section>
  );
};
