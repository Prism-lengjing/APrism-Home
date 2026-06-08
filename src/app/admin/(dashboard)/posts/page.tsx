import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

async function getPosts() {
  try {
    const { prisma } = await import("@/lib/db");
    return await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        slug: true,
        title: true,
        titleZh: true,
        category: true,
        published: true,
        createdAt: true,
      },
    });
  } catch {
    return [];
  }
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">文章管理</h1>
        <Link href="/admin/posts/new" className="glass-button-primary px-4 py-2 text-sm font-medium flex items-center gap-2">
          <Plus className="w-4 h-4" />
          新建文章
        </Link>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">标题</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">分类</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">状态</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">创建时间</th>
              <th className="text-right p-4 text-sm font-medium text-muted-foreground">操作</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-b border-border last:border-0">
                <td className="p-4">
                  <div className="font-medium text-foreground">{post.titleZh || post.title}</div>
                  <div className="text-sm text-muted-foreground">{post.slug}</div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{post.category}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {post.published ? "已发布" : "草稿"}
                  </span>
                </td>
                <td className="p-4 text-sm text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <Link href={`/admin/posts/${post.id}/edit`} className="p-2 hover:bg-muted rounded-lg inline-block">
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  暂无文章，开始创建第一篇吧！
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
