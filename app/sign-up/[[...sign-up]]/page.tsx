import { SignUp } from "@clerk/nextjs";
import { authConfigured } from "@/lib/env";

export const metadata = { title: "Create account" };

export default function SignUpPage() {
  if (!authConfigured()) {
    return (
      <section className="max-w-lg">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="mt-2 text-ink/80">
          Sign-up is off because the Clerk keys are not set yet. Add them to .env.local and
          restart the app.
        </p>
      </section>
    );
  }
  return (
    <div className="flex justify-center py-6">
      <SignUp />
    </div>
  );
}
