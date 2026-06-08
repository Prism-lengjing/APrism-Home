interface PageTemplateProps {
  title: string;
  children: React.ReactNode;
}

export function PageTemplate({ title, children }: PageTemplateProps) {
  return (
    <div className="flex-grow pt-32 pb-24 container-apple animate-apple-fade-in">
      <h1 className="text-apple-headline font-bold mb-12 text-foreground">{title}</h1>
      {children}
    </div>
  );
}
