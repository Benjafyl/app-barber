import { SuperAdminWorkspace } from "@/components/super-admin/super-admin-workspace";
import { getPlatformOverview } from "@/modules/platform/queries";

export default async function SuperAdminPage() {
  return <SuperAdminWorkspace overview={await getPlatformOverview()} view="dashboard" />;
}
