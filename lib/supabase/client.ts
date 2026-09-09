"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import { useMemo } from "react";

/**
 * Supabase client for browser code, using the Clerk session token.
 * Only the public URL and anon key reach the browser. RLS does the real protection.
 * Most screens should load data on the server instead; use this only when a screen
 * needs live updates.
 */
export function useSupabase(): SupabaseClient | null {
  const { session } = useSession();
  return useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    return createClient(url, key, {
      async accessToken() {
        return (await session?.getToken()) ?? null;
      },
    });
  }, [session]);
}
