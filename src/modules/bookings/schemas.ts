import { z } from "zod";

export const bookingStatusSchema = z.enum([
  "RESERVED",
  "PENDING_CONFIRMATION",
  "CONFIRMED",
  "CANCELLED_BY_CLIENT",
  "CANCELLED_BY_BARBER",
  "NO_SHOW",
  "COMPLETED",
  "PAID",
  "PAYMENT_PENDING",
]);

export const createBookingSchema = z.object({
  barbershopSlug: z.string().min(2).max(80),
  barberSlug: z.string().min(2).max(80),
  serviceId: z.string().min(1),
  startsAt: z.date(),
  clientName: z.string().trim().min(2).max(100),
  clientPhone: z.string().trim().min(8).max(20),
  clientEmail: z.union([z.literal(""), z.email()]).optional(),
  clientInstagram: z.string().trim().max(100).optional(),
  customerNote: z.string().trim().max(500).optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
