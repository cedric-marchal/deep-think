import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export const CtaSection = () => {
  return (
    <section className="bg-primary text-primary-foreground w-full py-16">
      <section className="bg-primary text-primary-foreground w-full py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Start Your Philosophical Journey Today
          </h2>
          <p className="text-primary-foreground/90 mx-auto mb-8 max-w-2xl text-lg">
            Join thousands of students, professors, and curious minds exploring
            the great philosophical ideas of history.
          </p>
          <Button asChild size="lg" variant="secondary" type="button">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </section>
    </section>
  );
};
