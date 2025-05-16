"use client";

import {
  Bell,
  BookOpen,
  CreditCard,
  Edit,
  LogOut,
  MessageCircleIcon,
  MoreHorizontal,
  Plus,
  Settings,
  SidebarIcon,
  Trash2,
  User2,
} from "lucide-react";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

import type { ElementType, FormEvent } from "react";
import { useEffect, useState } from "react";

import { Chat, Philosopher } from "@/prisma/generated/prisma";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { ScrollArea } from "@/src/components/ui/scroll-area";
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
import { truncateString } from "@/src/utils/string/truncate-string";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

type NavigationItem = {
  title: string;
  href: string;
  icon: ElementType;
};

type ProtectedSidebarProps = {
  chats: (Chat & {
    philosopher: Philosopher;
  })[];
};

export const ProtectedSidebar = ({ chats }: ProtectedSidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { toggleSidebar } = useSidebar();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string>("");
  const [newChatName, setNewChatName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [sidebarState, setSidebarState] = useState<"expanded" | "collapsed">(
    "expanded",
  );

  useEffect(() => {
    const sidebarElement = document.querySelector('[data-slot="sidebar"]');
    if (!sidebarElement) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-state"
        ) {
          const state = sidebarElement.getAttribute("data-state") as
            | "expanded"
            | "collapsed";
          setSidebarState(state);
        }
      });
    });

    observer.observe(sidebarElement, { attributes: true });

    setSidebarState(
      (sidebarElement.getAttribute("data-state") as "expanded" | "collapsed") ||
        "expanded",
    );

    return () => observer.disconnect();
  }, []);

  const adminItems: NavigationItem[] = [
    {
      title: "Philosophers",
      href: "/admin/philosophers",
      icon: BookOpen,
    },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  const handleOpenEditDialog = (chat: Chat) => {
    setCurrentChatId(chat.id);
    setNewChatName(chat.name);
    setIsDialogOpen(true);
  };

  const handleOpenDeleteDialog = (chat: Chat) => {
    setCurrentChatId(chat.id);
    setIsDeleteDialogOpen(true);
  };

  const handleUpdateChatName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentChatId) {
      return toast.error("No chat selected");
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData(event.currentTarget);

      const response = await fetch(`/api/chats/${currentChatId}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        return toast.error(data.message);
      }

      toast.success("Chat updated successfully");

      router.refresh();
      setIsDialogOpen(false);
    } catch (error: unknown) {
      console.error("Error updating chat name:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteChat = async () => {
    if (!currentChatId) {
      return toast.error("No chat selected");
    }

    try {
      setIsDeleting(true);

      const response = await fetch(`/api/chats/${currentChatId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        return toast.error(data.message || "Failed to delete chat");
      }

      toast.success("Chat deleted successfully");
      router.refresh();
      setIsDeleteDialogOpen(false);
    } catch (error: unknown) {
      console.error("Error deleting chat:", error);
      toast.error("An error occurred while deleting the chat");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
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
              <SidebarMenu className="space-y-1">
                {adminItems.map((item: NavigationItem) => (
                  <SidebarMenuItem key={item.href} className="h-9">
                    <SidebarMenuButton
                      type="button"
                      asChild
                      isActive={pathname === item.href}
                      className="h-full"
                    >
                      <Link
                        href={item.href}
                        className="flex h-full items-center"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <ScrollArea className="h-[calc(100vh-10rem)] pb-4">
            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="px-2 py-1.5">
                Chats
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu className="space-y-1">
                  <SidebarMenuItem className="h-9">
                    <SidebarMenuButton type="button" asChild className="h-full">
                      <Link
                        href="/dashboard/chat"
                        className="flex h-full items-center"
                      >
                        <Plus className="h-4 w-4" />
                        <span>New chat</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>

                  <Separator />

                  {chats.map((chat: Chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton
                        type="button"
                        tooltip={chat.name}
                        asChild
                        className="h-full flex-1"
                      >
                        <div
                          className={`flex h-full items-center ${sidebarState === "collapsed" ? "justify-center" : "justify-between gap-2"}`}
                        >
                          <Link
                            href={`/dashboard/chat/${chat.id}`}
                            className={`flex h-full items-center ${sidebarState === "collapsed" ? "w-auto justify-center" : "w-full"}`}
                          >
                            <MessageCircleIcon
                              className={
                                sidebarState === "collapsed"
                                  ? "h-4 w-4"
                                  : "mr-2 h-4 w-4"
                              }
                            />
                            <span
                              className={
                                sidebarState === "collapsed" ? "hidden" : ""
                              }
                            >
                              {truncateString(chat.name, 15)}
                            </span>
                          </Link>

                          {sidebarState !== "collapsed" && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="size-7 cursor-pointer"
                                >
                                  <MoreHorizontal className="h-3.5 w-3.5" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => handleOpenEditDialog(chat)}
                                >
                                  <Edit className="mr-2 h-3.5 w-3.5" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleOpenDeleteDialog(chat)}
                                >
                                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </ScrollArea>
        </SidebarContent>

        <SidebarFooter className="mt-auto border-t">
          <SidebarMenu className="space-y-1">
            <SidebarMenuItem className="h-9">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    type="button"
                    className="flex h-full w-full items-center"
                  >
                    <User2 className="h-4 w-4" />
                    <span
                      className={sidebarState === "collapsed" ? "hidden" : ""}
                    >
                      Profile
                    </span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="#" className="flex items-center">
                      <User2 className="mr-2 h-4 w-4" />
                      <span>Account</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/billing"
                      className="flex items-center"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="#" className="flex items-center">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="text-destructive mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update chat name</DialogTitle>
            <DialogDescription>
              Enter a new name for this chat.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleUpdateChatName}>
            <div className="mt-4 space-y-4">
              <Input
                id="chatName"
                name="chatName"
                defaultValue={newChatName}
                placeholder="New chat name"
                className="w-full"
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete chat</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this chat? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel type="button" disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              type="button"
              onClick={handleDeleteChat}
              disabled={isDeleting}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
