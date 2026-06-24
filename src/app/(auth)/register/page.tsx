import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthForm } from "@/modules/auth/components/auth-form";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-5">
      <Card className="w-full max-w-sm"><CardHeader><CardTitle>Crear acceso interno</CardTitle><CardDescription>Crea el primer acceso de barbero; después podrás asociarlo a una barbería.</CardDescription></CardHeader><CardContent>
        <AuthForm mode="register" />
        <p className="mt-5 text-center text-sm text-muted-foreground"><Link className="underline" href="/login">Volver a ingresar</Link></p>
      </CardContent></Card>
    </main>
  );
}
