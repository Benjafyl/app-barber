import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/permissions";
import { barberNavigation } from "@/modules/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["BARBER", "BARBERSHOP_ADMIN", "SUPER_ADMIN"]);
  return <AppShell navigation={barberNavigation} subtitle="Operación diaria" title="Panel barbero">{children}</AppShell>;
}
