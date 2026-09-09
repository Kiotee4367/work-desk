import type { Brand } from "@/config/brands";

export default function Footer({ brand }: { brand: Brand }) {
  return (
    <footer className="border-t border-ink/10 bg-paper text-sm text-ink/70">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-heading font-semibold text-ink">{brand.name}</span>
          <span className="mx-2" aria-hidden="true">·</span>
          <span>{brand.tagline}</span>
        </div>
        <div className="flex flex-col gap-1 sm:items-end">
          <a href={`mailto:${brand.contactEmail}`} className="underline hover:text-ink">
            {brand.contactEmail}
          </a>
          <span>This app never sends messages for you. You copy each draft and send it yourself.</span>
        </div>
      </div>
    </footer>
  );
}
