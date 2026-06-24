import { notFound } from "next/navigation";
import { PageHeader } from "@/components/app-shell";
import { BarberCard } from "@/components/barber-card";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPrisma } from "@/lib/prisma";

export default async function BarbershopDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const barbershop = await getPrisma().barbershop.findUnique({ where: { id }, include: { barbers: { include: { user: true } }, services: true, rentAgreements: { include: { barber: true } } } });
  if (!barbershop) notFound();
  return <><PageHeader eyebrow="Super administración" title={barbershop.name} description={`Tenant /${barbershop.slug}`} /><section className="grid gap-4 md:grid-cols-3"><Card><CardHeader><CardTitle>Datos generales</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p>Estado: <strong>Activo</strong></p><p>Barberos: <strong>{barbershop.barbers.length}</strong></p><p>Servicios: <strong>{barbershop.services.length}</strong></p></CardContent></Card><Card className="md:col-span-2"><CardHeader><CardTitle>Arriendos internos</CardTitle><CardDescription>Acuerdos asociados a esta barbería.</CardDescription></CardHeader><CardContent className="space-y-2">{barbershop.rentAgreements.length ? barbershop.rentAgreements.map((rent) => <div className="flex items-center justify-between rounded border p-3 text-sm" key={rent.id}><span>{rent.barber.publicName}</span><StatusBadge status={rent.status} /></div>) : <p className="text-sm text-muted-foreground">Sin acuerdos internos.</p>}</CardContent></Card></section><section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{barbershop.barbers.map((barber) => <BarberCard href={`/${barbershop.slug}/${barber.slug}`} key={barber.id} name={barber.publicName} role={barber.user.role} services={barbershop.services.length} />)}</section></>;
}
