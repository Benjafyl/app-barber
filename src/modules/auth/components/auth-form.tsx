"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
  email: z.email("Ingresa un correo válido."),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres."),
});

const registerSchema = loginSchema.extend({
  name: z.string().trim().min(2, "Ingresa tu nombre."),
});

type AuthFormProps = { mode: "login" | "register" };

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string>();
  const isRegister = mode === "register";
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function submit(values: z.infer<typeof registerSchema>) {
    setServerError(undefined);
    const result = isRegister
      ? await authClient.signUp.email(values)
      : await authClient.signIn.email({ email: values.email, password: values.password });

    if (result.error) {
      setServerError(result.error.message ?? "No fue posible completar la solicitud.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(submit)} noValidate>
      {isRegister && <div className="grid gap-2"><Label htmlFor="name">Nombre</Label><Input id="name" autoComplete="name" {...form.register("name")} />{form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}</div>}
      <div className="grid gap-2"><Label htmlFor="email">Correo</Label><Input id="email" type="email" autoComplete="email" {...form.register("email")} />{form.formState.errors.email && <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>}</div>
      <div className="grid gap-2"><Label htmlFor="password">Contraseña</Label><Input id="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} {...form.register("password")} />{form.formState.errors.password && <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>}</div>
      {serverError && <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{serverError}</p>}
      <Button className="w-full" disabled={form.formState.isSubmitting} type="submit">{form.formState.isSubmitting ? "Procesando..." : isRegister ? "Crear cuenta" : "Ingresar"}</Button>
    </form>
  );
}
