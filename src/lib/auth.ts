import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getServerEnv } from "@/lib/env";
import { getPrisma } from "@/lib/prisma";

const createAuth = () => {
  const env = getServerEnv();

  return betterAuth({
    database: prismaAdapter(getPrisma(), { provider: "postgresql" }),
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [env.APP_URL],
    emailAndPassword: {
      enabled: true,
    },
    user: {
      additionalFields: {
        role: {
          type: "string",
          required: true,
          defaultValue: "BARBER",
          input: false,
        },
      },
    },
  });
};

type AuthInstance = ReturnType<typeof createAuth>;
let auth: AuthInstance | undefined;

export function getAuth() {
  if (!auth) {
    auth = createAuth();
  }

  return auth;
}
