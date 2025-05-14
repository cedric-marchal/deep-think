import { SidebarProvider } from "@/src/components/ui/sidebar";
import { ProtectedSidebar } from "./_components/protected-sidebar";

import { getCurrentSession } from "@/src/lib/auth-session";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const currentSession = await getCurrentSession();

  if (!currentSession) {
    redirect("/sign-in");
  }

  const chats = await prisma.chat.findMany({
    where: {
      userId: currentSession.user.id,
    },
    include: {
      philosopher: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-full w-full">
        <ProtectedSidebar chats={chats} />
        <div className="flex-1 overflow-auto px-8">{children}</div>
      </div>
    </SidebarProvider>
  );
}
