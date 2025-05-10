import { env } from "@/src/lib/env";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Admin | ${env.NEXT_PUBLIC_APP_NAME}`,
};

export default function AdminPage() {
  return (
    <main>
      <h1>Admin</h1>
    </main>
  );
}
