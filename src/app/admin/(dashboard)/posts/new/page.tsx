"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostEditor } from "@/components/features/admin/PostEditor";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/posts");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link href="/admin/posts" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Posts
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-8">New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Slug</label>
            <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
            <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" placeholder="tech" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title (EN)</label>
            <input value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Title (ZH)</label>
            <input value={form.titleZh} onChange={e => setForm({...form, titleZh: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Excerpt (EN)</label>
            <textarea value={form.excerpt} onChange={e => setForm({...form, excerpt: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground h-20" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Excerpt (ZH)</label>
            <textarea value={form.excerptZh} onChange={e => setForm({...form, excerptZh: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground h-20" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Image URL</label>
          <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground" placeholder="/images/blog/..." />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Content (EN)</label>
          <PostEditor content={form.content} onChange={content => setForm({...form, content})} />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Content (ZH)</label>
          <PostEditor content={form.contentZh} onChange={contentZh => setForm({...form, contentZh})} />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="rounded" />
            <span className="text-sm text-foreground">Featured</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.published} onChange={e => setForm({...form, published: e.target.checked})} className="rounded" />
            <span className="text-sm text-foreground">Published</span>
          </label>
        </div>

        <button type="submit" disabled={loading} className="glass-button-primary px-8 py-3 font-medium disabled:opacity-50">
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
