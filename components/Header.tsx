import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import type { Brand } from "@/config/brands";
import { authConfigured } from "@/lib/env";
import BrandLogo from "@/components/BrandLogo";

export default async function Header({ brand, admin }: { brand: Brand; admin: boolean }) {
  const configured = authConfigured();
  const signedIn = configured ? Boolean((await auth()).userId) : false;

  return (
    <header className="bg-brand text-white">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 rounded" aria-label={`${brand.name} work desk, start here`}>
          <BrandLogo brand={brand} />
        </Link>
        <div className="flex items-center gap-3 text-sm">
          {!configured && (
            <span
              className="rounded bg-white/15 px-2 py-1 text-xs"
              title="Add Clerk keys to .env.local to turn sign-in on"
            >
              Preview mode: sign-in off
            </span>
          )}
          {admin && (
            <span className="rounded bg-white/15 px-2 py-1 text-xs" title="You can switch brands and see setup status in Settings">
              Admin
            </span>
          )}
          {configured && signedIn && <UserButton />}
          {configured && !signedIn && (
            <Link href="/sign-in" className="rounded bg-white/15 px-3 py-1.5 hover:bg-white/25">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
