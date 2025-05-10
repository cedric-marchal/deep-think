import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";

export default function PhilosophersLoading() {
  return (
    <main className="flex flex-col items-center">
      <Skeleton className="mt-8 mb-6 h-10 w-64" />
      <Skeleton className="mb-8 h-6 w-[500px]" />

      <section className="flex w-full flex-col items-center">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap justify-center gap-6 px-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                style={{ minWidth: "300px" }}
              >
                <Card className="overflow-hidden border border-zinc-800">
                  <div className="relative h-48 w-full bg-zinc-900">
                    <Skeleton className="absolute inset-0 opacity-40" />
                  </div>
                  <CardHeader className="pb-2">
                    <Skeleton className="mb-2 h-7 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </CardContent>
                  <CardFooter className="pb-4">
                    <Skeleton className="h-10 w-full rounded-md" />
                  </CardFooter>
                </Card>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
