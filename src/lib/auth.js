import { betterAuth } from "better-auth";
import { oAuthProxy } from "better-auth/plugins";

// Better Auth কনফিগারেশন
// অ্যাসাইনমেন্ট অনুযায়ী কোনো এক্সটার্নাল ডাটাবেজ ছাড়া চলবে (মেমোরি ভিত্তিক)
const appUrl =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "bazardor_assignment7_secret_key_123456789",
  baseURL: appUrl,
  // সোশ্যাল লগইন ও রিডাইরেক্ট হ্যান্ডেল করার জন্য প্রক্সি প্লাগইন
  plugins: [
    oAuthProxy({
      productionURL: appUrl,
      secret: process.env.BETTER_AUTH_SECRET || "bazardor_assignment7_secret_key_123456789",
    }),
  ],
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
