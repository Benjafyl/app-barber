import Link from "next/link";
import { Building2, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { PageHeader } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUserContext } from "@/modules/platform/queries";

export const dynamic = "force-dynamic";

export default async function SelectBarbershopPage() {
  const currentUser = await getCurrentUserContext();
  if (!currentUser) redirect("/login");
  if (currentUser.role === "SUPER_ADMIN") redirect("/super-admin");

  return <main className="mx-auto min-h-screen max-w-5xl px-5 py-10 sm:px-8"><PageHeader eyebrow="Contexto activo" title="Elige una barbería" description="Tus datos y pantallas privadas siempre se filtran por la barbería seleccionada." />
    <section className="grid gap-4 md:grid-cols-2">{currentUser.memberships.map((membership) => { const isAdmin = membership.role === "BARBERSHOP_ADMIN"; const href = isAdmin ? `/admin/dashboard?barbershop=${membership.barbershop.slug}` : `/dashboard?barbershop=${membership.barbershop.slug}`; return <Card key={membership.id} className="transition-colors hover:border-primary"><CardContent className="p-6"><div className="flex items-start justify-between gap-3"><span className="grid size-10 place-items-center rounded-xl bg-muted"><Building2 className="size-5" /></span><Badge variant={isAdmin ? "default" : "secondary"}>{isAdmin ? "Administrador" : "Barbero"}</Badge></div><h2 className="mt-6 text-xl font-semibold">{membership.barbershop.name}</h2><p className="mt-2 text-sm text-muted-foreground">/{membership.barbershop.slug}</p><Link className="mt-6 inline-flex text-sm font-medium underline underline-offset-4" href={href}>Entrar a esta barbería</Link></CardContent></Card>; })}</section>
    {currentUser.memberships.length === 0 && <Card><CardContent className="flex min-h-48 flex-col items-center justify-center text-center"><ShieldCheck className="size-6 text-muted-foreground" /><h2 className="mt-3 font-semibold">Sin barberías asignadas</h2><p className="mt-2 text-sm text-muted-foreground">Un administrador debe asociarte a una barbería.</p></CardContent></Card>}
  </main>;
}
