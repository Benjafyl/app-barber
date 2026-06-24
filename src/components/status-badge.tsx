import { Badge } from "@/components/ui/badge";

const labels: Record<string, string> = {
  RESERVED: "Reservada",
  PENDING_CONFIRMATION: "Pendiente",
  CONFIRMED: "Confirmada",
  COMPLETED: "Realizada",
  PAID: "Pagado",
  PAYMENT_PENDING: "Pendiente de pago",
  NO_SHOW: "No asistió",
  CANCELLED_BY_CLIENT: "Cancelada",
  CANCELLED_BY_BARBER: "Cancelada",
  PENDING: "Pendiente de configurar",
  CURRENT: "Al día",
};

export function StatusBadge({ status }: { status: string }) {
  const variant = status === "COMPLETED" || status === "PAID" || status === "CURRENT" ? "default" : status === "NO_SHOW" || status.includes("CANCELLED") ? "destructive" : "secondary";
  return <Badge variant={variant}>{labels[status] ?? status}</Badge>;
}
