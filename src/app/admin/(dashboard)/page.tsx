import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FileText, FolderOpen, Users, MessageSquare } from "lucide-react";
import Link from "next/link";

async function getStats() {
  try {
    const { prisma } = await import("@/lib/db");
    const [posts, projects, team, messages] = await Promise.all([
      prisma.post.count(),
      prisma.project.count(),
      prisma.teamMember.count(),
      prisma.contactMessage.count(),
    ]);
    return { posts, projects, team, messages };
  } catch {
    return { posts: 0, projects: 0, team: 0, messages: 0 };
  }
}

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const stats = await getStats();

  const cards = [
    { label: "文章", value: stats.posts, icon: FileText, href: "/admin/posts", color: "text-blue-500" },
    { label: "项目", value: stats.projects, icon: FolderOpen, href: "/admin/projects", color: "text-green-500" },
    { label: "团队成员", value: stats.team, icon: Users, href: "/admin/team", color: "text-purple-500" },
    { label: "联系消息", value: stats.messages, icon: MessageSquare, href: "/admin/messages", color: "text-orange-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">仪表盘</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="glass-card hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <card.icon className={`w-8 h-8 ${card.color}`} />
              <span className="text-3xl font-bold text-foreground">{card.value}</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">{card.label}</h3>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-foreground mb-4">快捷操作</h2>
        <div className="flex gap-4">
          <Link href="/admin/posts/new" className="glass-button-primary px-6 py-2 text-sm font-medium">
            新建文章
          </Link>
          <Link href="/admin/projects/new" className="glass-button px-6 py-2 text-sm font-medium">
            新建项目
          </Link>
          <Link href="/admin/team/new" className="glass-button px-6 py-2 text-sm font-medium">
            添加成员
          </Link>
        </div>
      </div>
    </div>
  );
}
