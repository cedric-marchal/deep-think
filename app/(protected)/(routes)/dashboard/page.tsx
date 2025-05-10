import { env } from "@/src/lib/env";

import type { Metadata } from "next";

import { ChatInterface } from "./_components/chat-interface";
import { PhilosopherSelector } from "./_components/philosopher-selector";

export const metadata: Metadata = {
  title: `Dashboard | ${env.NEXT_PUBLIC_APP_NAME}`,
};

export default async function DashboardPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <PhilosopherSelector />
        <ChatInterface />
      </div>
    </div>
  );
}
