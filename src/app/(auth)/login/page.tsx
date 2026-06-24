import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthForm } from "@/modules/auth/components/auth-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-5">
      <Card className="w-full max-w-sm"><CardHeader><CardTitle>Ingresar al panel</CardTitle><CardDescription>Acceso para barberos y administradores.</CardDescription></CardHeader><CardContent>
        <AuthForm mode="login" />
        <p className="mt-5 text-center text-sm text-muted-foreground">¿Primera vez? <Link className="text-foreground underline" href="/register">Crea el acceso inicial</Link></p>
      </CardContent></Card>
    </main>
  );
}
