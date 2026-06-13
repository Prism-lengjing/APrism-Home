import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { DeleteButton } from "@/components/features/admin/DeleteButton";

async function getProjects() {
  try {
    const { prisma } = await import("@/lib/db");
    return await prisma.project.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, slug: true, title: true, titleZh: true, category: true, status: true } });
  } catch { return []; }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">项目管理</h1>
        <Link href="/admin/projects/new" className="glass-button-primary px-4 py-2 text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" />新建项目</Link>
      </div>
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border">
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">标题</th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">分类</th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">状态</th>
            <th className="text-right p-4 text-sm font-medium text-muted-foreground">操作</th>
          </tr></thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0">
                <td className="p-4"><div className="font-medium text-foreground">{p.titleZh || p.title}</div><div className="text-sm text-muted-foreground">{p.slug}</div></td>
                <td className="p-4 text-sm text-muted-foreground">{p.category}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${p.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>{p.status}</span></td>
                <td className="p-4 text-right">
                  <Link href={`/admin/projects/${p.id}/edit`} className="p-2 hover:bg-muted rounded-lg inline-block"><Edit className="w-4 h-4 text-muted-foreground" /></Link>
                  <DeleteButton id={p.id} type="projects" />
                </td>
              </tr>
            ))}
            {projects.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">暂无项目</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
