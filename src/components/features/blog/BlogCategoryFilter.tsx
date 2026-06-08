"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface BlogCategoryFilterProps {
  categories: string[];
  activeCategory: string;
}

export function BlogCategoryFilter({ categories, activeCategory }: BlogCategoryFilterProps) {
  const t = useTranslations('Blog');
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams();
    if (cat !== 'all') params.set('category', cat);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleCategoryChange(cat)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 interactive",
            activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"
          )}
        >
          {t(`categories.${cat}`)}
        </button>
      ))}
    </div>
  );
}
