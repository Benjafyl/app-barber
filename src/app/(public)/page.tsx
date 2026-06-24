import Link from "next/link";
import { ArrowRight, CalendarDays, ChartNoAxesCombined, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    title: "Reservas sin chat infinito",
    description: "Un link público muestra horarios disponibles y captura los datos justos del cliente.",
    icon: CalendarDays,
  },
  {
    title: "La atención genera el registro",
    description: "Al marcar una cita como realizada, se conectan cliente, servicio, ingreso e historial.",
    icon: Scissors,
  },
  {
    title: "Decisiones con datos reales",
    description: "Paneles simples para saber cuánto entra, quién vuelve y cómo rinde cada barbero.",
    icon: ChartNoAxesCombined,
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-center px-5 py-16 sm:px-8">
        <p className="mb-5 text-sm font-semibold tracking-wide text-primary">APP BARBER · PICHILEMU</p>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-6xl">
          Que el barbero corte. Que la app ordene el negocio.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Agenda, reservas y control simple para barberos independientes y barberías locales. Diseñado primero para el celular y para el ritmo real del trabajo.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/avenida-cabell">Ver reserva de ejemplo <ArrowRight /></Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/login">Ingresar al panel</Link>
          </Button>
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-12 sm:grid-cols-3 sm:px-8">
          {benefits.map(({ title, description, icon: Icon }) => (
            <Card key={title} className="border-none bg-background shadow-none">
              <CardHeader>
                <Icon className="mb-4 size-5 text-primary" />
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent><CardDescription className="leading-6">{description}</CardDescription></CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
