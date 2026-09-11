"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isBrandKey } from "@/config/brands";
import { BRAND_COOKIE } from "@/lib/brand";
import { isProduction } from "@/lib/env";
import { isAdmin, requireUser } from "@/lib/auth";

/** Saves the chosen brand. Phase 2 moves this to the workspace row and logs it to audit_log. */
export async function setBrand(formData: FormData) {
  await requireUser();
  if (!(await isAdmin())) redirect("/settings?error=admin");
  const key = formData.get("brand");
  if (!isBrandKey(key)) redirect("/settings?error=brand");

  const store = await cookies();
  store.set(BRAND_COOKIE, key, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction(),
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  revalidatePath("/", "layout");
  redirect("/settings?saved=brand");
}
