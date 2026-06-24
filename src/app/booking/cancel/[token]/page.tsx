import Link from "next/link";
import { CalendarX2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CancelBookingPage() {
  return <main className="flex min-h-screen items-center justify-center bg-muted/30 p-5"><Card className="w-full max-w-md text-center"><CardHeader><CalendarX2 className="mx-auto size-10 text-destructive" /><CardTitle>Cancelar reserva</CardTitle><CardDescription>Esta pantalla prepara el flujo de cancelación con token seguro.</CardDescription></CardHeader><CardContent><Button variant="destructive">Cancelar reserva</Button><Button asChild className="mt-3" variant="ghost"><Link href="/">Volver</Link></Button></CardContent></Card></main>;
}
