import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="flex-grow pt-32 pb-24 container-apple animate-apple-fade-in">
      <Skeleton className="h-10 w-48 mb-12" />
      <Skeleton className="h-4 w-full max-w-2xl mb-8" />
      <Skeleton className="h-4 w-full max-w-xl mb-8" />
      <div className="grid md:grid-cols-2 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
