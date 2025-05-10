"use client";

import { PhilosophicalEra } from "@/prisma/generated/prisma";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { philosopherFilterParams } from "@/src/utils/api/search-params";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import { useTransition } from "react";

export function PhilosophersFilter() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filters, setFilters] = useQueryStates(philosopherFilterParams, {
    shallow: false, // Ensure data is refreshed
    history: "push", // Push to history stack
    throttleMs: 300, // Throttle updates
  });

  // Handle name filter change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilters({ name: value || "" }).then(() => {
      startTransition(() => {
        router.refresh();
      });
    });
  };

  // Handle era filter addition
  const handleAddEra = (value: string) => {
    if (value === "ALL") {
      // Clear all eras
      setFilters({ eras: [] }).then(() => {
        startTransition(() => {
          router.refresh();
        });
      });
      return;
    }

    // Add era if not already included
    if (!filters.eras.includes(value)) {
      const newEras = [...filters.eras, value];
      setFilters({ eras: newEras }).then(() => {
        startTransition(() => {
          router.refresh();
        });
      });
    }
  };

  // Handle era filter removal
  const handleRemoveEra = (era: string) => {
    const newEras = filters.eras.filter((e) => e !== era);
    setFilters({ eras: newEras }).then(() => {
      startTransition(() => {
        router.refresh();
      });
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({ name: "", eras: [] }).then(() => {
      startTransition(() => {
        router.refresh();
      });
    });
  };

  const hasActiveFilters = filters.name || filters.eras.length > 0;

  return (
    <div className="mb-8 w-full max-w-7xl">
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="name-filter">Filter by Name</Label>
          <Input
            id="name-filter"
            placeholder="Search by name..."
            value={filters.name}
            onChange={handleNameChange}
            className="max-w-md"
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="era-filter">Filter by Era</Label>
          <Select onValueChange={handleAddEra} disabled={isPending}>
            <SelectTrigger id="era-filter" className="max-w-md">
              <SelectValue placeholder="Select an era" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Eras</SelectItem>
              {Object.values(PhilosophicalEra).map((era) => (
                <SelectItem key={era} value={era}>
                  {era.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filters.eras.length > 0 && (
        <div className="mt-2 mb-4 flex flex-wrap gap-2">
          <span className="text-muted-foreground mt-1 text-sm">
            Active era filters:
          </span>
          {filters.eras.map((era) => (
            <div
              key={era}
              className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-xs"
            >
              {era.replace(/_/g, " ")}
              <button
                type="button"
                onClick={() => handleRemoveEra(era)}
                className="hover:bg-primary/20 ml-2 h-4 w-4 rounded-full"
                aria-label={`Remove ${era} filter`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          disabled={isPending}
        >
          Reset Filters
        </Button>
      )}
    </div>
  );
}
