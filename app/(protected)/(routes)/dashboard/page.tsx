import { env } from "@/src/lib/env";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard | ${env.NEXT_PUBLIC_APP_NAME}`,
};

export default function DashboardPage() {
  return (
    <main>
      <h1>Dashboard</h1>
    </main>
  );
}
