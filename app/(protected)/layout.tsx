import { SidebarProvider } from "@/src/components/ui/sidebar";
import { ProtectedSidebar } from "./_components/protected-sidebar";

import type { ReactNode } from "react";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-full w-full">
        <ProtectedSidebar />
        <div className="flex-1 overflow-auto p-4">{children}</div>
      </div>
    </SidebarProvider>
  );
}
