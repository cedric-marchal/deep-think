import { Footer } from "@/src/components/public/footer";
import { Header } from "@/src/components/public/header";
import { getCurrentSession } from "@/src/lib/auth-session";

import type { ReactNode } from "react";

export default async function PublicLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const currentSession = await getCurrentSession();

  return (
    <div className="flex min-h-screen flex-col">
      <Header currentSession={currentSession} />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
