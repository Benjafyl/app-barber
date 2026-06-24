import Link from "next/link";
import { CalendarClock, CircleDollarSign, ContactRound, Scissors, WalletCards } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { MetricCard } from "@/components/dashboard/metric-card";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDemoBookings, getDemoClients } from "@/modules/platform/mock-data";
import type { getActiveTenantForCurrentUser } from "@/modules/platform/queries";

type Context = NonNullable<Awaited<ReturnType<typeof getActiveTenantForCurrentUser>>>;
export type BarberView = "today" | "agenda" | "bookings" | "clients" | "services" | "income" | "expenses" | "profile";

const content: Record<BarberView, { title: string; description: string }> = {
  today: { title: "Tu día", description: "La agenda y acciones rápidas para tu jornada." },
  agenda: { title: "Agenda", description: "Bloques de atención y próximos horarios." },
  bookings: { title: "Reservas", description: "Estado de tus próximas atenciones." },
  clients: { title: "Clientes", description: "Historial y preferencias de tus clientes en esta barbería." },
  services: { title: "Servicios", description: "Servicios que puedes ofrecer desde tu perfil." },
  income: { title: "Ingresos", description: "Resumen de ingresos y pagos pendientes." },
  expenses: { title: "Gastos propios", description: "Compras y gastos asociados a tu operación." },
  profile: { title: "Perfil público", description: "Tu presencia y link de reservas dentro de la barbería." },
};

export function BarberWorkspace({ context, view }: { context: Context; view: BarberView }) {
  const { tenant, currentUser } = context;
  const barber = currentUser.barber ?? tenant.barbers[0];
  const bookings = getDemoBookings(tenant.slug);
  const clients = getDemoClients(tenant.slug);
  const page = content[view];

  return <><PageHeader eyebrow={tenant.name} title={page.title} description={page.description} action={view === "profile" ? <Button asChild variant="outline"><Link href={`/${tenant.slug}/${barber.slug}`}>Ver perfil público</Link></Button> : undefined} />
    {view === "today" && <Today barberName={barber.publicName} bookings={bookings} />}
    {view === "agenda" || view === "bookings" && <Bookings bookings={bookings} />}
    {view === "clients" && <Clients clients={clients} />}
    {view === "services" && <Services tenant={tenant} barberName={barber.publicName} />}
    {view === "income" && <Income />}
    {view === "expenses" && <Expenses />}
    {view === "profile" && <Profile barberName={barber.publicName} tenant={tenant} slug={barber.slug} />}
  </>;
}

