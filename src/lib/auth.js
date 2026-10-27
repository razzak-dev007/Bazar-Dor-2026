import { betterAuth } from "better-auth";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "bazardor_assignment7_secret_key_123456789",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "github_dummy_id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "github_dummy_secret",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "google_dummy_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "google_dummy_secret",
    },
  },
});
