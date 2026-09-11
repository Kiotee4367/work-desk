import { BRAND_LIST } from "@/config/brands";
import { deploymentBrand, getActiveBrand } from "@/lib/brand";
import { serviceStatuses } from "@/lib/env";
import { isAdmin, requireUser } from "@/lib/auth";
import { setBrand } from "./actions";

export const metadata = { title: "Settings" };

const LATER = [
  { title: "AI model", text: "Pick which Claude model answers. Other providers come later.", phase: 6 },
  { title: "Connections", text: "Gmail, Outlook, Slack and Teams. All read-only. Nothing is ever sent.", phase: 7 },
  { title: "Assistant instructions", text: "See exactly what the AI is told, and override it if you want.", phase: 6 },
  { title: "Security", text: "Plain-language notes on where your data lives and who can see it.", phase: 6 },
  { title: "Help", text: "Restart the two-minute tour.", phase: 6 },
];

export default async function SettingsPage({ searchParams }: PageProps<"/settings">) {
  await requireUser();
  const admin = await isAdmin();
  const params = await searchParams;
  const active = await getActiveBrand({ admin });
  const fixed = deploymentBrand();
  const saved = params.saved === "brand";
  const error = params.error === "brand" ? "That brand is not on the list. Pick one below and save again."
    : params.error === "admin" ? "Only an admin can switch the brand." : null;
  const statuses = serviceStatuses();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">Settings</h1>

      {error && (
        <p role="alert" className="rounded-lg border border-red-600 bg-red-50 px-3 py-2 text-sm">{error}</p>
      )}

      {admin ? (
        <section aria-labelledby="brand-heading" className="rounded-xl border border-ink/10 p-4">
          <h2 id="brand-heading" className="text-lg font-semibold">Brand (admin)</h2>
          <p className="mt-1 text-sm text-ink/80">
            This deployment is set to <strong>{fixed.name}</strong>. Everyone who signs in sees that brand.
            As an admin you can preview another brand here. It changes what you see, not what prospects see.
          </p>

          {saved && (
            <p role="status" className="mt-3 rounded-lg border border-accent bg-accent/10 px-3 py-2 text-sm">
              Brand saved. You are now previewing {active.name}. Next step: fill in your Brand library.
            </p>
          )}

          <form action={setBrand} className="mt-4">
            <fieldset>
              <legend className="sr-only">Brand</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {BRAND_LIST.map((b) => (
                  <label
                    key={b.key}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-ink/15 p-3 has-[:checked]:border-accent has-[:checked]:ring-2 has-[:checked]:ring-accent"
                  >
                    <input type="radio" name="brand" value={b.key} defaultChecked={b.key === active.key} className="mt-1" />
                    <span className="flex-1">
                      <span className="block font-semibold">
                        {b.name}
                        {b.key === fixed.key && <span className="ml-2 text-xs font-normal text-ink/60">this deployment</span>}
                      </span>
                      <span className="block text-sm text-ink/70">{b.tagline}</span>
                      <span className="mt-2 flex items-center gap-1" aria-hidden="true">
                        {[b.primary, b.accent, b.ink, b.paper].map((c) => (
                          <span key={c} className="inline-block h-4 w-4 rounded-full border border-ink/20" style={{ backgroundColor: c }} />
                        ))}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="submit" className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
              Save brand
            </button>
          </form>
          <p className="mt-3 text-xs text-ink/60">
            To change the brand for everyone, set DEFAULT_BRAND in the hosting settings and redeploy. Adding a client brand is one edit to config/brands.ts.
          </p>
        </section>
      ) : (
        <section aria-labelledby="brand-heading" className="rounded-xl border border-ink/10 p-4">
          <h2 id="brand-heading" className="text-lg font-semibold">Brand</h2>
          <p className="mt-1 text-sm text-ink/80">
            This work desk is provided by <strong>{fixed.name}</strong>. Questions? Email{" "}
            <a href={`mailto:${fixed.contactEmail}`} className="underline">{fixed.contactEmail}</a>.
          </p>
        </section>
      )}

      {admin && (
        <section aria-labelledby="status-heading" className="rounded-xl border border-ink/10 p-4">
          <h2 id="status-heading" className="text-lg font-semibold">Setup status (admin)</h2>
          <p className="mt-1 text-sm text-ink/80">Which services have their keys in place.</p>
          <ul className="mt-3 flex flex-col gap-2">
            {statuses.map((s) => (
              <li key={s.name} className="flex flex-col gap-1 rounded-lg border border-ink/10 px-3 py-2 text-sm sm:flex-row sm:items-start sm:gap-3">
                <span className="flex items-center gap-2 sm:w-52 sm:shrink-0">
                  <span aria-hidden="true" className={`inline-block h-2.5 w-2.5 rounded-full ${s.ready ? "bg-green-600" : "bg-amber-500"}`} />
                  <span className="font-semibold">{s.name}</span>
                </span>
                <span className="text-ink/80">
                  {s.ready ? "Ready." : `Not set up (needed from ${s.neededFrom}). ${s.howToFix}`}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="later-heading">
        <h2 id="later-heading" className="text-lg font-semibold">Coming in later phases</h2>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2">
          {LATER.map((l) => (
            <li key={l.title} className="rounded-lg border border-dashed border-ink/20 p-3">
              <span className="block font-semibold">{l.title}</span>
              <span className="block text-sm text-ink/70">{l.text}</span>
              <span className="mt-1 block text-xs text-ink/50">Phase {l.phase}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
