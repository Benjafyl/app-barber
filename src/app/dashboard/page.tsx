import { BarberWorkspace } from "@/components/dashboard/barber-workspace";
import { getActiveTenantForCurrentUser } from "@/modules/platform/queries";
import { redirect } from "next/navigation";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ barbershop?: string }> }) {
  const { barbershop } = await searchParams;
  const context = await getActiveTenantForCurrentUser(barbershop);
  if (!context) redirect("/select-barbershop");
  return <BarberWorkspace context={context} view="today" />;
}
