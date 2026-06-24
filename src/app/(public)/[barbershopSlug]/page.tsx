import Link from "next/link";
import { MapPin, Scissors } from "lucide-react";
import { notFound } from "next/navigation";
import { BarberCard } from "@/components/barber-card";
import { PageHeader } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPublicBarbershop } from "@/modules/platform/queries";

export const dynamic = "force-dynamic";

export default async function BarbershopPage({ params }: { params: Promise<{ barbershopSlug: string }> }) {
  const { barbershopSlug } = await params;
  const barbershop = await getPublicBarbershop(barbershopSlug);
  if (!barbershop) notFound();
  return <main className="mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8"><Badge>Reserva online</Badge><PageHeader title={barbershop.name} description="Elige un barbero o revisa los servicios disponibles para reservar tu hora." /><div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"><span className="flex items-center gap-2"><MapPin className="size-4" />{barbershop.address ?? "Pichilemu, Región de O’Higgins"}</span><Button asChild><Link href={`/${barbershop.slug}/book`}>Reservar hora</Link></Button></div><section><div className="mb-4 flex items-center gap-2"><Scissors className="size-4 text-primary" /><h2 className="font-semibold">Barberos disponibles</h2></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{barbershop.barbers.map((barber) => <BarberCard href={`/${barbershop.slug}/${barber.slug}`} key={barber.id} name={barber.publicName} role={barber.user.role} services={barber.services.length} />)}</div></section><section className="mt-10"><h2 className="mb-4 font-semibold">Servicios principales</h2><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{barbershop.services.map((service) => <Card key={service.id}><CardContent className="p-4"><p className="font-medium">{service.name}</p><p className="mt-1 font-mono text-sm">${Number(service.price).toLocaleString("es-CL")}</p><p className="mt-1 text-xs text-muted-foreground">{service.durationMinutes} minutos</p></CardContent></Card>)}</div></section></main>;
}
