import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/permissions";
import { adminNavigation } from "@/modules/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["BARBERSHOP_ADMIN", "SUPER_ADMIN"]);
  return <AppShell navigation={adminNavigation} subtitle="Administración de barbería" title="Panel administrador">{children}</AppShell>;
}
