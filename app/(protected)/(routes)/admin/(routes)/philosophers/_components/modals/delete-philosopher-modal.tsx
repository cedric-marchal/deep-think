"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

import type { Philosopher } from "@/prisma/generated/prisma";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

type DeletePhilosopherModalProps = {
  philosopher: Philosopher;
};

export const DeletePhilosopherModal = ({
  philosopher,
}: DeletePhilosopherModalProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch(`/api/philosophers/${philosopher.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        return toast.error(data.message || "Failed to delete philosopher");
      }

      toast.success("Philosopher deleted successfully");
      setIsOpen(false);

      router.refresh();
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (isLoading) {
      return;
    }

    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" type="button">
          <Trash className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Philosopher</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {philosopher.name}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete Philosopher"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
