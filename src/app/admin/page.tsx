import { Building2, CircleDollarSign, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { requireRole } from "@/lib/permissions";

export const dynamic = "force-dynamic";

const barbers = [
  ["Ignacio", "7", "$105.000", "Al día"],
  ["Tomás", "5", "$70.000", "Al día"],
  ["Diego", "3", "$45.000", "Pendiente"],
];

export default async function AdminDashboardPage() {
  await requireRole(["BARBERSHOP_ADMIN", "SUPER_ADMIN"]);

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-8 sm:px-8">
      <p className="text-sm font-medium text-muted-foreground">Administración</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Barbería Avenida Cabell</h1>
      <section className="mt-8 grid gap-4 sm:grid-cols-3"><MetricCard label="Atenciones hoy" value="15" detail="3 barberos activos" icon={<UserRound className="size-4" />} /><MetricCard label="Ingresos estimados" value="$220.000" detail="Pagos y reservas del día" icon={<CircleDollarSign className="size-4" />} /><MetricCard label="Arriendos pendientes" value="1" detail="Requiere seguimiento" icon={<Building2 className="size-4" />} /></section>
      <section className="mt-8"><Card><CardHeader><CardTitle>Rendimiento por barbero</CardTitle><CardDescription>La tabla se conectará a las atenciones completadas y pagos del período.</CardDescription></CardHeader><CardContent className="overflow-x-auto"><table className="w-full min-w-[500px] text-left text-sm"><thead className="border-b text-muted-foreground"><tr><th className="pb-3 font-medium">Barbero</th><th className="pb-3 font-medium">Atenciones</th><th className="pb-3 font-medium">Ingresos</th><th className="pb-3 font-medium">Arriendo</th></tr></thead><tbody>{barbers.map(([name, appointments, income, rent]) => <tr className="border-b last:border-0" key={name}><td className="py-4 font-medium">{name}</td><td className="py-4">{appointments}</td><td className="py-4 font-mono">{income}</td><td className="py-4"><Badge variant={rent === "Al día" ? "secondary" : "destructive"}>{rent}</Badge></td></tr>)}</tbody></table></CardContent></Card></section>
    </main>
  );
}
