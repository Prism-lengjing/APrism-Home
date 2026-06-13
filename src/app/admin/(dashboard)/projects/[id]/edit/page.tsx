"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    slug: "", title: "", titleZh: "", description: "", descriptionZh: "",
    content: "", contentZh: "", category: "", categoryZh: "", image: "",
    technologies: "", teamSize: "", timeline: "", role: "", year: "",
    githubUrl: "", liveUrl: "", status: "active",
  });

  useEffect(() => {
    fetch(`/api/projects/${params.id}`)
      .then(r => r.json())
      .then(data => { setForm(data); setFetching(false); })
      .catch(() => setFetching(false));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/projects/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/projects");
      } else {
        const data = await res.json();
        setError(data.error || "保存失败，请重试");
      }
    } catch {
      setError("网络错误，请检查连接后重试");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-muted-foreground">加载中...</div>;

  return (
    <div>
      <Link href="/admin/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="w-4 h-4 mr-2" />返回项目列表</Link>
      <h1 className="text-3xl font-bold text-foreground mb-8">编辑项目</h1>

      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-lg mb-6 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-2">Slug</label><input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" required /></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">分类</label><input value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-2">分类 (ZH)</label><input value={form.categoryZh} onChange={e => setForm({...form, categoryZh: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">年份</label><input value={form.year} onChange={e => setForm({...form, year: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-2">标题 (EN)</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" required /></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">标题 (ZH)</label><input value={form.titleZh} onChange={e => setForm({...form, titleZh: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-2">描述 (EN)</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground h-20" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">描述 (ZH)</label><textarea value={form.descriptionZh} onChange={e => setForm({...form, descriptionZh: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground h-20" /></div>
        </div>
        <div><label className="block text-sm font-medium text-foreground mb-2">图片 URL</label><input value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
        <div><label className="block text-sm font-medium text-foreground mb-2">技术栈</label><input value={form.technologies} onChange={e => setForm({...form, technologies: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-2">团队规模</label><input value={form.teamSize} onChange={e => setForm({...form, teamSize: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">周期</label><input value={form.timeline} onChange={e => setForm({...form, timeline: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">角色</label><input value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-2">GitHub</label><input value={form.githubUrl} onChange={e => setForm({...form, githubUrl: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">Live URL</label><input value={form.liveUrl} onChange={e => setForm({...form, liveUrl: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">状态</label><select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"><option value="active">活跃</option><option value="archived">归档</option><option value="draft">草稿</option></select></div>
        </div>
        <button type="submit" disabled={loading} className="glass-button-primary px-8 py-3 font-medium disabled:opacity-50">{loading ? "保存中..." : "保存修改"}</button>
      </form>
    </div>
  );
}
