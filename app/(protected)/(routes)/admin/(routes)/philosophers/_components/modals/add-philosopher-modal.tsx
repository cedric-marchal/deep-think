"use client";

import { PlusCircle } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

import { PhilosophicalEra } from "@/prisma/generated/prisma";
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
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { getPhilosophicalEra } from "@/src/utils/enum/get-philosophical-era";
import { useRouter } from "next/navigation";

export const AddPhilosopherModal = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData(event.currentTarget);

      const response = await fetch("/api/philosophers", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        return toast.error(data.message || "Failed to create philosopher");
      }

      toast.success("Philosopher created successfully");
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
        <Button className="w-full" type="button">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Philosopher
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Philosopher</DialogTitle>
          <DialogDescription>
            Enter the details of the philosopher you want to add. All fields are
            required.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="imageUrl">
              Image URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              placeholder="URL to philosopher's image"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Philosopher name"
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description of the philosopher and their contributions"
              className="min-h-[100px] break-words whitespace-pre-wrap"
              required
              disabled={isLoading}
              maxLength={2000}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="era">
              Era <span className="text-red-500">*</span>
            </Label>
            <Select required name="era" disabled={isLoading}>
              <SelectTrigger id="era">
                <SelectValue placeholder="Select a philosophical era" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PhilosophicalEra).map(
                  (era: PhilosophicalEra) => (
                    <SelectItem key={era} value={era}>
                      {getPhilosophicalEra(era)}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Philosopher"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
