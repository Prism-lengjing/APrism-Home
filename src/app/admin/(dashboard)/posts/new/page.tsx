"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostEditor } from "@/components/features/admin/PostEditor";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    slug: "",
    title: "",
    titleZh: "",
    excerpt: "",
    excerptZh: "",
    content: "",
    contentZh: "",
    category: "",
    categoryZh: "",
    image: "",
    readTime: "5",
    featured: false,
    published: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/posts");
      } else {
        const data = await res.json();
        setError(data.error || "创建失败，请重试");
      }
    } catch {
      setError("网络错误，请检查连接后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link href="/admin/posts" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        返回文章列表
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-8">新建文章</h1>

      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-lg mb-6 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Slug</label>
            <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">分类</label>
            <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" placeholder="tech" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">分类 (ZH)</label>
            <input value={form.categoryZh} onChange={e => setForm({...form, categoryZh: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" placeholder="技术" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">阅读时间 (分钟)</label>
            <input type="number" value={form.readTime} onChange={e => setForm({...form, readTime: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">标题 (EN)</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">标题 (ZH)</label>
            <input value={form.titleZh} onChange={e => setForm({...form, titleZh: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">摘要 (EN)</label>
            <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground h-20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">摘要 (ZH)</label>
            <textarea value={form.excerptZh} onChange={e => setForm({...form, excerptZh: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground h-20" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">图片 URL</label>
          <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" placeholder="/images/blog/..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">内容 (EN)</label>
          <PostEditor content={form.content} onChange={content => setForm({...form, content})} />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">内容 (ZH)</label>
          <PostEditor content={form.contentZh} onChange={contentZh => setForm({...form, contentZh})} />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="rounded" />
            <span className="text-sm text-foreground">精选</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="rounded" />
            <span className="text-sm text-foreground">发布</span>
          </label>
        </div>

        <button type="submit" disabled={loading} className="glass-button-primary px-8 py-3 font-medium disabled:opacity-50">
          {loading ? "创建中..." : "创建文章"}
        </button>
      </form>
    </div>
  );
}
