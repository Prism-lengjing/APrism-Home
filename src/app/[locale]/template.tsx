"use client";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-apple-fade-in">
      {children}
    </div>
  );
}
