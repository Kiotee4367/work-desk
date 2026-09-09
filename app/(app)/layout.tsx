import { requireUser } from "@/lib/auth";

/**
 * Every screen inside this folder needs a signed-in user. Sign-in, sign-up and the
 * health check live outside it. Pages that load user data call requireUser() again
 * themselves, so a page is never served on the strength of this layout alone.
 */
export default async function AppLayout({ children }: LayoutProps<"/">) {
  await requireUser();
  return children;
}
