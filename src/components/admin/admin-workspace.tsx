import Link from "next/link";
import { CalendarDays, CircleDollarSign, ContactRound, ReceiptText, UsersRound } from "lucide-react";
import { BarberCard } from "@/components/barber-card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { PageHeader } from "@/components/app-shell";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDemoBookings, getDemoClients } from "@/modules/platform/mock-data";
import type { getTenantOverview } from "@/modules/platform/queries";

type Tenant = NonNullable<Awaited<ReturnType<typeof getTenantOverview>>>;
export type AdminView = "dashboard" | "agenda" | "barbers" | "clients" | "bookings" | "services" | "expenses" | "rents" | "settings";

const viewContent: Record<AdminView, { title: string; description: string }> = {
  dashboard: { title: "Resumen del local", description: "Visión operativa de la barbería activa para hoy." },
  agenda: { title: "Agenda general", description: "Todas las reservas del local, filtradas por barbería activa." },
  barbers: { title: "Barberos", description: "Equipo activo, roles y disponibilidad de la barbería." },
  clients: { title: "Clientes", description: "Clientes y visitas asociadas exclusivamente a esta barbería." },
  bookings: { title: "Reservas", description: "Seguimiento visual de la agenda y estados de pago." },
  services: { title: "Servicios", description: "Catálogo propio del local y los barberos que lo ofrecen." },
  expenses: { title: "Gastos", description: "Registro de gastos generales del local." },
  rents: { title: "Arriendos", description: "Control de sillas, acuerdos internos y pagos pendientes." },
  settings: { title: "Configuración", description: "Datos públicos, reglas de reserva y operación del local." },
};

const money = (value: number | string) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(Number(value));

export function AdminWorkspace({ tenant, view }: { tenant: Tenant; view: AdminView }) {
  const content = viewContent[view];
  const bookings = getDemoBookings(tenant.slug);
  const clients = getDemoClients(tenant.slug);
  const tenantQuery = `?barbershop=${tenant.slug}`;

  return <>
    <PageHeader eyebrow={tenant.name} title={content.title} description={content.description} action={view === "services" ? <Button>Nuevo servicio</Button> : view === "barbers" ? <Button>Invitar barbero</Button> : undefined} />
    {view === "dashboard" && <Dashboard tenant={tenant} bookings={bookings} tenantQuery={tenantQuery} />}
    {view === "agenda" && <Agenda bookings={bookings} tenant={tenant} />}
    {view === "barbers" && <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{tenant.barbers.map((barber) => <BarberCard detailHref={`/admin/barbers${tenantQuery}`} href={`/${tenant.slug}/${barber.slug}`} key={barber.id} name={barber.publicName} role={barber.user.role} services={4} />)}</section>}
    {view === "clients" && <Clients clients={clients} />}
    {view === "bookings" && <Bookings bookings={bookings} tenant={tenant} />}
    {view === "services" && <Services tenant={tenant} />}
    {view === "expenses" && <EmptyLedger icon={<ReceiptText className="size-5" />} title="Aún no hay gastos registrados" text="Los gastos reales aparecerán aquí por categoría, responsable y fecha." action="Registrar gasto" />}
    {view === "rents" && <Rents tenant={tenant} />}
    {view === "settings" && <Settings tenant={tenant} />}
  </>;
}

function Dashboard({ tenant, bookings, tenantQuery }: { tenant: Tenant; bookings: ReturnType<typeof getDemoBookings>; tenantQuery: string }) {
  return <div className="space-y-7"><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Reservas de hoy" value={String(bookings.length)} detail="Datos de prototipo" icon={<CalendarDays className="size-4" />} /><MetricCard label="Atenciones realizadas" value={String(tenant.metrics.completedCount)} detail="Conectado a la base" icon={<ContactRound className="size-4" />} /><MetricCard label="Ingresos estimados" value="$45.000" detail="Mock hasta registrar pagos" icon={<CircleDollarSign className="size-4" />} /><MetricCard label="Arriendos pendientes" value={String(tenant.rentAgreements.filter((item) => item.status === "PENDING").length)} detail="Requieren configuración" icon={<ReceiptText className="size-4" />} /></section><Card><CardHeader className="flex flex-row items-center justify-between"><div><CardTitle>Rendimiento por barbero</CardTitle><CardDescription>El equipo activo de {tenant.name}.</CardDescription></div><Button asChild size="sm" variant="outline"><Link href={`/admin/barbers${tenantQuery}`}>Ver equipo</Link></Button></CardHeader><CardContent className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Barbero</TableHead><TableHead>Reservas hoy</TableHead><TableHead>Ingresos estimados</TableHead><TableHead>Estado</TableHead></TableRow></TableHeader><TableBody>{tenant.barbers.map((barber, index) => <TableRow key={barber.id}><TableCell className="font-medium">{barber.publicName}</TableCell><TableCell>{Math.max(1, bookings.length - index)}</TableCell><TableCell className="font-mono">{money((index + 1) * 15000)}</TableCell><TableCell><Badge variant="secondary">Activo</Badge></TableCell></TableRow>)}</TableBody></Table></CardContent></Card></div>;
}

