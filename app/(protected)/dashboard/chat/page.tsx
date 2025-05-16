import { env } from "@/src/lib/env";

import type { Metadata } from "next";

import { PhilosopherSelect } from "@/src/components/protected/dashboard/chat/philosopher-select";
import { requireActiveSubscription } from "@/src/lib/auth/require-subscription";
import { prisma } from "@/src/lib/prisma";

export const metadata: Metadata = {
  title: `Chat with Philosophers | ${env.NEXT_PUBLIC_APP_NAME}`,
};

export default async function SelectPhilosopherPage() {
  await requireActiveSubscription();

  const philosophers = await prisma.philosopher.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      description: true,
      era: true,
      slug: true,
    },
  });

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-[1fr]">
        <PhilosopherSelect philosophers={philosophers} />
      </div>
    </div>
  );
}
