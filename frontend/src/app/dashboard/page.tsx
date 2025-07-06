// app/admin/dashboard/page.tsx
import { getUserFromCookie } from '@/lib/authCheck';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';

export default async function AdminDashboardPage() {
  const user = await getUserFromCookie();

  if (!user || user.role !== 'admin') {
    redirect('/login');
  }

  return <AdminDashboard />;
}
