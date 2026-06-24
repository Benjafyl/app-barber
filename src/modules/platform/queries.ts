import { headers } from "next/headers";
import { getAuth } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

const tenantInclude = {
  barbers: {
    where: { isActive: true },
    orderBy: { publicName: "asc" as const },
    include: { user: { select: { name: true, role: true, email: true } } },
  },
  services: { where: { isActive: true }, orderBy: { name: "asc" as const } },
  rentAgreements: {
    include: { barber: { select: { publicName: true } } },
    orderBy: { createdAt: "desc" as const },
  },
};

export async function getPublicBarbershop(slug: string) {
  return getPrisma().barbershop.findFirst({
    where: { slug, isActive: true },
    include: {
      ...tenantInclude,
      barbers: {
        ...tenantInclude.barbers,
        include: {
          user: { select: { name: true, role: true, email: true } },
          services: { include: { service: true } },
        },
      },
    },
  });
}

export async function getBarberProfile(barbershopSlug: string, barberSlug: string) {
  return getPrisma().barber.findFirst({
    where: { slug: barberSlug, isActive: true, barbershop: { slug: barbershopSlug, isActive: true } },
    include: {
      barbershop: { select: { id: true, name: true, slug: true, address: true } },
      services: { include: { service: true } },
    },
  });
}

export async function getPlatformOverview() {
  const prisma = getPrisma();
  const [barbershops, barbers, clients, bookings, shops] = await Promise.all([
    prisma.barbershop.count({ where: { isActive: true } }),
    prisma.barber.count({ where: { isActive: true } }),
    prisma.client.count(),
    prisma.booking.count(),
    prisma.barbershop.findMany({
      orderBy: { name: "asc" },
      include: {
        barbers: { where: { isActive: true }, select: { id: true } },
        members: { where: { role: "BARBERSHOP_ADMIN" }, include: { user: { select: { name: true } } } },
      },
    }),
  ]);

  return { barbershops, barbers, clients, bookings, shops };
}

export async function getTenantOverview(slug?: string) {
  const prisma = getPrisma();
  const barbershop = slug
    ? await prisma.barbershop.findUnique({ where: { slug }, include: tenantInclude })
    : await prisma.barbershop.findFirst({ orderBy: { name: "asc" }, include: tenantInclude });

  if (!barbershop) return null;

  const [bookingCount, completedCount, clientCount, expenses] = await Promise.all([
    prisma.booking.count({ where: { barbershopId: barbershop.id } }),
    prisma.booking.count({ where: { barbershopId: barbershop.id, status: { in: ["COMPLETED", "PAID"] } } }),
    prisma.client.count({ where: { barbershopId: barbershop.id } }),
    prisma.expense.aggregate({ where: { barbershopId: barbershop.id }, _sum: { amount: true } }),
  ]);

  return {
    ...barbershop,
    metrics: {
      bookingCount,
      completedCount,
      clientCount,
      expenseTotal: expenses._sum.amount?.toString() ?? "0",
    },
  };
}

export async function getCurrentUserContext() {
  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session) return null;

  return getPrisma().user.findUnique({
    where: { id: session.user.id },
    include: {
      memberships: {
        include: { barbershop: { select: { id: true, name: true, slug: true } } },
        orderBy: { createdAt: "asc" },
      },
      barber: { include: { barbershop: { select: { id: true, name: true, slug: true } } } },
    },
  });
}

export async function getActiveTenantForCurrentUser(requestedSlug?: string) {
  const currentUser = await getCurrentUserContext();
  if (!currentUser) return null;

  if (currentUser.role === "SUPER_ADMIN") {
    const tenant = await getTenantOverview(requestedSlug);
    return tenant ? { currentUser, tenant } : null;
  }

  const membership = requestedSlug
    ? currentUser.memberships.find((item) => item.barbershop.slug === requestedSlug)
    : currentUser.memberships[0];

  if (!membership) return null;
  const tenant = await getTenantOverview(membership.barbershop.slug);
  return tenant ? { currentUser, tenant } : null;
}
