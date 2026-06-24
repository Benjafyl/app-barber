import { notFound, redirect } from "next/navigation";
import { BarberWorkspace, type BarberView } from "@/components/dashboard/barber-workspace";
import { getActiveTenantForCurrentUser } from "@/modules/platform/queries";

const views: BarberView[] = ["agenda", "bookings", "clients", "services", "income", "expenses", "profile"];

export default async function DashboardViewPage({ params, searchParams }: { params: Promise<{ view: string }>; searchParams: Promise<{ barbershop?: string }> }) {
  const { view } = await params;
  const { barbershop } = await searchParams;
  if (!views.includes(view as BarberView)) notFound();
  const context = await getActiveTenantForCurrentUser(barbershop);
  if (!context) redirect("/select-barbershop");
  return <BarberWorkspace context={context} view={view as BarberView} />;
}
