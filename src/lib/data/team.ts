import { prisma } from "@/lib/db";

export async function getTeamMembers(locale: string = 'zh') {
  const members = await prisma.teamMember.findMany({
    where: { type: 'member' },
    orderBy: { sortOrder: 'asc' },
  });

  return members.map(m => ({
    name: locale === 'zh' ? m.nameZh : m.name,
    role: locale === 'zh' ? m.roleZh : m.role,
    bio: locale === 'zh' ? m.bioZh : m.bio,
    image: m.image,
    email: m.email,
    github: m.github,
    website: m.website,
  }));
}

export async function getSubTeams(locale: string = 'zh') {
  const teams = await prisma.teamMember.findMany({
    where: { type: 'subteam' },
    orderBy: { sortOrder: 'asc' },
  });

  return teams.map(t => ({
    name: locale === 'zh' ? t.nameZh : t.name,
    description: locale === 'zh' ? t.bioZh : t.bio,
    image: t.image,
    category: locale === 'zh' ? t.roleZh : t.role,
    website: t.website,
  }));
}

export async function getCoCreationTeams(locale: string = 'zh') {
  const teams = await prisma.teamMember.findMany({
    where: { type: 'co-creation' },
    orderBy: { sortOrder: 'asc' },
  });

  return teams.map(t => ({
    name: locale === 'zh' ? t.nameZh : t.name,
    description: locale === 'zh' ? t.bioZh : t.bio,
    image: t.image,
    category: locale === 'zh' ? t.roleZh : t.role,
    website: t.website,
  }));
}
