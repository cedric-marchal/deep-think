import type { Philosopher } from "@/prisma/generated/prisma";
import { PhilosopherCard } from "./philosopher-card";

type PhilosopherListProps = {
  philosophers: Philosopher[];
};

export const PhilosopherList = ({ philosophers }: PhilosopherListProps) => {
  return (
    <section className="flex flex-col items-center">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap justify-center gap-6">
        {philosophers.map((philosopher: Philosopher) => (
          <div
            key={philosopher.id}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <PhilosopherCard
              imageUrl={philosopher.imageUrl}
              name={philosopher.name}
              slug={philosopher.slug}
              description={philosopher.description}
              era={philosopher.era}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
