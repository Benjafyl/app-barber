import { CalendarDays, CircleDollarSign, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { requireRole } from "@/lib/permissions";

export const dynamic = "force-dynamic";

const schedule = [
  ["10:00", "Matías Rojas", "Degradado", "Confirmada"],
  ["11:00", "Felipe González", "Corte + barba", "Pendiente"],
  ["12:00", "Benjamín Soto", "Corte básico", "Confirmada"],
];

export default async function BarberDashboardPage() {
  await requireRole(["BARBER", "BARBERSHOP_ADMIN", "SUPER_ADMIN"]);

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-8 sm:px-8">
      <p className="text-sm font-medium text-muted-foreground">Resumen del día</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3"><h1 className="text-3xl font-semibold tracking-tight">Hola, Ignacio</h1><Badge variant="secondary">Martes 23 de junio</Badge></div>
      <section className="mt-8 grid gap-4 sm:grid-cols-3"><MetricCard label="Reservas hoy" value="7" detail="3 confirmadas" icon={<CalendarDays className="size-4" />} /><MetricCard label="Ingresos estimados" value="$105.000" detail="De atenciones realizadas" icon={<CircleDollarSign className="size-4" />} /><MetricCard label="Clientes atendidos" value="5" detail="2 clientes frecuentes" icon={<Users className="size-4" />} /></section>
      <section className="mt-8"><Card><CardHeader><CardTitle>Tu agenda</CardTitle><CardDescription>Acciones rápidas para las reservas de hoy.</CardDescription></CardHeader><CardContent className="space-y-3">{schedule.map(([time, client, service, status]) => <div key={time} className="flex items-center justify-between gap-4 border-b pb-3 last:border-0 last:pb-0"><div className="flex gap-4"><span className="font-mono text-sm text-muted-foreground">{time}</span><div><p className="font-medium">{client}</p><p className="text-sm text-muted-foreground">{service}</p></div></div><Badge variant={status === "Confirmada" ? "default" : "secondary"}>{status}</Badge></div>)}</CardContent></Card></section>
    </main>
  );
}
