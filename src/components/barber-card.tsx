import Link from "next/link";
import { CalendarDays, Scissors } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type BarberCardProps = { name: string; role: string; href: string; services?: number; detailHref?: string };

export function BarberCard({ name, role, href, services = 4, detailHref }: BarberCardProps) {
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2);
  return <Card><CardHeader className="flex flex-row items-center gap-3 space-y-0"><Avatar><AvatarFallback>{initials}</AvatarFallback></Avatar><div><CardTitle className="text-base">{name}</CardTitle><Badge className="mt-1" variant="secondary">{role === "BARBERSHOP_ADMIN" ? "Administrador y barbero" : "Barbero"}</Badge></div></CardHeader><CardContent><p className="flex items-center gap-2 text-sm text-muted-foreground"><Scissors className="size-4" /> {services} servicios activos</p></CardContent><CardFooter className="flex gap-2"><Button asChild className="flex-1" size="sm"><Link href={href}><CalendarDays className="size-4" />Reservar</Link></Button>{detailHref && <Button asChild size="sm" variant="outline"><Link href={detailHref}>Ver</Link></Button>}</CardFooter></Card>;
}
