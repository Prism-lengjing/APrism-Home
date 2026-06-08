"use client";

import { ExternalLink } from "lucide-react";

interface ExternalLinkButtonProps {
  href: string;
}

export function ExternalLinkButton({ href }: ExternalLinkButtonProps) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-2 -mr-2 text-muted-foreground hover:text-accent transition-colors hover:bg-accent/10 rounded-full"
      onClick={(e) => e.stopPropagation()}
      aria-label="Visit website"
    >
      <ExternalLink className="w-5 h-5" />
    </a>
  );
}
