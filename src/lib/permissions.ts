import { redirect } from "next/navigation";
import { headers } from "next/headers";
import type { UserRole } from "@/generated/prisma/client";
import { getAuth } from "@/lib/auth";

export async function requireRole(allowedRoles: UserRole[]) {
  const session = await getAuth().api.getSession({
    headers: await headers(),
  });

  const role = (session?.user as { role?: UserRole } | undefined)?.role;

  if (!session || !role || !allowedRoles.includes(role)) {
    redirect("/login");
  }

  return session;
}
