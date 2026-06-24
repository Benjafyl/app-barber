"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, Clock3 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { createBookingSchema, type CreateBookingInput } from "@/modules/bookings/schemas";

type ServiceOption = { id: string; name: string; price: string; durationMinutes: number };
type BookingFormProps = { barbershopSlug: string; barberSlug: string; services: ServiceOption[] };

const availableTimes = ["10:00", "10:45", "11:30", "12:15", "15:00", "15:45", "16:30", "17:15"];

export function BookingForm({ barbershopSlug, barberSlug, services }: BookingFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [time, setTime] = useState("10:00");
  const [day, setDay] = useState("Hoy");
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id ?? "demo-service");
  const form = useForm<CreateBookingInput>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: { barbershopSlug, barberSlug, clientName: "", clientPhone: "", clientEmail: "", clientInstagram: "", customerNote: "", serviceId: services[0]?.id ?? "demo-service", startsAt: new Date() },
  });
  const selectedService = services.find((service) => service.id === selectedServiceId);

  async function submit(values: CreateBookingInput) {
    const params = new URLSearchParams({ barber: barberSlug, service: selectedService?.name ?? "Servicio", time, day, client: values.clientName });
    router.push(`/${barbershopSlug}/book/success?${params.toString()}`);
  }

  return <form className="space-y-5" onSubmit={form.handleSubmit(submit)} noValidate>
    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground"><span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">{step}</span><span>{step === 1 ? "Servicio y horario" : "Tus datos"}</span></div>
    {step === 1 && <><div className="grid gap-2"><Label>Servicio</Label><div className="grid gap-2">{services.map((service) => <button className={cn("flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors", selectedService?.id === service.id ? "border-primary bg-primary/5" : "hover:bg-muted")} key={service.id} onClick={() => { form.setValue("serviceId", service.id); setSelectedServiceId(service.id); }} type="button"><span><strong className="block">{service.name}</strong><span className="text-muted-foreground">${Number(service.price).toLocaleString("es-CL")}</span></span><span className="flex items-center gap-1 text-muted-foreground"><Clock3 className="size-3.5" />{service.durationMinutes} min</span></button>)}</div></div><div className="grid gap-2"><Label>Día</Label><div className="grid grid-cols-3 gap-2">{["Hoy", "Mañana", "Vie. 27"].map((item) => <Button className={cn(day === item && "border-primary")} key={item} onClick={() => setDay(item)} type="button" variant="outline">{item}</Button>)}</div></div><div className="grid gap-2"><Label>Hora disponible</Label><div className="grid grid-cols-4 gap-2">{availableTimes.map((item) => <Button className={cn("font-mono", time === item && "border-primary bg-primary text-primary-foreground hover:bg-primary/90")} key={item} onClick={() => setTime(item)} type="button" variant="outline">{item}</Button>)}</div></div><Button className="w-full" onClick={() => setStep(2)} type="button">Continuar</Button></>}
    {step === 2 && <><div className="rounded-lg border bg-muted/30 p-3 text-sm"><p className="font-medium">{selectedService?.name}</p><p className="mt-1 text-muted-foreground">{day} · {time} · {selectedService?.durationMinutes} min</p></div><div className="grid gap-2"><Label htmlFor="clientName">Tu nombre</Label><Input id="clientName" placeholder="Ej. Benjamín Soto" {...form.register("clientName")} />{form.formState.errors.clientName && <p className="text-xs text-destructive">Ingresa tu nombre.</p>}</div><div className="grid gap-2"><Label htmlFor="clientPhone">Teléfono</Label><Input id="clientPhone" inputMode="tel" placeholder="+56 9 1234 5678" {...form.register("clientPhone")} />{form.formState.errors.clientPhone && <p className="text-xs text-destructive">Ingresa un teléfono válido.</p>}</div><div className="grid gap-2"><Label htmlFor="clientInstagram">Instagram <span className="text-muted-foreground">(opcional)</span></Label><Input id="clientInstagram" placeholder="@usuario" {...form.register("clientInstagram")} /></div><div className="grid gap-2"><Label htmlFor="clientEmail">Correo <span className="text-muted-foreground">(opcional)</span></Label><Input id="clientEmail" type="email" placeholder="tu@correo.cl" {...form.register("clientEmail")} /></div><div className="flex gap-2"><Button className="flex-1" onClick={() => setStep(1)} type="button" variant="outline">Volver</Button><Button className="flex-1" type="submit"><CalendarCheck className="size-4" />Confirmar hora</Button></div></>}
  </form>;
}
