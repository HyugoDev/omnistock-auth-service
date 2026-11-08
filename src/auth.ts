import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { jwt, bearer, admin, organization } from "better-auth/plugins";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
    },
  }),
  secret: process.env.BETTER_AUTH_SECRET || "omnistock_dev_secret_key_must_be_32_characters_long",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:4000",
  trustedOrigins: [
    "http://localhost:4200",
    "http://127.0.0.1:4200",
  ],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    bearer(),
    admin(),
    organization(),
    jwt({
      jwt: {
        issuer: process.env.JWT_ISSUER || "omnistock-auth-service",
        audience: process.env.JWT_AUDIENCE || "omnistock-core-service",
        expirationTime: "15m",
      },
      jwks: {
        keyPairConfig: {
          alg: "EdDSA",
          crv: "Ed25519",
        },
      },
    }),
  ],
});
