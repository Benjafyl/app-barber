import "dotenv/config";
import { getPrisma } from "@/lib/prisma";

const prisma = getPrisma();
const dryRun = process.env.SEED_DRY_RUN === "1";
const seedDate = new Date("2026-06-24T00:00:00.000Z");

type BarberSeed = {
  email: string;
  name: string;
  slug: string;
  isAdmin?: boolean;
};

type BarbershopSeed = {
  name: string;
  slug: string;
  barbers: BarberSeed[];
  createPendingRentAgreements?: boolean;
};

const baseServices = [
  { name: "Corte básico", price: 12000, durationMinutes: 30 },
  { name: "Degradado", price: 15000, durationMinutes: 45 },
  { name: "Corte + barba", price: 18000, durationMinutes: 60 },
  { name: "Barba", price: 8000, durationMinutes: 25 },
];

const tenants: BarbershopSeed[] = [
  {
    name: "The House Fade",
    slug: "the-house-fade",
    createPendingRentAgreements: true,
    barbers: [
      { name: "Joaquín", email: "joaquin@thehousefade.test", slug: "joaquin", isAdmin: true },
      { name: "Ignacio", email: "ignacio@thehousefade.test", slug: "ignacio" },
      { name: "Llaran", email: "llaran@thehousefade.test", slug: "llaran" },
      { name: "Dorian", email: "dorian@thehousefade.test", slug: "dorian" },
    ],
  },
  {
    name: "Barbería Peters Rocher",
    slug: "barberia-peters-rocher",
    barbers: [
      { name: "Pedro", email: "pedro@petersrocher.test", slug: "pedro", isAdmin: true },
      { name: "Benjamin", email: "benjamin@petersrocher.test", slug: "benjamin" },
      { name: "Juan", email: "juan@petersrocher.test", slug: "juan" },
    ],
  },
];

async function report(label: string) {
  const [barbershops, users, barbers, services, memberships, rentAgreements] = await Promise.all([
    prisma.barbershop.count(),
    prisma.user.count(),
    prisma.barber.count(),
    prisma.service.count(),
    prisma.barbershopMember.count(),
    prisma.rentAgreement.count(),
  ]);

  console.info(`[seed] ${label}`, { barbershops, users, barbers, services, memberships, rentAgreements });

  const tenantDetails = await Promise.all(
    tenants.map(async (tenant) => {
      const barbershop = await prisma.barbershop.findUnique({
        where: { slug: tenant.slug },
        select: {
          name: true,
          barbers: {
            orderBy: { publicName: "asc" },
            select: { publicName: true, user: { select: { role: true } } },
          },
          services: { orderBy: { name: "asc" }, select: { name: true } },
          rentAgreements: { select: { amount: true, status: true } },
        },
      });

      return barbershop
        ? {
            slug: tenant.slug,
            name: barbershop.name,
            barbers: barbershop.barbers.map((barber) => `${barber.publicName}:${barber.user.role}`),
            services: barbershop.services.map((service) => service.name),
            pendingRentAgreements: barbershop.rentAgreements.filter((agreement) => agreement.status === "PENDING").length,
          }
        : null;
    }),
  );

  console.info(`[seed] ${label} por tenant`, tenantDetails.filter(Boolean));
}

async function seedTenant(tenant: BarbershopSeed) {
  const barbershop = await prisma.barbershop.upsert({
    where: { slug: tenant.slug },
    update: { name: tenant.name, isActive: true },
    create: { name: tenant.name, slug: tenant.slug, isActive: true },
  });

  const services = [];
  for (const service of baseServices) {
    const existingService = await prisma.service.findFirst({
      where: { barbershopId: barbershop.id, name: service.name },
      select: { id: true },
    });

    const savedService = existingService
      ? await prisma.service.update({
          where: { id: existingService.id },
          data: { price: service.price, durationMinutes: service.durationMinutes, isActive: true },
        })
      : await prisma.service.create({
          data: { ...service, barbershopId: barbershop.id },
        });
    services.push(savedService);
  }

  for (const barberSeed of tenant.barbers) {
    const role = barberSeed.isAdmin ? "BARBERSHOP_ADMIN" : "BARBER";
    const user = await prisma.user.upsert({
      where: { email: barberSeed.email },
      update: { name: barberSeed.name, role },
      create: {
        name: barberSeed.name,
        email: barberSeed.email,
        emailVerified: true,
        role,
      },
    });

    await prisma.barbershopMember.upsert({
      where: { userId_barbershopId: { userId: user.id, barbershopId: barbershop.id } },
      update: { role },
      create: { userId: user.id, barbershopId: barbershop.id, role },
    });

    const barber = await prisma.barber.upsert({
      where: { userId: user.id },
      update: {
        barbershopId: barbershop.id,
        slug: barberSeed.slug,
        publicName: barberSeed.name,
        isActive: true,
      },
      create: {
        userId: user.id,
        barbershopId: barbershop.id,
        slug: barberSeed.slug,
        publicName: barberSeed.name,
        isActive: true,
      },
    });

    for (const service of services) {
      await prisma.barberService.upsert({
        where: { barberId_serviceId: { barberId: barber.id, serviceId: service.id } },
        update: {},
        create: { barberId: barber.id, serviceId: service.id },
      });
    }

    if (tenant.createPendingRentAgreements && !barberSeed.isAdmin) {
      const agreement = await prisma.rentAgreement.findFirst({
        where: { barbershopId: barbershop.id, barberId: barber.id },
        select: { id: true },
      });

      if (!agreement) {
        await prisma.rentAgreement.create({
          data: {
            barbershopId: barbershop.id,
            barberId: barber.id,
            amount: 0,
            periodicity: "MONTHLY",
            startsAt: seedDate,
            status: "PENDING",
            notes: "Subarriendo pendiente de configurar. Administrado por Joaquín en The House Fade.",
          },
        });
      }
    }
  }
}

async function main() {
  await report("estado previo");
  if (dryRun) return;

  for (const tenant of tenants) {
    await seedTenant(tenant);
  }

  await report("estado final");
  console.info("[seed] tenants de desarrollo sincronizados");
}

main()
  .catch((error) => {
    console.error("[seed] error", error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
