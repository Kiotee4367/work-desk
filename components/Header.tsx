import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import type { Brand } from "@/config/brands";
import { authConfigured } from "@/lib/env";
import BrandLogo from "@/components/BrandLogo";

export default function Header({ brand }: { brand: Brand }) {
  const auth = authConfigured();
  return (
    <header className="bg-brand text-white">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 rounded" aria-label={`${brand.name} work desk, start here`}>
          <BrandLogo brand={brand} />
        </Link>
        <div className="flex items-center gap-3 text-sm">
          {auth ? (
            <>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <Link href="/sign-in" className="rounded bg-white/15 px-3 py-1.5 hover:bg-white/25">
                  Sign in
                </Link>
              </SignedOut>
            </>
          ) : (
            <span
              className="rounded bg-white/15 px-2 py-1 text-xs"
              title="Add Clerk keys to .env.local to turn sign-in on"
            >
              Preview mode: sign-in off
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
