import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export function ProjectCard({ id, title, category, description, image }: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`} className="block h-full">
      <Card className="glass-card h-full p-0 overflow-hidden interactive">
        <div className="aspect-video bg-secondary relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <CardContent className="p-6">
          <div className="text-xs font-medium text-primary mb-2 uppercase tracking-wider">{category}</div>
          <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
