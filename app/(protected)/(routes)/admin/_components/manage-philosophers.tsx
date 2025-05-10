"use client";

import type { Philosopher } from "@/prisma/generated/prisma";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Textarea } from "@/src/components/ui/textarea";
import { Pencil, PlusCircle, Trash } from "lucide-react";
import { type FormEvent, useState } from "react";

export const ManagePhilosophers = () => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [philosophers, setPhilosophers] = useState<Philosopher[]>([
    {
      id: "socrates",
      slug: "socrates",
      name: "Socrates",
      era: "Classical Greece",
      imageUrl: "/images/philosophers/socrates.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      description:
        "Known for the Socratic method and his contributions to Western philosophy.",
    },
    {
      id: "plato",
      slug: "plato",
      name: "Plato",
      era: "Classical Greece",
      imageUrl: "/images/philosophers/plato.jpg",
      createdAt: new Date(),
      updatedAt: new Date(),
      description:
        "Founder of the Academy in Athens. His writings explored justice, beauty, equality.",
    },
  ]);

  const handleAddNew = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implementation would go here
    setIsAddingNew(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Philosophers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Era</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {philosophers.map((philosopher: Philosopher) => (
              <TableRow key={philosopher.id}>
                <TableCell className="font-medium">
                  {philosopher.name}
                </TableCell>
                <TableCell>{philosopher.era}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" type="button">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" type="button">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {isAddingNew ? (
          <form onSubmit={handleAddNew} className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Philosopher name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="era">Era</Label>
              <Input id="era" name="era" placeholder="Historical era" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Brief description"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">Save</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddingNew(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button
            onClick={() => setIsAddingNew(true)}
            className="w-full"
            type="button"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Philosopher
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
