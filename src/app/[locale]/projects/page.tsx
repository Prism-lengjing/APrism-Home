import { PageTemplate } from "@/components/ui/PageTemplate";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { getTranslations } from "next-intl/server";
import { ProjectCard } from "@/components/features/projects/ProjectCard";

const fallbackProjects = [
  { id: "alpha", title: "APrism-Home", category: "Web 开发", description: "AperturePrism团队官网", image: "/images/projects/APrism-Home.png" },
  { id: "neon", title: "Fur-Img-API", category: "后端开发", description: "团队项目 基于Node.js的随机图片API", image: "/images/projects/Fur-Img-API_V2.png" },
  { id: "nai2openai", title: "NovelAI to OpenAI Proxy", category: "后端工具", description: "NovelAI 图像生成 API 转 OpenAI 格式代理服务", image: "/images/projects/nai2openai.png" },
  { id: "adminWebUI", title: "Aprism FRP Admin", category: "Web 开发", description: "面向私有化内网穿透的管理与接入平台", image: "/images/projects/Aprism-Frp-adminWebUI.png" },
  { id: "gmi", title: "GMI 精神疾病指南", category: "公益科普", description: "基于 MkDocs 的中文精神健康知识库", image: "/images/projects/GMI.png" },
  { id: "quantum", title: "Quantum Flow（模拟数据）", category: "移动应用", description: "帮助团队轻松管理复杂工作流的生产力应用。", image: "/images/projects/APrism-Home.png" },
];

async function getProjectData(locale: string) {
  try {
    const { getProjects } = await import("@/lib/data/projects");
    const projects = await getProjects(locale);
    return projects.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Projects');
  const projects = await getProjectData(locale);

  return (
    <PageTemplate title={t('title')}>
      <p className="text-apple-body text-xl text-muted-foreground max-w-2xl mb-16">
        {t('description')}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.1}>
            <ProjectCard {...project} />
          </ScrollReveal>
        ))}
      </div>
    </PageTemplate>
  );
}
