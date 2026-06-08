"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h2>
        <p className="text-muted-foreground mb-8">Failed to load this blog post.</p>
        <div className="flex gap-4 justify-center">
          <button onClick={reset} className="glass-button px-6 py-2 text-sm font-medium">
            Try again
          </button>
          <Link href="/blog" className="glass-button-primary px-6 py-2 text-sm font-medium flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
