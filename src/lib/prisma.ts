import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { getServerEnv } from "@/lib/env";

let prisma: PrismaClient | undefined;

export function getPrisma() {
  if (!prisma) {
    const databaseUrl = new URL(getServerEnv().DATABASE_URL);
    const isSupabasePooler = databaseUrl.hostname.endsWith(".pooler.supabase.com");

    // node-postgres lets URL SSL query parameters override the explicit ssl option.
    // Supabase's pooler currently needs the explicit option below for its certificate chain.
    if (isSupabasePooler) {
      databaseUrl.searchParams.delete("sslmode");
      databaseUrl.searchParams.delete("ssl");
    }

    const adapter = new PrismaPg({
      connectionString: databaseUrl.toString(),
      ...(isSupabasePooler ? { ssl: { rejectUnauthorized: false } } : {}),
    });
    prisma = new PrismaClient({ adapter });
  }

  return prisma;
}
