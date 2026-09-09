import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { authConfigured, authKeyProblem, isProduction } from "@/lib/env";

/**
 * Runs before every page and API request.
 *
 * 1. Session handling: Clerk reads the sign-in cookie so pages can call requireUser()
 *    (lib/auth.ts). The sign-in check itself happens in app/(app)/layout.tsx and in each
 *    page that touches user data, which is what Clerk recommends over path matching.
 * 2. Content Security Policy: Clerk builds a strict, per-request policy (with a nonce)
 *    that allows only this app, Clerk and Supabase. Extra sources are listed once here.
 * 3. Missing keys: in development the app runs in preview mode with no sign-in so the
 *    owner can check screens. In production it refuses to serve anything.
 */

const SUPABASE_ORIGINS = ["https://*.supabase.co", "wss://*.supabase.co"];

const withClerk = clerkMiddleware({
  contentSecurityPolicy: {
    strict: true,
    directives: {
      "connect-src": SUPABASE_ORIGINS,
      "img-src": ["data:", "blob:"],
      "font-src": ["data:"],
      "object-src": ["'none'"],
      "base-uri": ["'self'"],
      "form-action": ["'self'"],
      "frame-ancestors": ["'none'"],
    },
  },
});

const PREVIEW_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self' ${SUPABASE_ORIGINS.join(" ")}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

function notReady(message: string) {
  return new NextResponse(
    "This work desk is not ready yet. " + message + "\n\nFix the value in the hosting settings (Vercel: Environment Variables) and redeploy.",
    { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}

export default function proxy(req: NextRequest, evt: NextFetchEvent) {
  const problem = authKeyProblem();
  if (problem) return notReady(problem);
  if (authConfigured()) return withClerk(req, evt);

  if (isProduction()) {
    return new NextResponse(
      "This work desk is not ready yet: sign-in keys are missing. " +
        "The owner needs to add the Clerk keys in the hosting settings and redeploy.",
      { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } },
    );
  }

  const res = NextResponse.next();
  res.headers.set("Content-Security-Policy", PREVIEW_CSP);
  return res;
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
