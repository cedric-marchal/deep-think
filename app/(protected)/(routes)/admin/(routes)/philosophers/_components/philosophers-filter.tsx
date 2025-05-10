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
import { getPhilosophicalEra } from "@/src/utils/enum/get-philosophical-era";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
  useTransition,
} from "react";
import { philosophersSearchParams } from "../search-params";

export const PhilosophersFilter = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Use shared search params definition to stay in sync with server
  const [{ name: nameFilter, era: eraFilter }, setFilters] = useQueryStates(
    philosophersSearchParams,
    {
      // Enable transitions for better UX during server rendering
      startTransition,
      // We want full page navigation to get fresh data from server
      shallow: false,
      // Use push to allow back button navigation through filter changes
      history: "push",
      // Throttler les mise à jour pour éviter les problèmes d'API rate limit
      throttleMs: 200,
    },
  );

  // Ajouter des logs pour voir les changements des filtres
  useEffect(() => {
    console.log("Client-side filters changed:", { nameFilter, eraFilter });
  }, [nameFilter, eraFilter]);

  // Local state for the form
  const [nameInput, setNameInput] = useState(nameFilter);

  // Handle name filter changes
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.target.value);
  };

  // Handle form submission
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with name:", nameInput);

    // Update both filters at once, batch update is more efficient
    setFilters({
      name: nameInput,
    }).then(() => {
      // Force full page refresh
      router.refresh();
    });
  };

  // Handle era filter changes
  const handleEraChange = (value: string) => {
    console.log("Era changed to:", value);
    setFilters({ era: value }).then(() => {
      // Force full page refresh
      router.refresh();
    });
  };

  // Reset all filters
  const handleReset = () => {
    console.log("Resetting filters");
    setNameInput("");
    setFilters({
      name: "",
      era: "all",
    }).then(() => {
      // Force full page refresh
      router.refresh();
    });
  };

  return (
    <div className="mb-6 space-y-4">
      <h2 className="text-xl font-semibold">Filter Philosophers</h2>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <form onSubmit={onSubmit} className="flex items-end gap-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="name-filter">Name</Label>
              <div className="relative">
                <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                <Input
                  id="name-filter"
                  placeholder="Search by name"
                  className="pl-8"
                  value={nameInput}
                  onChange={handleNameChange}
                  disabled={isPending}
                />
              </div>
            </div>
            <Button type="submit" disabled={isPending}>
              Search
            </Button>
          </form>
        </div>

        <div className="w-full space-y-2 md:w-1/3">
          <Label htmlFor="era-filter">Philosophical Era</Label>
          <Select
            value={eraFilter}
            onValueChange={handleEraChange}
            disabled={isPending}
          >
            <SelectTrigger id="era-filter">
              <SelectValue placeholder="All eras" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All eras</SelectItem>
              {Object.values(PhilosophicalEra).map((era) => (
                <SelectItem key={era} value={era}>
                  {getPhilosophicalEra(era)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(nameFilter || (eraFilter && eraFilter !== "all")) && (
          <div className="flex items-end">
            <Button
              variant="outline"
              size="icon"
              onClick={handleReset}
              disabled={isPending}
              type="button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
