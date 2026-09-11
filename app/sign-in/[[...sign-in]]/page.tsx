import { SignIn } from "@clerk/nextjs";
import { authConfigured } from "@/lib/env";
import { deploymentBrand } from "@/lib/brand";
import BenefitsList from "@/components/BenefitsList";

export const metadata = { title: "Sign in" };

export default async function SignInPage() {
  const brand = deploymentBrand();
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
    <div className="grid gap-10 py-4 md:grid-cols-2 md:items-start">
      <div>
        <h1 className="text-2xl font-semibold">Your {brand.shortName} work desk</h1>
        <p className="mt-2 text-ink/80">{brand.tagline}</p>
        <div className="mt-6">
          <BenefitsList />
        </div>
      </div>
      <div className="flex justify-center md:justify-end">
        <SignIn appearance={{ variables: { colorPrimary: brand.primary, borderRadius: "0.5rem" } }} />
      </div>
    </div>
  );
}
