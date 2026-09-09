/**
 * Plain-language checks for which services have their keys set.
 * Safe to import from the proxy (edge runtime) and from server components.
 * Never import this from client components: the secret keys must stay on the server.
 */

export function authConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
  );
}

export function supabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function anthropicConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === "production";
}

export interface ServiceStatus {
  name: string;
  ready: boolean;
  /** What the owner should do if it is not ready. */
  howToFix: string;
  /** Which build phase needs it. */
  neededFrom: string;
}

export function serviceStatuses(): ServiceStatus[] {
  return [
    {
      name: "Sign-in (Clerk)",
      ready: authConfigured(),
      howToFix:
        "Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY to .env.local (local) or to Environment Variables in Vercel (online), then restart.",
      neededFrom: "Phase 1",
    },
    {
      name: "Database (Supabase)",
      ready: supabaseConfigured(),
      howToFix:
        "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY the same way.",
      neededFrom: "Phase 2",
    },
    {
      name: "AI (Anthropic)",
      ready: anthropicConfigured(),
      howToFix: "Add ANTHROPIC_API_KEY the same way.",
      neededFrom: "Phase 3",
    },
  ];
}
