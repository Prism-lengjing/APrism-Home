import { prisma } from "@/lib/db";

export async function getProjects(locale: string = 'zh') {
  const projects = await prisma.project.findMany({
    where: { status: 'active' },
    orderBy: { sortOrder: 'asc' },
  });

  return projects.map(p => ({
    id: p.slug,
    title: locale === 'zh' ? p.titleZh : p.title,
    category: locale === 'zh' ? p.categoryZh : p.category,
    description: locale === 'zh' ? p.descriptionZh : p.description,
    image: p.image,
  }));
}

export async function getProjectBySlug(slug: string, locale: string = 'zh') {
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) return null;

  return {
    id: project.slug,
    title: locale === 'zh' ? project.titleZh : project.title,
    category: locale === 'zh' ? project.categoryZh : project.category,
    description: locale === 'zh' ? project.descriptionZh : project.description,
    content: locale === 'zh' ? project.contentZh : project.content,
    image: project.image,
    technologies: project.technologies,
    teamSize: project.teamSize,
    timeline: project.timeline,
    role: project.role,
    year: project.year,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
  };
}

export async function getProjectSlugs() {
  const projects = await prisma.project.findMany({
    where: { status: 'active' },
    select: { slug: true },
  });
  return projects.map(p => p.slug);
}
