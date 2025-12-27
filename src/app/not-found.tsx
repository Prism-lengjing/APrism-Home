"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased min-h-screen flex flex-col items-center justify-center">
        <div className="relative flex flex-col items-center justify-center p-8 text-center">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />
          
          <h1 className="text-[120px] font-bold leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/20">
            404
          </h1>
          <h2 className="text-2xl font-medium mt-4 mb-6">Page Not Found</h2>
          <p className="text-muted-foreground max-w-[500px] mb-8 text-lg">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
          
          <Link href="/">
            <button className="glass-button-primary px-8 py-3 rounded-full flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </button>
          </Link>
        </div>
      </body>
    </html>
  );
}
