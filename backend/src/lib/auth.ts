import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { Role } from "../generated/prisma/enums";

// const trustedOrigins = [
//   process.env.APP_URL,
//   process.env.BETTER_AUTH_URL,
//   process.env.PROD_URL,
//   "http://localhost:3000",
//   "http://localhost:5000",
// ].filter((origin): origin is string => Boolean(origin));

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: ["https://foodhub-delivery.vercel.app"],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: Role.CUSTOMER,
        required: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user, context) => {
          return {
            data: {
              ...user,
              emailVerified: true,
            },
          };
        },
      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false,
    },
    disableCSRFCheck: true, // Allow requests without Origin header (Postman, mobile apps, etc.)
  },
});
