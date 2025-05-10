"use client";

import {
  BookMarkedIcon,
  LayoutDashboardIcon,
  Settings,
  SidebarIcon,
  User2,
} from "lucide-react";

import Link from "next/link";

import { usePathname } from "next/navigation";

import type { ElementType } from "react";

import { Separator } from "@/src/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/src/components/ui/sidebar";

type NavigationItem = {
  title: string;
  href: string;
  icon: ElementType;
};

const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Admin",
    href: "/admin",
    icon: Settings,
  },
];

export const ProtectedSidebar = () => {
  const pathname = usePathname();

  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar side="left" collapsible="icon" className="h-screen border-r">
      <SidebarHeader className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              onClick={toggleSidebar}
              className="flex w-full cursor-pointer justify-center"
            >
              <SidebarIcon className="h-4 w-4" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 py-1.5 group-data-[state=collapsed]:hidden">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item: NavigationItem) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    type="button"
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-2 py-1.5">
            Ressources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton type="button" asChild>
                  <Link
                    href="https://ui.shadcn.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BookMarkedIcon className="h-4 w-4" />
                    <span>Documentation</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton type="button" asChild>
              <Link href="/profile">
                <User2 className="h-4 w-4" />
                <span>Profil</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
