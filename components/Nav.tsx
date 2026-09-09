"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Start here" },
  { href: "/inbox", label: "Inbox" },
  { href: "/ask", label: "Ask anything" },
  { href: "/brand", label: "Brand library" },
  { href: "/notebook", label: "Notebook" },
  { href: "/settings", label: "Settings" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="border-b border-ink/10 bg-paper">
      <ul className="max-w-5xl mx-auto px-2 flex gap-1 overflow-x-auto whitespace-nowrap">
        {ITEMS.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="block px-3 py-3 text-sm border-b-2 border-transparent text-ink/70 hover:text-ink aria-[current=page]:border-accent aria-[current=page]:text-ink aria-[current=page]:font-semibold"
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
