/** Left-aligned list of what the tool does for the user. Shown on Start here and sign-in. */
export const BENEFITS = [
  { title: "Sounds like you", text: "It learns your brand voice and your personal style, then writes the way you would." },
  { title: "Answers only from your facts", text: "It reads the documents and research you give it. No made-up details." },
  { title: "Knows what matters first", text: "Your inbox sorted by what needs a reply today, with the reason spelled out." },
  { title: "A first draft in seconds", text: "Pick a tone and a purpose. Edit the draft. Copy it when it's right." },
  { title: "You stay in control", text: "Nothing is ever sent by this app. You send every message yourself." },
  { title: "Remembers the people you deal with", text: "Who's a client, who's a vendor, what you've promised them, how they like to be addressed." },
  { title: "Gets better as you use it", text: "Every edit and click teaches it your preferences. You can see and switch off anything it learned." },
  { title: "Private and safe", text: "Your data stays in your workspace. Read-only email access. Sign-in with two-factor available." },
];

export default function BenefitsList({ heading = "What this tool does for you" }: { heading?: string }) {
  return (
    <section aria-labelledby="benefits-heading" className="text-left">
      <h2 id="benefits-heading" className="text-lg font-semibold">{heading}</h2>
      <ul className="mt-3 max-w-2xl list-none divide-y divide-ink/10 p-0">
        {BENEFITS.map((b) => (
          <li key={b.title} className="flex gap-3 py-3">
            <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" />
            <span>
              <span className="block font-semibold">{b.title}</span>
              <span className="block text-sm text-ink/80">{b.text}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
