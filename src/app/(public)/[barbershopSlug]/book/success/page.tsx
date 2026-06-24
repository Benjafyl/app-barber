import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function BookingSuccessPage({ params, searchParams }: { params: Promise<{ barbershopSlug: string }>; searchParams: Promise<{ client?: string; barber?: string; service?: string; day?: string; time?: string }> }) {
  const { barbershopSlug } = await params;
  const details = await searchParams;
  return <main className="flex min-h-screen items-center justify-center bg-muted/30 p-5"><Card className="w-full max-w-md text-center"><CardHeader><span className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-500/15 text-emerald-600"><CalendarCheck2 className="size-6" /></span><CardTitle className="mt-4">Solicitud confirmada</CardTitle><CardDescription>Tu hora quedó reservada como demostración del flujo.</CardDescription></CardHeader><CardContent className="space-y-2 text-sm"><p><strong>{details.client ?? "Cliente"}</strong>, reservaste con {details.barber ?? "barbero"}.</p><p className="text-muted-foreground">{details.service} · {details.day} · {details.time}</p><Button asChild className="mt-5"><Link href={`/${barbershopSlug}`}>Volver a la barbería</Link></Button></CardContent></Card></main>;
}
