import { AppShell } from "@/components/app-shell";
import { requireRole } from "@/lib/permissions";
import { superAdminNavigation } from "@/modules/navigation";

export const dynamic = "force-dynamic";

export default async function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  await requireRole(["SUPER_ADMIN"]);
  return <AppShell navigation={superAdminNavigation} subtitle="Gestión global" title="Super administrador">{children}</AppShell>;
}
