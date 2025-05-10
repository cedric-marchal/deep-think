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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { getPhilosophicalEra } from "@/src/utils/enum/get-philosophical-era";
import { Pencil } from "lucide-react";
import { AddPhilosopherModal } from "./modals/add-philosopher-modal";
import { DeletePhilosopherModal } from "./modals/delete-philosopher-modal";

type ManagePhilosophersProps = {
  philosophers: Philosopher[];
};

export const ManagePhilosophers = ({
  philosophers,
}: ManagePhilosophersProps) => {
  return (
    <section>
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
                  <TableCell>{getPhilosophicalEra(philosopher.era)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" type="button">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <DeletePhilosopherModal philosopher={philosopher} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <AddPhilosopherModal />
        </CardFooter>
      </Card>
    </section>
  );
};
