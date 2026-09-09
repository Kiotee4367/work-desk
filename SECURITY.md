# Security notes

Plain-language summary of how this app protects data, and what the owner must do.
The full checklist the build follows is in CLAUDE.md, section 8.

## Already in place (Phase 1)

- **No secrets in the code.** Keys live only in `.env.local` on a computer or in Vercel's
  Environment Variables online. `.env.local` is ignored by Git so it cannot be uploaded by
  accident. `.env.example` lists the names with no values.
- **Sign-in required online.** Every screen sits behind Clerk sign-in. If the keys are
  missing, the online app refuses to serve pages and shows a "not ready" message.
  Preview mode with sign-in off works only on a developer's own computer.
- **Browser hardening.** Every response carries a strict Content Security Policy (with a
  fresh nonce per request), HTTPS-only for two years (HSTS), no framing by other sites,
  no file-type guessing, limited referrer, and unused browser features turned off.
  See `proxy.ts` and `next.config.ts`.
- **Cookies** are HttpOnly, SameSite=Lax, and Secure online.
- **No telemetry.** Next.js and Clerk usage reporting are switched off in `.env.example`.
- **Read-only by design.** The app never sends email or chat messages. Later phases only
  ever ask for read-only Gmail and Slack permissions.

## Owner to-do list

- [ ] Keep the GitHub repository **private**. Share the app by giving people its web
      address, never by sharing the code or `.env.local`.
- [ ] In GitHub, turn on **secret scanning** and **push protection** (Settings, Code
      security). They block a key from being uploaded by mistake.
- [ ] In Clerk, set sign-up to **Restricted** so only people you invite can create an
      account. Turn on **multi-factor authentication** for your own account.
- [ ] Each install (Vercel, each laptop) gets its **own** `.env.local`. If a laptop is lost,
      rotate its keys in Clerk, Supabase and Anthropic.
- [ ] Keep `npm install` current. Run `npm audit` now and then, or let Dependabot open
      update pull requests (`.github/dependabot.yml` is included).

## Coming in later phases

- Phase 2: Row Level Security on every table, with a test that one workspace cannot read
  another.
- Phase 5: uploads limited to 20 MB and to PDF, DOCX, TXT and MD, checked by file
  content, not name.
- Phase 7: Gmail and Slack tokens encrypted at rest; disconnect revokes and deletes them.
- Phase 9: data retention cron, rate limits on AI calls, credential stripping from drafts,
  audit log, and a rule that message bodies and drafts are never sent to error reporting.

## Reporting a problem

Email the contact address shown in the app footer.
