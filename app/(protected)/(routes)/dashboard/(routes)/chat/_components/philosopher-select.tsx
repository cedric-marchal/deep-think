"use client";

import type { PhilosophicalEra } from "@/prisma/generated/prisma";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { getPhilosophicalEra } from "@/src/utils/enum/get-philosophical-era";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Philosopher = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  slug: string;
  era: PhilosophicalEra;
};

type PhilosopherSelectProps = {
  philosophers: Philosopher[];
};

export const PhilosopherSelect = ({ philosophers }: PhilosopherSelectProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handlePhilosopherSelect = async (philosopherId: string) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("philosopherId", philosopherId);

    const response = await fetch("/api/chats", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();

      toast.error(data.message);
      return setIsLoading(false);
    }

    const data = await response.json();

    router.push(`/dashboard/chat/${data.id}`);

    router.refresh();

    setIsLoading(false);
  };

  return (
    <Card className="flex h-[600px] flex-col border-0 bg-[#0d0d0e] text-white">
      <CardContent className="flex h-full flex-col items-center justify-center p-6">
        <div className="flex w-full max-w-[400px] flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-2">
            <Avatar className="mb-4 h-20 w-20">
              <AvatarFallback>
                <MessageSquare className="h-10 w-10 text-white/70" />
              </AvatarFallback>
            </Avatar>
            <h2 className="text-center text-2xl font-medium">
              Select a philosopher to converse with
            </h2>
            <p className="text-center text-sm text-white/70">
              Each philosopher offers a unique perspective based on their
              philosophical traditions.
            </p>
          </div>
          <Select onValueChange={handlePhilosopherSelect} disabled={isLoading}>
            <SelectTrigger className="w-full border-white/20 bg-transparent text-white">
              <SelectValue placeholder="Choose a philosopher" />
            </SelectTrigger>
            <SelectContent className="border-white/20 bg-[#1a1a1a] text-white">
              {philosophers.map((philosopher) => (
                <SelectItem
                  key={philosopher.id}
                  value={philosopher.id}
                  className="hover:bg-white/10"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-4 w-4">
                      <AvatarImage
                        src={philosopher.imageUrl}
                        alt={philosopher.name}
                      />
                      <AvatarFallback>{philosopher.name[0]}</AvatarFallback>
                    </Avatar>
                    <span>{philosopher.name}</span>
                    <span className="text-xs text-white/60">
                      — {getPhilosophicalEra(philosopher.era)}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
