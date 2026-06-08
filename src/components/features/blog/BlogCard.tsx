import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category?: string;
}

export function BlogCard({ slug, title, excerpt, date, readTime, image }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block h-full">
      <Card className="glass-card h-full p-0 overflow-hidden interactive">
        <div className="aspect-[16/10] bg-muted relative overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {readTime}</span>
          </div>
          <h3 className="text-xl font-bold mb-2 text-foreground line-clamp-2">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
