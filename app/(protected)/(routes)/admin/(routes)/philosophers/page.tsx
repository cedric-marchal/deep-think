import { env } from "@/src/lib/env";

import type { Metadata } from "next";

import { prisma } from "@/src/lib/prisma";

import { ManagePhilosophers } from "./_components/manage-philosophers";

export const metadata: Metadata = {
  title: `Admin | ${env.NEXT_PUBLIC_APP_NAME}`,
};

export default async function AdminPage() {
  const philosophers = await prisma.philosopher.findMany();

  return (
    <main className="container py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">Admin Dashboard</h1>

      <div className="flex flex-col gap-4">
        <ManagePhilosophers philosophers={philosophers} />
      </div>
    </main>
  );
}
