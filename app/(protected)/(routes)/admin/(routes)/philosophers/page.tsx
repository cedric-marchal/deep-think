import { env } from "@/src/lib/env";

import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";

import type { PhilosophicalEra, Prisma } from "@/prisma/generated/prisma";
import { prisma } from "@/src/lib/prisma";

import { requireAdmin } from "@/src/lib/auth/require-admin";
import { ManagePhilosophers } from "./_components/manage-philosophers";
import { PhilosophersFilter } from "./_components/philosophers-filter";
import { philosophersCache } from "./search-params";

export const metadata: Metadata = {
  title: `Admin | ${env.NEXT_PUBLIC_APP_NAME}`,
};

type AdminPageProps = {
  params: Promise<Record<string, string>>;
  searchParams: Promise<SearchParams>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  await requireAdmin();

  // Parse search params using the cache
  await philosophersCache.parse(await searchParams);

  // Get filters directly from the cache
  const name = philosophersCache.get("name");
  const era = philosophersCache.get("era");

  // Build the database query based on filters
  const where: Prisma.PhilosopherWhereInput = {};

  if (name) {
    where.name = {
      contains: name,
      mode: "insensitive",
    };
  }

  if (era && era !== "all") {
    where.era = era as PhilosophicalEra;
  }

  console.log("Query filters:", { name, era });
  console.log("Prisma where clause:", where);

  // Execute the filtered query
  const philosophers = await prisma.philosopher.findMany({
    where,
    orderBy: { name: "asc" },
  });

  return (
    <main className="container py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">Admin Dashboard</h1>

      <div className="flex flex-col gap-4">
        <Suspense fallback={<div>Loading filters...</div>}>
          <PhilosophersFilter />
        </Suspense>
        <ManagePhilosophers philosophers={philosophers} />
      </div>
    </main>
  );
}
