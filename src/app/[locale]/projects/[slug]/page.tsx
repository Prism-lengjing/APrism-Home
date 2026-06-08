import { Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, ExternalLink, Code2, Calendar, Users, Briefcase, Clock, Images } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

// Fallback data
const fallbackProjects: Record<string, any> = {
  alpha: { title: "APrism-Home", titleZh: "APrism-Home", category: "Web Development", categoryZh: "Web 开发", description: "AperturePrism Team Official Website", descriptionZh: "AperturePrism团队官网", content: "This is the official website of the AperturePrism team.", contentZh: "这是光圈棱镜团队的官方网站。", image: "/images/projects/APrism-Home.png", technologies: "Next.js, React, Tailwind CSS, TypeScript", teamSize: "4 People", timeline: "3 Months", role: "Full Stack & Design", year: "2024", githubUrl: null },
  neon: { title: "Fur-Img-API", titleZh: "Fur-Img-API", category: "Backend Development", categoryZh: "后端开发", description: "Random Image API Based on Node.js", descriptionZh: "基于Node.js的随机图片API", content: "A high-performance random image distribution service.", contentZh: "一个高性能的随机图片分发服务。", image: "/images/projects/Fur-Img-API_V2.png", technologies: "Node.js, Express, Redis, Docker", teamSize: "2 People", timeline: "2 Months", role: "Backend Developer", year: "2024", githubUrl: null },
  quantum: { title: "Quantum Flow", titleZh: "Quantum Flow（模拟数据）", category: "Mobile App", categoryZh: "移动应用", description: "Productivity application for complex workflows.", descriptionZh: "帮助团队管理复杂工作流的生产力应用。", content: "Quantum Flow redefines project management on mobile.", contentZh: "Quantum Flow 重新定义了移动端的项目管理体验。", image: "/images/projects/APrism-Home.png", technologies: "React Native, GraphQL, Firebase", teamSize: "3 People", timeline: "6 Months", role: "Full Stack", year: "2024", githubUrl: null },
  nai2openai: { title: "NovelAI to OpenAI Proxy", titleZh: "NovelAI to OpenAI Proxy", category: "Backend Tool", categoryZh: "后端工具", description: "NovelAI Image Generation API to OpenAI Format Proxy", descriptionZh: "NovelAI 图像生成 API 转 OpenAI 格式代理", content: "A high-performance middleware service.", contentZh: "一个高性能中间件服务。", image: "/images/projects/nai2openai.png", technologies: "Python, FastAPI, HTTPX, AsyncIO", teamSize: "1 Person", timeline: "1 Month", role: "Backend Developer", year: "2024", githubUrl: "https://github.com/Prism-lengjing/nai2openai" },
  adminWebUI: { title: "Aprism FRP Admin", titleZh: "Aprism FRP Admin", category: "Web Development", categoryZh: "Web 开发", description: "Management platform for private intranet penetration", descriptionZh: "面向私有化内网穿透的管理与接入平台", content: "A management and access platform.", contentZh: "一个管理与接入平台。", image: "/images/projects/Aprism-Frp-adminWebUI.png", technologies: "Node.js, React, Vite, SQLite", teamSize: "2 People", timeline: "4 Months", role: "Full Stack", year: "2024", githubUrl: "https://github.com/Prism-lengjing/Aprism-Frp-adminWebUI" },
  gmi: { title: "GMI Mental Illness Guide", titleZh: "GMI 精神疾病指南", category: "Wiki & Education", categoryZh: "公益科普", description: "Chinese mental health knowledge base", descriptionZh: "中文精神健康知识库", content: "A Chinese mental health knowledge base.", contentZh: "一个中文精神健康知识库。", image: "/images/projects/GMI.png", technologies: "MkDocs, Python, Markdown", teamSize: "2 People", timeline: "2 Months", role: "Content & Dev", year: "2024", githubUrl: "https://github.com/Prism-lengjing/GMI" },
};

async function getProject(slug: string, locale: string) {
  try {
    const { getProjectBySlug } = await import("@/lib/data/projects");
    const project = await getProjectBySlug(slug, locale);
    if (project) return project;
  } catch {}
  // Fallback
  const fallback = fallbackProjects[slug];
  if (!fallback) return null;
  return {
    id: fallback.title.toLowerCase().replace(/\s+/g, '-'),
    title: locale === 'zh' ? fallback.titleZh : fallback.title,
    category: locale === 'zh' ? fallback.categoryZh : fallback.category,
    description: locale === 'zh' ? fallback.descriptionZh : fallback.description,
    content: locale === 'zh' ? fallback.contentZh : fallback.content,
    image: fallback.image,
    technologies: fallback.technologies,
    teamSize: fallback.teamSize,
    timeline: fallback.timeline,
    role: fallback.role,
    year: fallback.year,
    githubUrl: fallback.githubUrl,
    liveUrl: null,
  };
}

export async function generateStaticParams() {
  return Object.keys(fallbackProjects).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProject(slug, locale);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: { title: project.title, description: project.description, images: [project.image] },
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations('Projects');
  const project = await getProject(slug, locale);

  if (!project) notFound();

  return (
    <main className="min-h-screen flex flex-col">
      <Section className="pt-32 pb-12">
        <ScrollReveal>
          <div className="mb-8">
            <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2 group-hover:bg-primary group-hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              {t('backToProjects')}
            </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="text-primary font-medium mb-2 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {project.category}
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                {project.title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="flex gap-4">
              {project.githubUrl && (
                <Button className="glass-button-primary rounded-full px-8 h-12 text-base" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>
        </ScrollReveal>
      </Section>

      <Section className="pt-0 pb-16">
        <ScrollReveal delay={0.1}>
          <div className="aspect-video w-full relative rounded-3xl overflow-hidden bg-muted shadow-2xl">
            <Image src={project.image} alt={project.title} fill className="object-cover" priority />
          </div>
        </ScrollReveal>
      </Section>

      <Section className="pt-0 pb-16">
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Calendar, label: t('stats.year'), value: project.year },
              { icon: Clock, label: t('stats.timeline'), value: project.timeline },
              { icon: Users, label: t('stats.teamSize'), value: project.teamSize },
              { icon: Briefcase, label: t('stats.role'), value: project.role },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl bg-muted/30 border border-border flex flex-col items-center text-center">
                <stat.icon className="w-6 h-6 text-primary mb-3" />
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="font-semibold text-lg">{stat.value}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Section>

      <Section className="pt-0 pb-24">
        <div className="grid md:grid-cols-3 gap-16">
          <div className="md:col-span-2 space-y-12">
            <ScrollReveal delay={0.2}>
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <div className="prose prose-lg dark:prose-invert prose-neutral max-w-none text-muted-foreground">
                <p className="leading-relaxed">{project.content}</p>
              </div>
            </ScrollReveal>
          </div>

          <div className="space-y-8">
            <ScrollReveal delay={0.4}>
              <div className="p-8 rounded-3xl bg-muted/30 border border-border sticky top-24">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Code2 className="w-6 h-6 text-primary" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.split(', ').map((tech: string, i: number) => (
                    <span key={i} className="px-4 py-2 rounded-full bg-background text-sm font-medium text-muted-foreground border border-border">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>
    </main>
  );
}
