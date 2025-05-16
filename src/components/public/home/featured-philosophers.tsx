import Link from "next/link";

import type { Philosopher } from "@/prisma/generated/prisma";
import { Button } from "@/src/components/ui/button";

import { PhilosopherCard } from "@/src/components/public/philosophers/philosopher-card";

type FeaturedPhilosophersProps = {
  philosophers: Philosopher[];
};

export const FeaturedPhilosophers = ({
  philosophers,
}: FeaturedPhilosophersProps) => {
  return (
    <section className="w-full max-w-7xl px-4 py-16">
      <h2 className="mb-12 text-center text-3xl font-bold">
        Featured Philosophers
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {philosophers.map((philosopher: Philosopher) => (
          <PhilosopherCard
            key={philosopher.id}
            name={philosopher.name}
            imageUrl={philosopher.imageUrl}
            description={philosopher.description}
            era={philosopher.era}
            slug={philosopher.slug}
            isLoggedIn={false}
          />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button asChild variant="outline" type="button">
          <Link href="/philosophers">View All Philosophers</Link>
        </Button>
      </div>
    </section>
  );
};
