import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/booking/booking-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getBarberProfile } from "@/modules/platform/queries";

export const dynamic = "force-dynamic";

export default async function BarberBookingPage({ params }: { params: Promise<{ barbershopSlug: string; barberSlug: string }> }) {
  const { barbershopSlug, barberSlug } = await params;
  const barber = await getBarberProfile(barbershopSlug, barberSlug);
  if (!barber) notFound();
  const services = barber.services.map(({ service }) => ({ id: service.id, name: service.name, price: service.price.toString(), durationMinutes: service.durationMinutes }));
  return <main className="mx-auto min-h-screen max-w-5xl px-5 py-8 sm:px-8"><Link className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground" href={`/${barbershopSlug}`}><ArrowLeft className="size-4" />Volver a {barber.barbershop.name}</Link><div className="mt-8 grid gap-8 md:grid-cols-[1fr_390px]"><section><Badge>{barber.barbershop.name}</Badge><h1 className="mt-4 text-4xl font-semibold tracking-tight">Reserva con {barber.publicName}</h1><p className="mt-3 max-w-xl leading-7 text-muted-foreground">Elige el servicio y un horario disponible. No necesitas crear una cuenta.</p><div className="mt-8 rounded-xl border bg-muted/20 p-5"><h2 className="font-semibold">Horario de atención</h2><p className="mt-2 text-sm text-muted-foreground">Lunes a viernes · 10:00 a 19:00<br />Sábado · 10:00 a 15:00</p><p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4" />{barber.barbershop.address ?? "Pichilemu, Región de O’Higgins"}</p></div></section><Card className="h-fit"><CardHeader><CardTitle>Reserva tu hora</CardTitle><CardDescription>Los horarios son demostrativos por ahora.</CardDescription></CardHeader><CardContent><BookingForm barbershopSlug={barbershopSlug} barberSlug={barberSlug} services={services} /></CardContent></Card></div></main>;
}
