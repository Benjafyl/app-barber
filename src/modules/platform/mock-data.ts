export type DemoBooking = {
  time: string;
  client: string;
  service: string;
  status: "CONFIRMED" | "RESERVED" | "COMPLETED" | "NO_SHOW";
  payment: "Transferencia" | "Efectivo" | "Pendiente";
};

const tenantBookings: Record<string, DemoBooking[]> = {
  "the-house-fade": [
    { time: "10:00", client: "Matías Rojas", service: "Degradado", status: "CONFIRMED", payment: "Transferencia" },
    { time: "11:00", client: "Felipe González", service: "Corte + barba", status: "RESERVED", payment: "Pendiente" },
    { time: "12:00", client: "Benjamín Soto", service: "Corte básico", status: "COMPLETED", payment: "Efectivo" },
  ],
  "barberia-peters-rocher": [
    { time: "09:30", client: "Tomás Vidal", service: "Corte básico", status: "CONFIRMED", payment: "Transferencia" },
    { time: "11:15", client: "Cristóbal Rojas", service: "Degradado", status: "RESERVED", payment: "Pendiente" },
    { time: "14:00", client: "Nicolás Bravo", service: "Barba", status: "NO_SHOW", payment: "Pendiente" },
  ],
};

export function getDemoBookings(tenantSlug: string) {
  return tenantBookings[tenantSlug] ?? [];
}

export function getDemoClients(tenantSlug: string) {
  return getDemoBookings(tenantSlug).map((booking, index) => ({
    id: `${tenantSlug}-${index}`,
    name: booking.client,
    phone: `+56 9 876${index} ${tenantSlug === "the-house-fade" ? "12" : "34"}5`,
    lastVisit: index === 1 ? "Sin atenciones" : "Hoy",
    visits: index === 0 ? 8 : index + 1,
    frequentService: booking.service,
  }));
}
