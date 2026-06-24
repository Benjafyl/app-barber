export const bookingJobNames = [
  "booking.created",
  "booking.reminder",
  "booking.confirmation-timeout",
  "booking.completed",
  "daily.summary",
  "rent.due-reminder",
] as const;

export type BookingJobName = (typeof bookingJobNames)[number];
