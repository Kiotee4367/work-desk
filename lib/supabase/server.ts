import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { authConfigured, supabaseConfigured } from "@/lib/env";

/**
 * Supabase client for server components, server actions and route handlers.
 *
 * It sends the signed-in user's Clerk session token to Supabase, so Row Level Security
 * policies can read `auth.jwt() ->> 'sub'` to find the Clerk user id. Phase 2 sets up the
 * Clerk to Supabase connection and the RLS policies that use it.
 *
 * Returns null, with a reason, when the keys are missing so screens can explain what is
 * missing instead of crashing.
 */
export async function getSupabase(): Promise<
  { client: SupabaseClient; reason: null } | { client: null; reason: string }
> {
  if (!supabaseConfigured()) {
    return {
      client: null,
      reason: "Database keys are not set. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }
  if (!authConfigured()) {
    return { client: null, reason: "Sign-in is not set up, so there is no user to load data for." };
  }

  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      async accessToken() {
        const { getToken } = await auth();
        return (await getToken()) ?? null;
      },
    },
  );
  return { client, reason: null };
}
