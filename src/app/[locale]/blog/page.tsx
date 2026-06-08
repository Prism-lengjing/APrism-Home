import { PageTemplate } from "@/components/ui/PageTemplate";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { BlogCategoryFilter } from "@/components/features/blog/BlogCategoryFilter";

// Fallback data when Prisma is unavailable
const fallbackPosts = [
  { slug: "dual-track-development", date: "2026-02-01", author: "Binbim", category: "tech", readTime: "5", image: "/images/projects/Aprism-Frp-adminWebUI.png", featured: true },
  { slug: "welcome-to-aperture-prism", date: "2024-01-01", author: "Alex", category: "news", readTime: "3", image: "/images/projects/APrism-Home.png", featured: false },
  { slug: "design-philosophy", date: "2024-02-15", author: "Sarah", category: "design", readTime: "5", image: "/images/projects/GMI.png", featured: false }
];

async function getBlogPosts(locale: string) {
  try {
    const { getPosts } = await import("@/lib/data/blog");
    const posts = await getPosts(locale);
    return posts.length > 0 ? posts : fallbackPosts;
  } catch {
    return fallbackPosts;
  }
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const { category } = await searchParams;
  const t = await getTranslations('Blog');
  const posts = await getBlogPosts(locale);

  const activeCategory = category || "all";
  const categories = ["all", "news", "tech", "design", "culture"];
  const filteredPosts = activeCategory === "all" ? posts : posts.filter((p: any) => p.category === activeCategory);
  const featuredPost = posts.find((p: any) => p.featured);

  return (
    <PageTemplate title={t('title')}>
      <div className="mb-12">
        <p className="text-apple-body text-xl text-muted-foreground max-w-2xl mb-8">
          {t('description')}
        </p>
        <BlogCategoryFilter categories={categories} activeCategory={activeCategory} />
      </div>

      {activeCategory === "all" && featuredPost && (
        <ScrollReveal delay={0.1}>
          <Link href={`/blog/${featuredPost.slug}`} className="block mb-16 group">
            <div className="relative rounded-3xl overflow-hidden aspect-[21/9] md:aspect-[2.5/1]">
              <Image src={featuredPost.image} alt={t(`posts.${featuredPost.slug}.title`)} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 md:p-12 flex flex-col justify-end text-white">
                <div className="flex items-center gap-4 text-sm font-medium mb-4">
                  <span className="bg-primary px-2 py-0.5 rounded text-xs uppercase tracking-wider">{t(`categories.${featuredPost.category}`)}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{t(`posts.${featuredPost.slug}.title`)}</h2>
                <div className="flex items-center gap-2 font-medium">Read Article <ArrowRight className="w-4 h-4" /></div>
              </div>
            </div>
          </Link>
        </ScrollReveal>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post: any, index: number) => (
          <ScrollReveal key={post.slug} delay={index * 0.1}>
            <Link href={`/blog/${post.slug}`} className="block h-full">
              <Card className="glass-card h-full p-0 overflow-hidden interactive">
                <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                  <Image src={post.image} alt={t(`posts.${post.slug}.title`)} fill className="object-cover transition-transform duration-500 hover:scale-105" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t('readTime', { minutes: post.readTime })}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground line-clamp-2">{t(`posts.${post.slug}.title`)}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{t(`posts.${post.slug}.excerpt`)}</p>
                </CardContent>
              </Card>
            </Link>
          </ScrollReveal>
        ))}
      </div>
    </PageTemplate>
  );
}
