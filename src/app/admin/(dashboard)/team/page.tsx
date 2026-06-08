import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { TeamTabs } from "./TeamTabs";

async function getMembers() {
  try {
    const { prisma } = await import("@/lib/db");
    return await prisma.teamMember.findMany({
      orderBy: { sortOrder: "asc" },
      select: { id: true, name: true, nameZh: true, role: true, roleZh: true, bio: true, bioZh: true, image: true, type: true },
    });
  } catch { return []; }
}

export default async function TeamPage() {
  const members = await getMembers();
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">团队管理</h1>
        <Link href="/admin/team/new" className="glass-button-primary px-4 py-2 text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" />添加成员</Link>
      </div>
      <TeamTabs members={members} />
    </div>
  );
}
