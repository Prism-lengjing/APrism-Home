import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClassName?: string;
}

export function Section({ className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn("py-24 md:py-32", className)} {...props}>
      <div className={cn("container-apple", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
