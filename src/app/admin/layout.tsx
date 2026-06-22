import AdminNavbar from "@/app/admin/AdminNavbar";
import { requireAdminSession } from "@/lib/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();

  return (
    <div className="space-y-6 py-6">
      <AdminNavbar email={session.user?.email} />
      {children}
    </div>
  );
}
