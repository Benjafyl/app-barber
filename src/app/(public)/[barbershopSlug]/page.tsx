import Link from "next/link";
import { MapPin, Scissors } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default async function BarbershopPage({ params }: { params: Promise<{ barbershopSlug: string }> }) {
  const { barbershopSlug } = await params;
  const displayName = barbershopSlug.split("-").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" ");
  const barbers = ["Ignacio", "Tomás", "Diego"];

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-10 sm:px-8">
      <Badge variant="secondary">Reservas online</Badge>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Barbería {displayName}</h1>
      <p className="mt-3 flex items-center gap-2 text-muted-foreground"><MapPin className="size-4" /> Pichilemu, Región de O&apos;Higgins</p>
      <p className="mt-7 max-w-xl leading-7 text-muted-foreground">Elige a tu barbero y reserva en pocos pasos. Verás únicamente horarios disponibles.</p>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        {barbers.map((barber) => (
          <Card key={barber}>
            <CardHeader>
              <Scissors className="mb-3 size-5 text-primary" />
              <CardTitle>{barber}</CardTitle>
              <CardDescription>Barbero disponible</CardDescription>
            </CardHeader>
            <CardContent><p className="text-sm text-muted-foreground">Corte, degradado y barba.</p></CardContent>
            <CardFooter><Button asChild className="w-full"><Link href={`/${barbershopSlug}/${barber.toLowerCase()}`}>Reservar</Link></Button></CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}
