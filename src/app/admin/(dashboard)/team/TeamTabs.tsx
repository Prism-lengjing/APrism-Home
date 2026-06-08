"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";

interface Member {
  id: string;
  name: string;
  nameZh: string;
  role: string;
  roleZh: string;
  bio: string;
  bioZh: string;
  image: string;
  type: string;
}

const tabs = [
  { id: "member", label: "团队成员" },
  { id: "subteam", label: "子团队" },
  { id: "co-creation", label: "共创团队" },
];

const typeLabels: Record<string, string> = {
  member: "成员",
  subteam: "子团队",
  "co-creation": "共创团队",
};

export function TeamTabs({ members }: { members: Member[] }) {
  const [activeTab, setActiveTab] = useState("member");
  const filtered = members.filter(m => m.type === activeTab);

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-secondary"
            )}
          >
            {tab.label}
            <span className="ml-2 text-xs opacity-70">
              ({members.filter(m => m.type === tab.id).length})
            </span>
          </button>
        ))}
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border">
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">姓名</th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">角色</th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">简介</th>
            <th className="text-right p-4 text-sm font-medium text-muted-foreground">操作</th>
          </tr></thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} className="border-b border-border last:border-0">
                <td className="p-4">
                  <div className="font-medium text-foreground">{m.nameZh || m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.name}</div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{m.roleZh || m.role}</td>
                <td className="p-4 text-sm text-muted-foreground max-w-xs truncate">{m.bioZh || m.bio}</td>
                <td className="p-4 text-right"><Link href={`/admin/team/${m.id}/edit`} className="p-2 hover:bg-muted rounded-lg inline-block"><Edit className="w-4 h-4 text-muted-foreground" /></Link></td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">暂无数据</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
