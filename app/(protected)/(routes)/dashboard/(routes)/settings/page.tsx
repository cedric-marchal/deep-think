import { env } from "@/src/lib/env";

import type { Metadata } from "next";

import { requireUser } from "@/src/lib/auth/require-user";

export const metadata: Metadata = {
  title: `Settings | ${env.NEXT_PUBLIC_APP_NAME}`,
  description: "Manage your account settings and preferences",
};

export default async function SettingsPage() {
  const { user } = await requireUser();

  return (
    <main className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>
    </main>
  );
}
