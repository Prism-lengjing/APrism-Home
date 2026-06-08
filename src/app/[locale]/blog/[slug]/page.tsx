import { Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';
import { Metadata } from "next";

// Fallback data
const fallbackPosts: Record<string, any> = {
  "welcome-to-aperture-prism": {
    slug: "welcome-to-aperture-prism",
    title: "Welcome to AperturePrism",
    titleZh: "欢迎来到光圈棱镜",
    excerpt: "We are excited to announce the official launch of AperturePrism.",
    excerptZh: "我们很高兴地宣布 AperturePrism 正式成立。",
    content: "## About Us\n\nAperturePrism is a team of designers, engineers, and visionaries.",
    contentZh: "## 关于我们\n\n光圈棱镜是一个由设计师、工程师和梦想家组成的团队。",
    category: "news",
    categoryZh: "新闻",
    image: "/images/projects/APrism-Home.png",
    date: "2024-01-01",
    readTime: "3",
    author: { name: "Alex", role: "Founder", image: "https://q1.qlogo.cn/g?b=qq&nk=3579267163&s=640" },
  },
  "design-philosophy": {
    slug: "design-philosophy",
    title: "Our Design Philosophy",
    titleZh: "我们的设计理念",
    excerpt: "Exploring the design philosophy behind AperturePrism.",
    excerptZh: "探索 AperturePrism 背后的设计哲学。",
    content: "## Design Driven\n\nAt AperturePrism, we believe good design is more than just looks.",
    contentZh: "## 设计驱动\n\n在光圈棱镜，我们相信好的设计不仅仅是外观。",
    category: "design",
    categoryZh: "设计",
    image: "/images/projects/GMI.png",
    date: "2024-02-15",
    readTime: "5",
    author: { name: "Sarah", role: "Core Developer", image: "https://q1.qlogo.cn/g?b=qq&nk=3579267163&s=640" },
  },
  "dual-track-development": {
    slug: "dual-track-development",
    title: "Dual-Track Development",
    titleZh: "双轨开发模式",
    excerpt: "How we simultaneously advance product development and technical exploration.",
    excerptZh: "我们如何同时推进产品开发和技术探索。",
    content: "## Parallel Tracks\n\nIn a rapidly changing technical environment.",
    contentZh: "## 双轨并行\n\n在快速变化的技术环境中。",
    category: "tech",
    categoryZh: "技术",
    image: "/images/projects/Aprism-Frp-adminWebUI.png",
    date: "2026-02-01",
    readTime: "5",
    author: { name: "Binbim", role: "Founder", image: "https://q1.qlogo.cn/g?b=qq&nk=1721822150&s=640" },
  },
};

async function getPost(slug: string, locale: string) {
  try {
    const { getPostBySlug } = await import("@/lib/data/blog");
    const post = await getPostBySlug(slug, locale);
    if (post) return post;
  } catch {}
  // Fallback
  const fallback = fallbackPosts[slug];
  if (!fallback) return null;
  return {
    slug: fallback.slug,
    title: locale === 'zh' ? fallback.titleZh : fallback.title,
    excerpt: locale === 'zh' ? fallback.excerptZh : fallback.excerpt,
    content: locale === 'zh' ? fallback.contentZh : fallback.content,
    category: locale === 'zh' ? fallback.categoryZh : fallback.category,
    image: fallback.image,
    date: fallback.date,
    readTime: fallback.readTime,
    author: fallback.author,
    tags: [],
  };
}

export async function generateStaticParams() {
  return Object.keys(fallbackPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPost(slug, locale);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image] },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations('Blog');
  const post = await getPost(slug, locale);

  if (!post) notFound();

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Section className="pt-32 pb-12">
        <ScrollReveal>
          <div className="mb-8 flex justify-between items-center">
            <Link href="/blog" className="group inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2 group-hover:bg-primary group-hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              {t('backToBlog')}
            </Link>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wider text-xs">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-4 h-4" /> {t('readTime', { minutes: post.readTime })}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
              {post.title}
            </h1>

            {post.author && (
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-background shadow-sm relative">
                  <Image src={post.author.image} alt={post.author.name} fill className="object-cover" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold">{post.author.name}</div>
                  <div className="text-xs font-medium text-primary">{post.author.role}</div>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>
      </Section>

      <Section className="pt-0 pb-16">
        <ScrollReveal delay={0.1}>
          <div className="max-w-5xl mx-auto aspect-[21/9] relative rounded-3xl overflow-hidden shadow-2xl">
            <Image src={post.image} alt={post.title} fill className="object-cover" priority />
          </div>
        </ScrollReveal>
      </Section>

      <Section className="pt-0 pb-24">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal delay={0.2}>
            <div className="prose prose-lg dark:prose-invert prose-neutral max-w-none">
              <p className="lead text-2xl text-foreground font-medium mb-10 leading-relaxed border-b border-border pb-10">
                {post.excerpt}
              </p>
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </ScrollReveal>
        </div>
      </Section>
    </main>
  );
}
