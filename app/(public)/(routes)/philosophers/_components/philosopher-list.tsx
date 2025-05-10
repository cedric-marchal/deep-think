import type { Philosopher } from "@/prisma/generated/prisma";
import { PhilosopherCard } from "./philosopher-card";

// Import motion components
import {
  emptyStateAnimation,
  gridAnimation,
  staggerContainer,
} from "./animations";
import {
  MotionDiv,
  MotionHeading2,
  MotionParagraph,
  MotionSection,
} from "./motion-components";

type PhilosopherListProps = {
  philosophers: Philosopher[];
  isLoggedIn: boolean;
};

export const PhilosopherList = ({
  philosophers,
  isLoggedIn,
}: PhilosopherListProps) => {
  if (philosophers.length === 0) {
    return (
      <MotionDiv className="w-full py-12 text-center" {...emptyStateAnimation}>
        <MotionHeading2
          className="mb-2 text-xl font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          No philosophers found
        </MotionHeading2>
        <MotionParagraph
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Try adjusting your filters to find what you're looking for.
        </MotionParagraph>
      </MotionDiv>
    );
  }

  return (
    <MotionSection
      className="flex w-full flex-col items-center"
      {...staggerContainer}
    >
      <MotionDiv
        className="mx-auto flex w-full max-w-7xl flex-wrap justify-center gap-6"
        {...gridAnimation}
      >
        {philosophers.map((philosopher: Philosopher) => (
          <MotionDiv
            key={philosopher.id}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", damping: 15, stiffness: 50 }}
          >
            <PhilosopherCard
              imageUrl={philosopher.imageUrl}
              name={philosopher.name}
              slug={philosopher.slug}
              description={philosopher.description}
              era={philosopher.era}
              isLoggedIn={isLoggedIn}
            />
          </MotionDiv>
        ))}
      </MotionDiv>
    </MotionSection>
  );
};
