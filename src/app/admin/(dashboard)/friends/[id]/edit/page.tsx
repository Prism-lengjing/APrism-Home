"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditFriendPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", nameZh: "", description: "", descriptionZh: "",
    url: "", logo: "", sortOrder: "0", active: true,
  });

  useEffect(() => {
    fetch(`/api/friends/${params.id}`)
      .then(r => r.json())
      .then(data => { setForm({ ...data, sortOrder: String(data.sortOrder || 0) }); setFetching(false); })
      .catch(() => setFetching(false));
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/friends/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/friends");
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
      <Link href="/admin/friends" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="w-4 h-4 mr-2" />返回友链列表</Link>
      <h1 className="text-3xl font-bold text-foreground mb-8">编辑友链</h1>

      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-lg mb-6 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-2">名称 (EN)</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" required /></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">名称 (ZH)</label><input value={form.nameZh} onChange={e => setForm({...form, nameZh: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-2">描述 (EN)</label><input value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">描述 (ZH)</label><input value={form.descriptionZh} onChange={e => setForm({...form, descriptionZh: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
        </div>
        <div><label className="block text-sm font-medium text-foreground mb-2">链接 URL</label><input value={form.url} onChange={e => setForm({...form, url: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" required /></div>
        <div><label className="block text-sm font-medium text-foreground mb-2">Logo URL</label><input value={form.logo} onChange={e => setForm({...form, logo: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-2">排序</label><input type="number" value={form.sortOrder} onChange={e => setForm({...form, sortOrder: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
          <div className="flex items-end pb-2"><label className="flex items-center gap-2"><input type="checkbox" checked={form.active} onChange={e => setForm({...form, active: e.target.checked})} className="rounded" /><span className="text-sm text-foreground">启用</span></label></div>
        </div>
        <button type="submit" disabled={loading} className="glass-button-primary px-8 py-3 font-medium disabled:opacity-50">{loading ? "保存中..." : "保存修改"}</button>
      </form>
    </div>
  );
}
