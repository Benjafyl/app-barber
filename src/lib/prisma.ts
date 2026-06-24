import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { getServerEnv } from "@/lib/env";

let prisma: PrismaClient | undefined;

export function getPrisma() {
  if (!prisma) {
    const adapter = new PrismaPg({
      connectionString: getServerEnv().DATABASE_URL,
    });
    prisma = new PrismaClient({ adapter });
  }

  return prisma;
}
