import Link from "next/link";
import { BarChart3, Building2, CreditCard, Store, UsersRound } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { getPlatformOverview } from "@/modules/platform/queries";

type Overview = Awaited<ReturnType<typeof getPlatformOverview>>;
export type SuperAdminView = "dashboard" | "barbershops" | "users" | "plans" | "settings";

export function SuperAdminWorkspace({ overview, view }: { overview: Overview; view: SuperAdminView }) {
  const labels: Record<SuperAdminView, { title: string; description: string }> = {
    dashboard: { title: "Vista general", description: "Estado de la plataforma App Barber Pichilemu." },
    barbershops: { title: "Barberías", description: "Clientes/tenants registrados en la plataforma." },
    users: { title: "Usuarios", description: "Usuarios internos y sus asignaciones por tenant." },
    plans: { title: "Planes", description: "Modelo comercial inicial para la plataforma." },
    settings: { title: "Configuración", description: "Configuración global reservada para superadministración." },
  };
  const page = labels[view];
  return <><PageHeader eyebrow="Plataforma" title={page.title} description={page.description} />
    {view === "dashboard" && <Dashboard overview={overview} />}
    {view === "barbershops" && <Barbershops overview={overview} />}
    {view === "users" && <Users overview={overview} />}
    {view === "plans" && <Plans />}
    {view === "settings" && <Settings />}
  </>;
}

function Dashboard({ overview }: { overview: Overview }) {
  return <div className="space-y-7"><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Barberías activas" value={String(overview.barbershops)} detail="Tenants registrados" icon={<Store className="size-4" />} /><MetricCard label="Barberos registrados" value={String(overview.barbers)} detail="Perfiles activos" icon={<UsersRound className="size-4" />} /><MetricCard label="Reservas del mes" value={String(overview.bookings)} detail="Aún sin reservas reales" icon={<BarChart3 className="size-4" />} /><MetricCard label="Clientes registrados" value={String(overview.clients)} detail="Base de clientes" icon={<Building2 className="size-4" />} /></section><Barbershops overview={overview} /></div>;
}

function Barbershops({ overview }: { overview: Overview }) {
  return <Card><CardHeader className="flex flex-row items-center justify-between"><div><CardTitle>Barberías registradas</CardTitle><CardDescription>Detalle operativo por tenant.</CardDescription></div><Button size="sm" variant="outline">Nueva barbería</Button></CardHeader><CardContent className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Barbería</TableHead><TableHead>Slug</TableHead><TableHead>Administrador</TableHead><TableHead>Barberos</TableHead><TableHead>Plan</TableHead><TableHead>Estado</TableHead><TableHead /></TableRow></TableHeader><TableBody>{overview.shops.map((shop) => <TableRow key={shop.id}><TableCell className="font-medium">{shop.name}</TableCell><TableCell><code className="text-xs">/{shop.slug}</code></TableCell><TableCell>{shop.members[0]?.user.name ?? "Sin asignar"}</TableCell><TableCell>{shop.barbers.length}</TableCell><TableCell><Badge variant="secondary">Trial</Badge></TableCell><TableCell><Badge>Activo</Badge></TableCell><TableCell><Button asChild size="sm" variant="outline"><Link href={`/super-admin/barbershops/${shop.id}`}>Ver detalle</Link></Button></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>;
}

function Users({ overview }: { overview: Overview }) {
  return <Card><CardContent className="overflow-x-auto pt-6"><Table><TableHeader><TableRow><TableHead>Barbería</TableHead><TableHead>Administrador</TableHead><TableHead>Barberos asociados</TableHead><TableHead>Estado</TableHead></TableRow></TableHeader><TableBody>{overview.shops.map((shop) => <TableRow key={shop.id}><TableCell className="font-medium">{shop.name}</TableCell><TableCell>{shop.members[0]?.user.name ?? "—"}</TableCell><TableCell>{shop.barbers.length}</TableCell><TableCell><Badge variant="secondary">Activo</Badge></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>;
}

function Plans() {
  return <section className="grid gap-4 md:grid-cols-3"><Plan title="Individual" value="$9.990" detail="Para barberos independientes" status="Borrador" /><Plan title="Barbería" value="$24.990" detail="Para equipos y arriendos" status="Trial" featured /><Plan title="Premium" value="Próximamente" detail="Automatizaciones y reportes" status="Pendiente" /></section>;
}

function Plan({ title, value, detail, status, featured }: { title: string; value: string; detail: string; status: string; featured?: boolean }) {
  return <Card className={featured ? "border-primary" : undefined}><CardHeader><div className="flex items-start justify-between"><CardTitle>{title}</CardTitle><Badge variant={featured ? "default" : "secondary"}>{status}</Badge></div><CardDescription>{detail}</CardDescription></CardHeader><CardContent><p className="font-mono text-2xl font-semibold">{value}</p></CardContent></Card>;
}

function Settings() {
  return <Card><CardHeader><CardTitle>Configuración global</CardTitle><CardDescription>Los ajustes de plataforma se habilitarán al consolidar planes, notificaciones y soporte.</CardDescription></CardHeader><CardContent><div className="flex items-center gap-3 rounded-lg border p-4"><CreditCard className="size-5 text-muted-foreground" /><p className="text-sm">Pagos, límites de planes y soporte: pendientes de implementar.</p></div></CardContent></Card>;
}
