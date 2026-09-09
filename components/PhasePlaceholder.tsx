/** Stand-in for a screen that a later build phase fills in. */
export default function PhasePlaceholder({
  title,
  blurb,
  phase,
}: {
  title: string;
  blurb: string;
  phase: number;
}) {
  return (
    <section className="max-w-2xl">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-ink/80">{blurb}</p>
      <p className="mt-6 rounded-lg border border-ink/10 bg-ink/5 px-4 py-3 text-sm">
        This screen is built in Phase {phase}. Nothing to check here yet.
      </p>
    </section>
  );
}
