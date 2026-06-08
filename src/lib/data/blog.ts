import { prisma } from "@/lib/db";

export async function getPosts(locale: string = 'zh') {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true, tags: { include: { tag: true } } },
    orderBy: { publishedAt: 'desc' },
  });

  return posts.map(p => ({
    slug: p.slug,
    title: locale === 'zh' ? p.titleZh : p.title,
    excerpt: locale === 'zh' ? p.excerptZh : p.excerpt,
    category: locale === 'zh' ? p.categoryZh : p.category,
    image: p.image,
    date: p.publishedAt?.toISOString().split('T')[0] ?? '',
    readTime: String(p.readTime),
    author: p.author ? {
      name: locale === 'zh' ? p.author.nameZh : p.author.name,
      role: locale === 'zh' ? p.author.roleZh : p.author.role,
      image: p.author.image,
    } : null,
    featured: p.featured,
    tags: p.tags.map(t => ({
      name: locale === 'zh' ? t.tag.nameZh : t.tag.name,
      slug: t.tag.slug,
    })),
  }));
}

export async function getPostBySlug(slug: string, locale: string = 'zh') {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true, tags: { include: { tag: true } } },
  });

  if (!post) return null;

  return {
    slug: post.slug,
    title: locale === 'zh' ? post.titleZh : post.title,
    excerpt: locale === 'zh' ? post.excerptZh : post.excerpt,
    content: locale === 'zh' ? post.contentZh : post.content,
    category: locale === 'zh' ? post.categoryZh : post.category,
    image: post.image,
    date: post.publishedAt?.toISOString().split('T')[0] ?? '',
    readTime: String(post.readTime),
    author: post.author ? {
      name: locale === 'zh' ? post.author.nameZh : post.author.name,
      role: locale === 'zh' ? post.author.roleZh : post.author.role,
      image: post.author.image,
    } : null,
    tags: post.tags.map(t => ({
      name: locale === 'zh' ? t.tag.nameZh : t.tag.name,
      slug: t.tag.slug,
    })),
  };
}

export async function getPostSlugs() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return posts.map(p => p.slug);
}

export async function getPostCategories(locale: string = 'zh') {
  const categories = await prisma.post.findMany({
    where: { published: true },
    select: { category: true, categoryZh: true },
    distinct: ['category'],
  });

  return categories.map(c => ({
    id: locale === 'zh' ? c.categoryZh : c.category,
    name: locale === 'zh' ? c.categoryZh : c.category,
  }));
}
