"use client";

import { Section } from "@/components/ui/section";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Share2, 
  Clock, 
  Tag,
  ChevronLeft,
  ChevronRight,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  List
} from "lucide-react";
import { notFound } from "next/navigation";
import { use, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useSpring } from "framer-motion";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const t = useTranslations('Blog');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Validate slug
  const validPosts = ['welcome-to-aperture-prism', 'design-philosophy'];
  if (!validPosts.includes(slug)) {
    notFound();
  }

  // Mock metadata (Sync with list page)
  const meta = {
    date: slug === 'welcome-to-aperture-prism' ? '2024-01-01' : '2024-02-15',
    author: slug === 'welcome-to-aperture-prism' ? 'Alex' : 'Sarah',
    authorKey: slug === 'welcome-to-aperture-prism' ? 'alex' : 'sarah',
    category: slug === 'welcome-to-aperture-prism' ? 'news' : 'design',
    readTime: slug === 'welcome-to-aperture-prism' ? '3' : '5',
    image: slug === 'welcome-to-aperture-prism' ? "/images/projects/APrism-Home.png" : "/images/projects/aether.jpg"
  };

  // Mock related posts (Simple logic: show the other post)
  const relatedPostSlug = slug === 'welcome-to-aperture-prism' ? 'design-philosophy' : 'welcome-to-aperture-prism';
  const relatedPostMeta = {
    image: relatedPostSlug === 'welcome-to-aperture-prism' ? "/images/projects/APrism-Home.png" : "/images/projects/aether.jpg",
    date: relatedPostSlug === 'welcome-to-aperture-prism' ? '2024-01-01' : '2024-02-15',
    readTime: relatedPostSlug === 'welcome-to-aperture-prism' ? '3' : '5',
    category: relatedPostSlug === 'welcome-to-aperture-prism' ? 'news' : 'design'
  };

  return (
    <main className="min-h-screen flex flex-col bg-background selection:bg-accent/20">
      <Navbar />
      
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <Section className="pt-32 pb-12 relative overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <ScrollReveal>
          <div className="mb-8 flex justify-between items-center">
            <Link href="/blog" className="group inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2 group-hover:bg-accent group-hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              {t('backToBlog')}
            </Link>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
             <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium mb-6">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent uppercase tracking-wider text-xs">
                  {t(`categories.${meta.category}`)}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-4 h-4" /> {meta.date}
                </span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-4 h-4" /> {t('readTime', { minutes: meta.readTime })}
                </span>
             </div>
             
             <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
               {t(`posts.${slug}.title`)}
             </h1>

             <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-background shadow-sm">
                   <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="text-left">
                   <div className="text-sm font-semibold">{meta.author}</div>
                   <div className="text-xs text-muted-foreground">{t(`author.${meta.authorKey}`)}</div>
                </div>
             </div>
          </div>
        </ScrollReveal>
      </Section>

      {/* Featured Image */}
      <Section className="pt-0 pb-16">
        <ScrollReveal delay={0.1}>
          <div className="max-w-5xl mx-auto aspect-[21/9] relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
             <Image 
               src={meta.image}
               alt={t(`posts.${slug}.title`)}
               fill
               className="object-cover"
               priority
             />
          </div>
        </ScrollReveal>
      </Section>

      {/* Content Layout */}
      <Section className="pt-0 pb-24">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12 max-w-6xl mx-auto">
          
          {/* Main Article */}
          <article className="min-w-0">
            <ScrollReveal delay={0.2}>
              <div className="prose prose-lg dark:prose-invert prose-neutral max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-24
                prose-p:leading-8 prose-p:text-muted-foreground prose-p:mb-6
                prose-strong:text-foreground prose-strong:font-semibold
                prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-muted/30 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-lg prose-blockquote:font-medium
                prose-li:marker:text-accent
              ">
                {/* Content rendering */}
                <p className="lead text-2xl text-foreground font-medium mb-10 leading-relaxed border-b border-border pb-10">
                  {t(`posts.${slug}.excerpt`)}
                </p>
                {t(`posts.${slug}.content`).split('\n\n').map((paragraph, i) => (
                  <p key={i}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Tags & Share */}
              <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      #{meta.category}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      #AperturePrism
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">{t('share')}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="w-9 h-9 rounded-full hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300">
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="w-9 h-9 rounded-full hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-300">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="w-9 h-9 rounded-full hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-300">
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </article>

          {/* Sidebar / Related */}
          <aside className="space-y-8 hidden lg:block">
            {/* Table of Contents (Simulated) */}
            <ScrollReveal delay={0.3}>
              <div className="p-6 rounded-2xl bg-muted/30 border border-border">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <List className="w-4 h-4" />
                  {t('tableOfContents')}
                </h3>
                <nav className="space-y-2 text-sm text-muted-foreground border-l border-border ml-2 pl-4">
                  <a href="#" className="block hover:text-accent transition-colors">Introduction</a>
                  <a href="#" className="block hover:text-accent transition-colors">Key Concepts</a>
                  <a href="#" className="block hover:text-accent transition-colors">Design Philosophy</a>
                  <a href="#" className="block hover:text-accent transition-colors">Conclusion</a>
                </nav>
              </div>
            </ScrollReveal>

            {/* Author Card */}
            <ScrollReveal delay={0.35}>
              <div className="p-6 rounded-2xl bg-muted/30 border border-border">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <User className="w-4 h-4" />
                  {t('writtenBy')}
                </h3>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex-shrink-0 flex items-center justify-center overflow-hidden border border-border">
                    <User className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-bold">{meta.author}</div>
                    <div className="text-xs text-muted-foreground mt-1 leading-snug">
                      {t(`author.${meta.authorKey}`)}
                    </div>
                  </div>
                </div>
                <Button className="w-full glass-button-secondary text-xs h-9 rounded-xl">
                  Follow Author
                </Button>
              </div>
            </ScrollReveal>

            {/* Related Post */}
            <ScrollReveal delay={0.4}>
              <div className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                  {t('relatedPosts')}
                </h3>
                <Link href={`/blog/${relatedPostSlug}`} className="block group">
                  <div className="aspect-video rounded-xl bg-muted relative overflow-hidden mb-3 border border-border group-hover:border-accent/50 transition-colors">
                    <Image 
                      src={relatedPostMeta.image}
                      alt="Related"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 rounded bg-background/80 backdrop-blur text-[10px] font-bold uppercase">
                      {t(`categories.${relatedPostMeta.category}`)}
                    </div>
                  </div>
                  <h4 className="font-bold leading-tight group-hover:text-accent transition-colors line-clamp-2">
                    {t(`posts.${relatedPostSlug}.title`)}
                  </h4>
                  <div className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                    <span>{relatedPostMeta.date}</span>
                    <span>•</span>
                    <span>{t('readTime', { minutes: relatedPostMeta.readTime })}</span>
                  </div>
                </Link>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </Section>

      {/* Post Navigation */}
      <Section className="py-16 border-t border-border bg-muted/10">
         <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Link href={`/blog/${relatedPostSlug}`} className="group p-8 rounded-3xl border border-border bg-background hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300">
              <div className="text-xs text-muted-foreground mb-3 flex items-center gap-2 uppercase tracking-wider font-medium">
                <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> {t('prevPost')}
              </div>
              <div className="font-bold text-2xl group-hover:text-accent transition-colors">
                {t(`posts.${relatedPostSlug}.title`)}
              </div>
            </Link>
            <Link href={`/blog/${relatedPostSlug}`} className="group p-8 rounded-3xl border border-border bg-background hover:border-accent/50 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 text-right">
              <div className="text-xs text-muted-foreground mb-3 flex items-center gap-2 justify-end uppercase tracking-wider font-medium">
                {t('nextPost')} <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="font-bold text-2xl group-hover:text-accent transition-colors">
                {t(`posts.${relatedPostSlug}.title`)}
              </div>
            </Link>
         </div>
      </Section>

      <Footer />
    </main>
  );
}
