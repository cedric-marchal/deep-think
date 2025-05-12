"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const philosophers = [
  {
    id: "socrates",
    name: "Socrates",
    imageUrl: "/images/philosophers/socrates.jpg",
  },
  {
    id: "plato",
    name: "Plato",
    imageUrl: "/images/philosophers/plato.jpg",
  },
  {
    id: "aristotle",
    name: "Aristotle",
    imageUrl: "/images/philosophers/aristotle.jpg",
  },
  {
    id: "nietzsche",
    name: "Friedrich Nietzsche",
    imageUrl: "/images/philosophers/nietzsche.jpg",
  },
  {
    id: "kant",
    name: "Immanuel Kant",
    imageUrl: "/images/philosophers/kant.jpg",
  },
];

export const PhilosopherSelector = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    router.push(`/chat/${id}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose a Philosopher</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {philosophers.map((philosopher) => (
            <button
              key={philosopher.id}
              type="button"
              onClick={() => handleSelect(philosopher.id)}
              className={`hover:bg-muted/50 flex w-full items-center gap-3 p-3 text-left transition ${
                selectedId === philosopher.id ? "bg-muted" : ""
              }`}
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={philosopher.imageUrl}
                  alt={philosopher.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <span>{philosopher.name}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
