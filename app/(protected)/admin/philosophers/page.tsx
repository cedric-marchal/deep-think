import { env } from "@/src/lib/env";

import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";

import { requireAdmin } from "@/src/lib/auth/require-admin";

export const metadata: Metadata = {
  title: `Admin | ${env.NEXT_PUBLIC_APP_NAME}`,
};

type AdminPageProps = {
  params: Promise<Record<string, string>>;
  searchParams: Promise<SearchParams>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  await requireAdmin();

  return (
    <main className="container py-8">
      <h1 className="mb-6 text-center text-3xl font-bold">Admin Dashboard</h1>

      <div className="flex flex-col gap-4">
        <Suspense fallback={<div>Loading filters...</div>}></Suspense>
      </div>
    </main>
  );
}
