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

/**
 * Plain-language check that the Clerk keys look right. Returns null when fine, or a
 * sentence the owner can act on. Catches the common paste mistakes (whole line pasted,
 * quotes, wrong key in the wrong box) before Clerk crashes on them.
 */
export function authKeyProblem(): string | null {
  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
  const sk = process.env.CLERK_SECRET_KEY ?? "";
  if (!pk && !sk) return null;
  if (!pk) return "CLERK_SECRET_KEY is set but NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is empty. Add the key that starts with pk_.";
  if (!sk) return "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set but CLERK_SECRET_KEY is empty. Add the key that starts with sk_.";
  if (!/^pk_(test|live)_[A-Za-z0-9=]+$/.test(pk))
    return "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY should be only the key itself, starting with pk_test_ or pk_live_. Remove any name, equals sign, quotes or spaces.";
  if (!/^sk_(test|live)_[A-Za-z0-9]+$/.test(sk))
    return "CLERK_SECRET_KEY should be only the key itself, starting with sk_test_ or sk_live_. Remove any name, equals sign, quotes or spaces.";
  if ((pk.includes("_test_") && sk.includes("_live_")) || (pk.includes("_live_") && sk.includes("_test_")))
    return "One Clerk key is a test key and the other is a live key. Both must come from the same Clerk instance.";
  return null;
}

export function supabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export function anthropicConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

/** Emails allowed to see admin settings (brand switch). Comma-separated, case-insensitive. */
export function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
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
