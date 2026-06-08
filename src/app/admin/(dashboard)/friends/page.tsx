import Link from "next/link";
import { Plus, Edit } from "lucide-react";

async function getFriends() {
  try {
    const { prisma } = await import("@/lib/db");
    return await prisma.friendLink.findMany({ orderBy: { sortOrder: "asc" } });
  } catch { return []; }
}

export default async function FriendsPage() {
  const friends = await getFriends();
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">友链管理</h1>
        <Link href="/admin/friends/new" className="glass-button-primary px-4 py-2 text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" />添加链接</Link>
      </div>
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border">
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">名称</th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">链接</th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">状态</th>
            <th className="text-right p-4 text-sm font-medium text-muted-foreground">操作</th>
          </tr></thead>
          <tbody>
            {friends.map((f) => (
              <tr key={f.id} className="border-b border-border last:border-0">
                <td className="p-4 font-medium text-foreground">{f.nameZh || f.name}</td>
                <td className="p-4 text-sm text-muted-foreground truncate max-w-xs">{f.url}</td>
                <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${f.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>{f.active ? "活跃" : "停用"}</span></td>
                <td className="p-4 text-right"><Edit className="w-4 h-4 text-muted-foreground inline" /></td>
              </tr>
            ))}
            {friends.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">暂无友链</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
