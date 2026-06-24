import { notFound } from "next/navigation";
import { SuperAdminWorkspace, type SuperAdminView } from "@/components/super-admin/super-admin-workspace";
import { getPlatformOverview } from "@/modules/platform/queries";

const views: SuperAdminView[] = ["barbershops", "users", "plans", "settings"];

export default async function SuperAdminViewPage({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  if (!views.includes(view as SuperAdminView)) notFound();
  return <SuperAdminWorkspace overview={await getPlatformOverview()} view={view as SuperAdminView} />;
}
