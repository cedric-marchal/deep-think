import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function PhilosopherNotFound() {
  return (
    <main className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Philosopher Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Sorry, we couldn't find the philosopher you were looking for. The
            philosopher may have been removed, or you might have followed a
            broken link.
          </p>

          <div className="mt-4 flex items-center justify-center">
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 flex items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
          <Button
            asChild
            variant="outline"
            className="w-full justify-center gap-2 sm:w-auto"
            type="button"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Go to Home
            </Link>
          </Button>

          <Button
            asChild
            className="w-full justify-center gap-2 sm:w-auto"
            type="button"
          >
            <Link href="/philosophers">
              <Search className="h-4 w-4" />
              Browse Philosophers
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
