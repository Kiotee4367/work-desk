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

export async function getActiveBrand(): Promise<Brand> {
  const store = await cookies();
  const key = store.get(BRAND_COOKIE)?.value;
  return getBrand(isBrandKey(key) ? key : defaultBrandKey());
}
