"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBookingSchema, type CreateBookingInput } from "@/modules/bookings/schemas";

type BookingFormProps = {
  barbershopSlug: string;
  barberSlug: string;
};

export function BookingForm({ barbershopSlug, barberSlug }: BookingFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<CreateBookingInput>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: {
      barbershopSlug,
      barberSlug,
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      clientInstagram: "",
      customerNote: "",
      serviceId: "demo-service",
      startsAt: new Date(),
    },
  });

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm text-emerald-900 dark:text-emerald-200">
        <CalendarCheck className="mb-3 size-5" />
        Solicitud recibida. El siguiente hito conecta este formulario a la creación transaccional de reservas y confirmación por correo.
      </div>
    );
  }

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(() => setSubmitted(true))}
      noValidate
    >
      <div className="grid gap-2">
        <Label htmlFor="clientName">Tu nombre</Label>
        <Input id="clientName" placeholder="Ej. Benjamín Soto" {...form.register("clientName")} />
        {form.formState.errors.clientName && <p className="text-xs text-destructive">Ingresa tu nombre.</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="clientPhone">Teléfono</Label>
        <Input id="clientPhone" inputMode="tel" placeholder="+56 9 1234 5678" {...form.register("clientPhone")} />
        {form.formState.errors.clientPhone && <p className="text-xs text-destructive">Ingresa un teléfono válido.</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="clientEmail">Correo <span className="text-muted-foreground">(opcional)</span></Label>
        <Input id="clientEmail" type="email" placeholder="tu@correo.cl" {...form.register("clientEmail")} />
      </div>
      <Button className="w-full" type="submit">Continuar con la reserva</Button>
    </form>
  );
}
