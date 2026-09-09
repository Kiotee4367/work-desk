import { NextResponse } from "next/server";

/** Public check that the app is up. Returns no secrets and no user data. */
export function GET() {
  return NextResponse.json({ ok: true });
}
