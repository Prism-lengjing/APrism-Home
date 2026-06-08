import { AdminSidebar } from "@/components/features/admin/AdminSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-64">
        {children}
      </main>
    </div>
  );
}
