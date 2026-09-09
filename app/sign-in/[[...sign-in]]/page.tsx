import { SignIn } from "@clerk/nextjs";
import { authConfigured } from "@/lib/env";

export const metadata = { title: "Sign in" };

export default function SignInPage() {
  if (!authConfigured()) {
    return (
      <section className="max-w-lg">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="mt-2 text-ink/80">
          Sign-in is off because the Clerk keys are not set yet. Add them to .env.local and
          restart the app. Until then you can browse every screen in preview mode.
        </p>
      </section>
    );
  }
  return (
    <div className="flex justify-center py-6">
      <SignIn />
    </div>
  );
}
