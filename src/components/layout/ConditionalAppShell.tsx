"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "./AppShell";

export function ConditionalAppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show Navbar/Footer for admin pages
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return <AppShell>{children}</AppShell>;
}
