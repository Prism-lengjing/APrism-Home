"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteButtonProps {
  id: string;
  type: "posts" | "projects" | "team" | "friends";
}

export function DeleteButton({ id, type }: DeleteButtonProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("确定要删除吗？此操作不可撤销。")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/${type}/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("删除失败，请重试");
      }
    } catch {
      alert("网络错误，请重试");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="p-2 hover:bg-destructive/10 rounded-lg inline-block ml-1 disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4 text-destructive" />
    </button>
  );
}
