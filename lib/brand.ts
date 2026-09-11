import { cookies } from "next/headers";
import { getBrand, isBrandKey, DEFAULT_BRAND_KEY, type Brand, type BrandKey } from "@/config/brands";

/**
 * Which brand is active for this visitor.
 *
 * Phase 1: stored in a cookie so the switch works before the database exists.
 * Phase 2 moves this to `workspaces.brand_key` so it is per workspace, as the spec says.
 * The DEFAULT_BRAND environment variable lets a client's own deployment start on their brand.
 */
export const BRAND_COOKIE = "wd_brand";

export function defaultBrandKey(): BrandKey {
  const fromEnv = process.env.DEFAULT_BRAND;
  return isBrandKey(fromEnv) ? fromEnv : DEFAULT_BRAND_KEY;
}

/** The brand this deployment is for. Prospects always get this one. */
export function deploymentBrand(): Brand {
  return getBrand(defaultBrandKey());
}

/**
 * The brand to show this visitor. Everyone gets the deployment brand, except an admin who
 * has picked a different one in Settings to preview it (stored in a cookie). The admin
 * check is done by the caller so this file stays free of Clerk.
 */
export async function getActiveBrand(opts: { admin: boolean }): Promise<Brand> {
  if (!opts.admin) return deploymentBrand();
  const store = await cookies();
  const key = store.get(BRAND_COOKIE)?.value;
  return getBrand(isBrandKey(key) ? key : defaultBrandKey());
}
