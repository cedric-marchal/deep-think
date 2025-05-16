import { Skeleton } from "@/src/components/ui/skeleton";

export default function PhilosopherChatLoading() {
  return (
    <div className="container flex h-[calc(100vh-200px)] flex-col py-4">
      <div className="mb-4 flex items-center gap-4">
        <Skeleton className="h-8 w-64" />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border">
        <div className="flex-1 space-y-4 p-4">
          <Skeleton className="ml-auto h-24 w-2/3 rounded-lg" />
          <Skeleton className="h-24 w-2/3 rounded-lg" />
          <Skeleton className="ml-auto h-24 w-2/3 rounded-lg" />
        </div>

        <div className="border-t p-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}
