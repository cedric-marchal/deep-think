import { getUserSession } from "@/src/lib/auth-session";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";

import type { ReactNode } from "react";

export default async function PublicLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const userSession = await getUserSession();

  return (
    <div className="flex min-h-screen flex-col">
      <Header userSession={userSession} />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
