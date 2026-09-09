import "server-only";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { authConfigured, isProduction } from "@/lib/env";

/**
 * Call at the top of any layout, page or server action that shows or changes user data.
 * Sends signed-out visitors to the sign-in page.
 *
 * In development with no Clerk keys it returns a stand-in id so the owner can check
 * screens. In production without keys the proxy already refuses every request, and this
 * refuses again as a second line of defense.
 */
export async function requireUser(): Promise<{ userId: string; preview: boolean }> {
  if (!authConfigured()) {
    if (isProduction()) throw new Error("Sign-in keys are missing. Refusing to serve user data.");
    return { userId: "preview-user", preview: true };
  }
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  return { userId, preview: false };
}
