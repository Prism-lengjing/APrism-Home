async function getMessages() {
  try {
    const { prisma } = await import("@/lib/db");
    return await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  } catch { return []; }
}

export default async function MessagesPage() {
  const messages = await getMessages();
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">联系消息</h1>
      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border">
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">发件人</th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">邮箱</th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">消息</th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">日期</th>
          </tr></thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id} className={`border-b border-border last:border-0 ${!m.read ? "bg-primary/5" : ""}`}>
                <td className="p-4 font-medium text-foreground">{m.firstName} {m.lastName}</td>
                <td className="p-4 text-sm text-muted-foreground">{m.email}</td>
                <td className="p-4 text-sm text-muted-foreground max-w-xs truncate">{m.message}</td>
                <td className="p-4 text-sm text-muted-foreground">{new Date(m.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {messages.length === 0 && <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">暂无消息</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
