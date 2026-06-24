import { notFound } from "next/navigation";
import { BookingForm } from "@/components/booking/booking-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicBarbershop } from "@/modules/platform/queries";

export const dynamic = "force-dynamic";

export default async function BookPage({ params, searchParams }: { params: Promise<{ barbershopSlug: string }>; searchParams: Promise<{ barber?: string }> }) {
  const { barbershopSlug } = await params;
  const { barber: barberSlug } = await searchParams;
  const barbershop = await getPublicBarbershop(barbershopSlug);
  if (!barbershop) notFound();
  const barber = barberSlug ? barbershop.barbers.find((item) => item.slug === barberSlug) : barbershop.barbers[0];
  if (!barber) notFound();
  const services = barber.services.map(({ service }) => ({ id: service.id, name: service.name, price: service.price.toString(), durationMinutes: service.durationMinutes }));
  return <main className="mx-auto flex min-h-screen max-w-xl items-center px-5 py-10"><Card className="w-full"><CardHeader><CardTitle>Reserva en {barbershop.name}</CardTitle><CardDescription>Atención con {barber.publicName}.</CardDescription></CardHeader><CardContent><BookingForm barbershopSlug={barbershop.slug} barberSlug={barber.slug} services={services} /></CardContent></Card></main>;
}
