import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConfirmBookingPage() {
  return <main className="flex min-h-screen items-center justify-center bg-muted/30 p-5"><Card className="w-full max-w-md text-center"><CardHeader><CircleCheck className="mx-auto size-10 text-primary" /><CardTitle>Asistencia confirmada</CardTitle><CardDescription>Gracias. La barbería verá tu confirmación en su agenda.</CardDescription></CardHeader><CardContent><Button asChild><Link href="/">Ir al inicio</Link></Button></CardContent></Card></main>;
}
