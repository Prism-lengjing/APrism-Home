"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewTeamPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", nameZh: "", role: "", roleZh: "", bio: "", bioZh: "",
    image: "", email: "", github: "", website: "", type: "member",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    router.push("/admin/team");
  };

  return (
    <div>
      <Link href="/admin/team" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"><ArrowLeft className="w-4 h-4 mr-2" />返回团队列表</Link>
      <h1 className="text-3xl font-bold text-foreground mb-8">添加成员</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-2">姓名 (EN)</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" required /></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">姓名 (ZH)</label><input value={form.nameZh} onChange={e => setForm({...form, nameZh: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-2">角色 (EN)</label><input value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" required /></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">角色 (ZH)</label><input value={form.roleZh} onChange={e => setForm({...form, roleZh: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-2">简介 (EN)</label><textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground h-20" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">简介 (ZH)</label><textarea value={form.bioZh} onChange={e => setForm({...form, bioZh: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground h-20" /></div>
        </div>
        <div><label className="block text-sm font-medium text-foreground mb-2">头像 URL</label><input value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
        <div className="grid grid-cols-3 gap-4">
          <div><label className="block text-sm font-medium text-foreground mb-2">类型</label><select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground"><option value="member">成员</option><option value="subteam">子团队</option><option value="co-creation">共创</option></select></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">邮箱</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
          <div><label className="block text-sm font-medium text-foreground mb-2">GitHub</label><input value={form.github} onChange={e => setForm({...form, github: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" /></div>
        </div>
        <button type="submit" disabled={loading} className="glass-button-primary px-8 py-3 font-medium disabled:opacity-50">{loading ? "添加中..." : "添加成员"}</button>
      </form>
    </div>
  );
}