function Agenda({ tenant, bookings }: { tenant: Tenant; bookings: ReturnType<typeof getDemoBookings> }) {
  return <Card><CardHeader><CardTitle>Hoy · {tenant.name}</CardTitle><CardDescription>Horario de atención y estados de reserva de ejemplo.</CardDescription></CardHeader><CardContent className="space-y-3">{bookings.map((booking, index) => <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border p-4" key={`${booking.time}-${booking.client}`}><div className="flex gap-4"><span className="font-mono text-sm text-muted-foreground">{booking.time}</span><div><p className="font-medium">{booking.client}</p><p className="text-sm text-muted-foreground">{tenant.barbers[index % tenant.barbers.length]?.publicName} · {booking.service}</p></div></div><StatusBadge status={booking.status} /></div>)}</CardContent></Card>;
}

function Clients({ clients }: { clients: ReturnType<typeof getDemoClients> }) {
  return <Card><CardContent className="overflow-x-auto pt-6"><Table><TableHeader><TableRow><TableHead>Cliente</TableHead><TableHead>Teléfono</TableHead><TableHead>Última visita</TableHead><TableHead>Visitas</TableHead><TableHead>Servicio frecuente</TableHead></TableRow></TableHeader><TableBody>{clients.map((client) => <TableRow key={client.id}><TableCell className="font-medium">{client.name}</TableCell><TableCell>{client.phone}</TableCell><TableCell>{client.lastVisit}</TableCell><TableCell>{client.visits}</TableCell><TableCell>{client.frequentService}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card>;
}

function Bookings({ tenant, bookings }: { tenant: Tenant; bookings: ReturnType<typeof getDemoBookings> }) {
  return <Card><CardContent className="overflow-x-auto pt-6"><Table><TableHeader><TableRow><TableHead>Hora</TableHead><TableHead>Cliente</TableHead><TableHead>Barbero</TableHead><TableHead>Servicio</TableHead><TableHead>Estado</TableHead><TableHead>Pago</TableHead></TableRow></TableHeader><TableBody>{bookings.map((booking, index) => <TableRow key={`${booking.time}-${booking.client}`}><TableCell className="font-mono">{booking.time}</TableCell><TableCell className="font-medium">{booking.client}</TableCell><TableCell>{tenant.barbers[index % tenant.barbers.length]?.publicName}</TableCell><TableCell>{booking.service}</TableCell><TableCell><StatusBadge status={booking.status} /></TableCell><TableCell>{booking.payment}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card>;
}

function Services({ tenant }: { tenant: Tenant }) {
  return <Card><CardContent className="overflow-x-auto pt-6"><Table><TableHeader><TableRow><TableHead>Servicio</TableHead><TableHead>Precio</TableHead><TableHead>Duración</TableHead><TableHead>Barberos asociados</TableHead><TableHead>Estado</TableHead></TableRow></TableHeader><TableBody>{tenant.services.map((service) => <TableRow key={service.id}><TableCell className="font-medium">{service.name}</TableCell><TableCell className="font-mono">{money(service.price.toString())}</TableCell><TableCell>{service.durationMinutes} min</TableCell><TableCell>{tenant.barbers.length}</TableCell><TableCell><Badge variant="secondary">Activo</Badge></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>;
}

function Rents({ tenant }: { tenant: Tenant }) {
  if (tenant.rentAgreements.length === 0) return <EmptyLedger icon={<UsersRound className="size-5" />} title="Sin arriendos internos" text="Esta barbería no tiene acuerdos de subarriendo pendientes." />;
  return <Card><CardHeader><CardTitle>Subarriendo de sillas</CardTitle><CardDescription>Los montos se mantienen en cero hasta que el administrador los configure.</CardDescription></CardHeader><CardContent className="overflow-x-auto"><Table><TableHeader><TableRow><TableHead>Barbero</TableHead><TableHead>Monto acordado</TableHead><TableHead>Periodicidad</TableHead><TableHead>Estado</TableHead><TableHead>Nota</TableHead></TableRow></TableHeader><TableBody>{tenant.rentAgreements.map((agreement) => <TableRow key={agreement.id}><TableCell className="font-medium">{agreement.barber.publicName}</TableCell><TableCell>{money(agreement.amount.toString())}</TableCell><TableCell>Mensual</TableCell><TableCell><StatusBadge status={agreement.status} /></TableCell><TableCell className="max-w-72 text-muted-foreground">{agreement.notes}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card>;
}

function Settings({ tenant }: { tenant: Tenant }) {
  return <div className="grid gap-4 md:grid-cols-2"><Card><CardHeader><CardTitle>Datos públicos</CardTitle><CardDescription>Lo que ven los clientes al reservar.</CardDescription></CardHeader><CardContent className="space-y-3 text-sm"><p><span className="text-muted-foreground">Nombre</span><br /><strong>{tenant.name}</strong></p><p><span className="text-muted-foreground">Link público</span><br /><code>/{tenant.slug}</code></p></CardContent></Card><Card><CardHeader><CardTitle>Reglas de reserva</CardTitle><CardDescription>Configuración inicial del prototipo.</CardDescription></CardHeader><CardContent className="space-y-3 text-sm"><p>Anticipación mínima: <strong>{tenant.minimumBookingNotice} min</strong></p><p>Cancelación: <strong>{tenant.cancellationNotice} min antes</strong></p></CardContent></Card></div>;
}

function EmptyLedger({ icon, title, text, action }: { icon: React.ReactNode; title: string; text: string; action?: string }) {
  return <Card><CardContent className="flex min-h-64 flex-col items-center justify-center text-center"><span className="mb-4 grid size-10 place-items-center rounded-full bg-muted text-muted-foreground">{icon}</span><h2 className="font-semibold">{title}</h2><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{text}</p>{action && <Button className="mt-5" variant="outline">{action}</Button>}</CardContent></Card>;
}
