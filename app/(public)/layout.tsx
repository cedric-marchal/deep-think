import { getCurrentSession } from "@/src/lib/auth-session";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

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
