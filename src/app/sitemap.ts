import { MetadataRoute } from "next";

const BASE_URL = "https://apertureprism.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["zh", "en"];
  const staticPages = ["", "/about", "/team", "/projects", "/blog", "/contact", "/friends", "/services", "/careers", "/privacy", "/terms"];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1 : 0.8,
      });
    }
  }

  // Dynamic blog posts
  try {
    const { prisma } = await import("@/lib/db");
    const posts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });
    for (const post of posts) {
      for (const locale of locales) {
        entries.push({
          url: `${BASE_URL}/${locale}/blog/${post.slug}`,
          lastModified: post.updatedAt,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  } catch {}

  // Dynamic project pages
  try {
    const { prisma } = await import("@/lib/db");
    const projects = await prisma.project.findMany({
      where: { status: "active" },
      select: { slug: true, updatedAt: true },
    });
    for (const project of projects) {
      for (const locale of locales) {
        entries.push({
          url: `${BASE_URL}/${locale}/projects/${project.slug}`,
          lastModified: project.updatedAt,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  } catch {}

  return entries;
}
