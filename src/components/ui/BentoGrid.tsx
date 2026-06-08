"use client";

export function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 max-w-7xl mx-auto">
      {children}
    </div>
  );
}

export function BentoCard({
  title,
  description,
  className,
  icon
}: {
  title: string;
  description: string;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className={`glass-card p-6 flex flex-col gap-2 interactive ${className}`}>
      {icon && <div className="text-primary mb-2">{icon}</div>}
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
