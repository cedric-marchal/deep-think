import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";

export default function PhilosopherLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        {/* Hero section skeleton */}
        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8">
          <Skeleton className="mb-6 h-64 w-64 rounded-full md:h-80 md:w-80" />
          <div className="flex w-full flex-col">
            <div className="mb-4 text-center md:text-left">
              <Skeleton className="mb-2 h-10 w-3/4 max-w-md" />
              <Skeleton className="mb-3 h-6 w-1/4 max-w-[200px]" />
              <Skeleton className="h-5 w-1/2 max-w-[300px]" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-4">
              <Skeleton className="h-10 w-full sm:w-32" />
              <Skeleton className="h-10 w-full sm:w-32" />
            </div>
          </div>
        </div>

        {/* Biographical details skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Biographical Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <Skeleton className="mb-1 h-4 w-20" />
                <Skeleton className="h-5 w-full max-w-[200px]" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Main ideas skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Main Ideas</CardTitle>
            <Skeleton className="h-4 w-3/4 max-w-[400px]" />
          </CardHeader>
          <CardContent>
            <ul className="ml-6 space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-5 w-full" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Notable works skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Notable Works</CardTitle>
            <Skeleton className="h-4 w-2/3 max-w-[350px]" />
          </CardHeader>
          <CardContent>
            <ul className="ml-6 space-y-2">
              {[1, 2, 3].map((i) => (
                <li key={i} className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-5 w-full" />
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Influences and Legacy skeleton */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Influences</CardTitle>
              <Skeleton className="h-4 w-2/3 max-w-[200px]" />
            </CardHeader>
            <CardContent>
              <ul className="ml-6 space-y-2">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-5 w-full" />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader>
              <CardTitle>Influenced</CardTitle>
              <Skeleton className="h-4 w-2/3 max-w-[200px]" />
            </CardHeader>
            <CardContent>
              <ul className="ml-6 space-y-2">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-5 w-full" />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Quotes skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Notable Quotes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-primary/5 flex rounded-lg p-4">
                <Skeleton className="mr-3 h-6 w-6 shrink-0" />
                <div className="w-full">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="mt-1 h-5 w-3/4" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
