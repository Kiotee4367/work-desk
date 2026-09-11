import Link from "next/link";
import { getActiveBrand } from "@/lib/brand";
import { isAdmin } from "@/lib/auth";
import BenefitsList from "@/components/BenefitsList";

const STEPS = [
  {
    n: 1,
    title: "Tell the AI about your brand",
    text: "Your tone, voice, and what to avoid. Takes about five minutes.",
    href: "/brand",
    cta: "Go to Brand library",
  },
  {
    n: 2,
    title: "Add what it should know",
    text: "Upload documents or run web research. The AI answers only from these.",
    href: "/notebook",
    cta: "Go to Notebook",
  },
  {
    n: 3,
    title: "Sort your inbox",
    text: "Paste in messages. See what needs a reply today and draft it.",
    href: "/inbox",
    cta: "Go to Inbox",
  },
];

const CHECKS = [
  "Brand library saved",
  "First source added to Notebook",
  "First message sorted",
  "First draft copied",
];

export default async function StartPage() {
  const brand = await getActiveBrand({ admin: await isAdmin() });
  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="text-3xl font-semibold">Welcome to your {brand.shortName} work desk</h1>
        <p className="mt-2 max-w-2xl text-ink/80">
          A safe place to get comfortable with AI. It learns your brand, reads only what you
          give it, sorts your messages and drafts replies. It never sends anything. You do.
        </p>
      </section>

      <BenefitsList />

      <section aria-labelledby="progress-heading" className="rounded-xl border border-ink/10 p-4">
        <h2 id="progress-heading" className="text-lg font-semibold">Setup progress</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {CHECKS.map((c) => (
            <li key={c} className="flex items-center gap-2 text-sm">
              <span
                aria-hidden="true"
                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-ink/30 text-xs"
              />
              <span>{c}</span>
              <span className="sr-only">not done</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-ink/60">Progress tracking turns on in Phase 2.</p>
      </section>

      <section aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="text-lg font-semibold">Three steps to get going</h2>
        <ol className="mt-3 grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="flex flex-col rounded-xl border border-ink/10 p-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Step {s.n}</span>
              <h3 className="mt-1 font-semibold">{s.title}</h3>
              <p className="mt-1 flex-1 text-sm text-ink/80">{s.text}</p>
              <Link
                href={s.href}
                className="mt-4 inline-block self-start rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                {s.cta}
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
