"use client";

import { Section } from "@/components/ui/section";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Mock data extended with categories and readTime
const posts = [
  {
    slug: "welcome-to-aperture-prism",
    date: "2024-01-01",
    author: "Alex",
    category: "news",
    readTime: "3",
    image: "/images/projects/APrism-Home.png",
    featured: true
  },
  {
    slug: "design-philosophy",
    date: "2024-02-15",
    author: "Sarah",
    category: "design",
    readTime: "5",
    image: "/images/projects/aether.jpg",
    featured: false
  }
];

export default function BlogPage() {
  const t = useTranslations('Blog');
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "news", "tech", "design", "culture"];

  const filteredPosts = activeCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  const featuredPost = posts.find(p => p.featured);

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      
      <Section className="pt-32 pb-12">
        <ScrollReveal>
          <h1 className="text-apple-display mb-4">{t('title')}</h1>
          <p className="text-apple-body text-xl text-muted-foreground max-w-2xl mb-8">
            {t('description')}
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  activeCategory === cat
                    ? "bg-foreground text-background"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {t(`categories.${cat}`)}
              </button>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      {/* Featured Post (Only show on 'all' tab) */}
      {activeCategory === "all" && featuredPost && (
        <Section className="pt-0 pb-12">
          <ScrollReveal delay={0.1}>
            <div className="mb-8 flex items-center gap-2">
               <div className="h-px bg-border flex-1" />
               <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{t('featured')}</span>
               <div className="h-px bg-border flex-1" />
            </div>
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="group relative rounded-3xl overflow-hidden bg-muted aspect-[21/9] md:aspect-[2.5/1]">
                <Image 
                  src={featuredPost.image}
                  alt={t(`posts.${featuredPost.slug}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 md:p-12 flex flex-col justify-end text-white">
                  <div className="flex items-center gap-4 text-sm font-medium text-white/80 mb-4">
                    <span className="bg-accent px-2 py-0.5 rounded text-white text-xs uppercase tracking-wider">
                      {t(`categories.${featuredPost.category}`)}
                    </span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {t('readTime', { minutes: featuredPost.readTime })}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 max-w-3xl leading-tight">
                    {t(`posts.${featuredPost.slug}.title`)}
                  </h2>
                  <p className="text-lg text-white/70 max-w-2xl line-clamp-2 mb-6">
                    {t(`posts.${featuredPost.slug}.excerpt`)}
                  </p>
                  <div className="flex items-center gap-2 font-medium group-hover:translate-x-2 transition-transform duration-300">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>
        </Section>
      )}

      {/* Post Grid */}
      <Section className="pt-0 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.1 + 0.2}>
              <Link href={`/blog/${post.slug}`}>
                <Card className="h-full border-none shadow-none bg-transparent hover:bg-transparent group">
                  <div className="aspect-[16/10] rounded-2xl bg-muted relative overflow-hidden mb-4">
                     <Image 
                       src={post.image}
                       alt={t(`posts.${post.slug}.title`)}
                       fill
                       className="object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                     <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                       {t(`categories.${post.category}`)}
                     </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {t('readTime', { minutes: post.readTime })}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                    {t(`posts.${post.slug}.title`)}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                     {t(`posts.${post.slug}.excerpt`)}
                  </p>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Section>

      <Footer />
    </main>
  );
}
