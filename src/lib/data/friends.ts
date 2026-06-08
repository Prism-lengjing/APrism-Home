import { prisma } from "@/lib/db";

export async function getFriendLinks(locale: string = 'zh') {
  const friends = await prisma.friendLink.findMany({
    where: { active: true },
    orderBy: { sortOrder: 'asc' },
  });

  return friends.map(f => ({
    id: f.name.toLowerCase().replace(/\s+/g, '-'),
    name: locale === 'zh' ? f.nameZh : f.name,
    description: locale === 'zh' ? f.descriptionZh : f.description,
    url: f.url,
    logo: f.logo,
  }));
}
