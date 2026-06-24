import Link from "next/link";
import { ArrowLeft, Clock3, MapPin } from "lucide-react";
import { BookingForm } from "@/components/booking/booking-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function BarberBookingPage({ params }: { params: Promise<{ barbershopSlug: string; barberSlug: string }> }) {
  const { barbershopSlug, barberSlug } = await params;
  const barberName = barberSlug[0]?.toUpperCase() + barberSlug.slice(1);

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-5 py-8 sm:px-8">
      <Link href={`/${barbershopSlug}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Volver a barberos</Link>
      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_380px]">
        <section>
          <Badge>Reserva con {barberName}</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Elige tu hora</h1>
          <p className="mt-3 text-muted-foreground">Flujo público inicial: servicio, disponibilidad y confirmación se conectarán al calendario real al implementar el módulo de reservas.</p>
          <div className="mt-8 grid gap-3">
            {[
              ["Corte básico", "$12.000", "30 min"],
              ["Degradado", "$15.000", "45 min"],
              ["Corte + barba", "$18.000", "60 min"],
            ].map(([service, price, duration]) => <Card key={service} className="py-0"><CardContent className="flex items-center justify-between p-4"><div><p className="font-medium">{service}</p><p className="text-sm text-muted-foreground">{price}</p></div><span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock3 className="size-4" />{duration}</span></CardContent></Card>)}
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4" /> Pichilemu, Región de O&apos;Higgins</p>
        </section>
        <Card className="h-fit">
          <CardHeader><CardTitle>Confirma tus datos</CardTitle><CardDescription>Sin necesidad de crear una cuenta.</CardDescription></CardHeader>
          <CardContent><BookingForm barbershopSlug={barbershopSlug} barberSlug={barberSlug} /></CardContent>
        </Card>
      </div>
    </main>
  );
}
