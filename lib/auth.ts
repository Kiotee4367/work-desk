import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { adminEmails, authConfigured, isProduction } from "@/lib/env";

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

/**
 * Admins are the brand owner's own people. They can switch the brand and see setup status.
 * Prospects (members) never see those controls.
 *
 * Phase 1: an admin is anyone whose sign-in email is listed in ADMIN_EMAILS.
 * Phase 2 moves this to workspace_members.role and keeps ADMIN_EMAILS as the bootstrap list.
 * In development with no Clerk keys, preview mode counts as admin so the owner can check screens.
 */
export async function isAdmin(): Promise<boolean> {
  if (!authConfigured()) return !isProduction();
  const user = await currentUser();
  if (!user) return false;
  const allowed = adminEmails();
  if (allowed.length === 0) return false;
  return user.emailAddresses.some((e) => allowed.includes(e.emailAddress.toLowerCase()));
}
