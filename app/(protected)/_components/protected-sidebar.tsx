"use client";

import {
  BookOpen,
  LayoutDashboardIcon,
  SidebarIcon,
  User2,
} from "lucide-react";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

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
import { signOut } from "@/src/lib/auth-client";

type NavigationItem = {
  title: string;
  href: string;
  icon: ElementType;
};

export const ProtectedSidebar = () => {
  const router = useRouter();

  const pathname = usePathname();

  const { toggleSidebar } = useSidebar();

  const adminItems: NavigationItem[] = [
    {
      title: "Philosophers",
      href: "/admin/philosophers",
      icon: BookOpen,
    },
  ];

  const dashboardItems: NavigationItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboardIcon,
    },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

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
            Admin
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item: NavigationItem) => (
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
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item: NavigationItem) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton type="button" asChild>
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
      </SidebarContent>

      <SidebarFooter className="mt-auto border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton type="button" onClick={handleSignOut}>
              <User2 className="h-4 w-4" />
              <span>Profil</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
