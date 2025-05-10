import { env } from "@/src/lib/env";

import type { Metadata } from "next";

import { ManagePhilosophers } from "./_components/manage-philosophers";
import { ManageUsers } from "./_components/manage-users";

export const metadata: Metadata = {
  title: `Admin | ${env.NEXT_PUBLIC_APP_NAME}`,
};

export default async function AdminPage() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <ManagePhilosophers />
        <ManageUsers />
      </div>
    </div>
  );
}