function Today({ barberName, bookings }: { barberName: string; bookings: ReturnType<typeof getDemoBookings> }) {
  return <div className="space-y-7"><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard label="Reservas hoy" value={String(bookings.length)} detail="2 por confirmar" icon={<CalendarClock className="size-4" />} /><MetricCard label="Ingresos estimados" value="$45.000" detail="Por servicios del día" icon={<CircleDollarSign className="size-4" />} /><MetricCard label="Atenciones realizadas" value="1" detail="Hoy" icon={<ContactRound className="size-4" />} /><MetricCard label="Horas libres" value="4" detail="Disponibilidad restante" icon={<WalletCards className="size-4" />} /></section><Card><CardHeader><CardTitle>Agenda de {barberName}</CardTitle><CardDescription>Acciones de prototipo; las actualizaciones reales se conectarán al módulo de reservas.</CardDescription></CardHeader><CardContent className="space-y-3">{bookings.map((booking) => <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between" key={`${booking.time}-${booking.client}`}><div className="flex gap-4"><span className="font-mono text-sm text-muted-foreground">{booking.time}</span><div><p className="font-medium">{booking.client}</p><p className="text-sm text-muted-foreground">{booking.service}</p></div></div><div className="flex items-center gap-2"><StatusBadge status={booking.status} /><Button size="sm" variant="outline">Ver cliente</Button>{booking.status !== "COMPLETED" && <Button size="sm">Realizado</Button>}</div></div>)}</CardContent></Card></div>;
}

function Bookings({ bookings }: { bookings: ReturnType<typeof getDemoBookings> }) {
  return <Card><CardContent className="overflow-x-auto pt-6"><Table><TableHeader><TableRow><TableHead>Hora</TableHead><TableHead>Cliente</TableHead><TableHead>Servicio</TableHead><TableHead>Estado</TableHead><TableHead>Acciones</TableHead></TableRow></TableHeader><TableBody>{bookings.map((booking) => <TableRow key={`${booking.time}-${booking.client}`}><TableCell className="font-mono">{booking.time}</TableCell><TableCell className="font-medium">{booking.client}</TableCell><TableCell>{booking.service}</TableCell><TableCell><StatusBadge status={booking.status} /></TableCell><TableCell><Button size="sm" variant="outline">Detalle</Button></TableCell></TableRow>)}</TableBody></Table></CardContent></Card>;
}

function Clients({ clients }: { clients: ReturnType<typeof getDemoClients> }) {
  return <Card><CardContent className="overflow-x-auto pt-6"><Table><TableHeader><TableRow><TableHead>Cliente</TableHead><TableHead>Teléfono</TableHead><TableHead>Última visita</TableHead><TableHead>Visitas</TableHead><TableHead>Servicio frecuente</TableHead></TableRow></TableHeader><TableBody>{clients.map((client) => <TableRow key={client.id}><TableCell className="font-medium">{client.name}</TableCell><TableCell>{client.phone}</TableCell><TableCell>{client.lastVisit}</TableCell><TableCell>{client.visits}</TableCell><TableCell>{client.frequentService}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card>;
}

function Services({ tenant, barberName }: { tenant: Context["tenant"]; barberName: string }) {
  return <section className="grid gap-4 sm:grid-cols-2">{tenant.services.map((service) => <Card key={service.id}><CardHeader><div className="flex items-start justify-between gap-3"><div><CardTitle>{service.name}</CardTitle><CardDescription>{service.durationMinutes} minutos</CardDescription></div><Badge variant="secondary">Activo</Badge></div></CardHeader><CardContent><p className="font-mono text-lg">${Number(service.price).toLocaleString("es-CL")}</p><p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><Scissors className="size-4" /> Disponible para {barberName}</p></CardContent></Card>)}</section>;
}

function Income() {
  return <div className="grid gap-4 md:grid-cols-2"><Card><CardHeader><CardTitle>Ingresos del día</CardTitle><CardDescription>Estimación en base a reservas demostrativas.</CardDescription></CardHeader><CardContent><p className="font-mono text-3xl font-semibold">$45.000</p><p className="mt-2 text-sm text-muted-foreground">1 pago confirmado · 1 pago pendiente</p></CardContent></Card><Card><CardHeader><CardTitle>Ingresos del mes</CardTitle><CardDescription>Se calculará desde atenciones y pagos reales.</CardDescription></CardHeader><CardContent><p className="font-mono text-3xl font-semibold">$285.000</p><p className="mt-2 text-sm text-muted-foreground">Datos mock para navegación.</p></CardContent></Card></div>;
}

function Expenses() {
  return <Card><CardContent className="flex min-h-64 flex-col items-center justify-center text-center"><span className="grid size-10 place-items-center rounded-full bg-muted text-muted-foreground"><WalletCards className="size-5" /></span><h2 className="mt-4 font-semibold">Sin gastos personales</h2><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Registra productos o herramientas cuando se habilite el módulo de gastos.</p><Button className="mt-5" variant="outline">Registrar gasto</Button></CardContent></Card>;
}

function Profile({ barberName, tenant, slug }: { barberName: string; tenant: Context["tenant"]; slug: string }) {
  return <div className="grid gap-4 md:grid-cols-[1fr_320px]"><Card><CardHeader><CardTitle>{barberName}</CardTitle><CardDescription>{tenant.name}</CardDescription></CardHeader><CardContent><p className="mb-4 text-sm text-muted-foreground">Perfil público preparado para recibir reservas dentro de la agenda de la barbería.</p><code className="rounded bg-muted px-3 py-2 text-sm">/{tenant.slug}/{slug}</code></CardContent></Card><Card><CardHeader><CardTitle>Servicios</CardTitle></CardHeader><CardContent className="space-y-2">{tenant.services.map((service) => <div className="flex justify-between text-sm" key={service.id}><span>{service.name}</span><span className="text-muted-foreground">{service.durationMinutes} min</span></div>)}</CardContent></Card></div>;
}
