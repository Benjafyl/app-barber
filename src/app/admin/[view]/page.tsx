import { notFound, redirect } from "next/navigation";
import { AdminWorkspace, type AdminView } from "@/components/admin/admin-workspace";
import { getActiveTenantForCurrentUser } from "@/modules/platform/queries";

const views: AdminView[] = ["dashboard", "agenda", "barbers", "clients", "bookings", "services", "expenses", "rents", "settings"];

export default async function AdminViewPage({ params, searchParams }: { params: Promise<{ view: string }>; searchParams: Promise<{ barbershop?: string }> }) {
  const { view } = await params;
  const { barbershop } = await searchParams;
  if (!views.includes(view as AdminView)) notFound();
  const context = await getActiveTenantForCurrentUser(barbershop);
  if (!context) redirect("/select-barbershop");
  return <AdminWorkspace tenant={context.tenant} view={view as AdminView} />;
}
