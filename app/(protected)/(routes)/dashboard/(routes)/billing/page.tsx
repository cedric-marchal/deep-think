import { env } from "@/src/lib/env";

import type { Metadata } from "next";

import { requireUser } from "@/src/lib/auth/require-user";

export const metadata: Metadata = {
  title: `Chat with Philosophers | ${env.NEXT_PUBLIC_APP_NAME}`,
};

export default async function SelectPhilosopherPage() {
  const { user } = await requireUser();

  return (
    <main className="container py-8">
      <div className="grid gap-8 md:grid-cols-[1fr]">
        <h1 className="text-2xl font-bold">Billing</h1>
      </div>
    </main>
  );
}
