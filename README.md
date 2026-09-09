# AI Work Desk

A white-label web app that helps a business get comfortable with AI tools. It learns the
client's brand voice, reads only the documents they give it, sorts their messages by
priority and drafts replies. It never sends anything. The user copies each draft and sends
it themselves.

The same code runs two ways:

- **Online** on Vercel, one deployment per client brand.
- **On a local machine**, for trying it out or for a client who wants everything on their
  own computer.

Build status: **Phase 1 of 9 done** (scaffold, layout, brand switch). See CLAUDE.md for
the full spec and build order.

## Non-coder path

Read **SETUP.md** (one-time, all in the browser) and **TESTING.md** (what to click after each phase). The sections below are the technical version of the same thing.

## Run it online (Vercel)

1. Go to vercel.com and sign in with GitHub.
2. Click **Add New, Project** and pick the `work-desk` repository.
3. Before you click Deploy, open **Environment Variables** and add every name from
   `.env.example` that you have a value for. At minimum for Phase 1:
   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
4. Click **Deploy**. Vercel gives you a web address in about two minutes.
5. Every later push to the `main` branch redeploys on its own.

Without the Clerk keys the online app shows a plain "not ready yet" page on purpose. It
never runs online with sign-in off.

## Run it on your computer

You need two free programs: **Node.js** (nodejs.org, pick the LTS version) and **Git**
(git-scm.com). Install both with the default options.

Then open a terminal (Terminal on Mac, PowerShell on Windows) and paste these one at a
time:

```
git clone https://github.com/Kiotee4367/work-desk.git
cd work-desk
npm install
copy .env.example .env.local
```

On Mac use `cp .env.example .env.local` for the last line.

Open `.env.local` in any text editor and paste in your keys next to the names. Save it.
Then:

```
npm run dev
```

Open http://localhost:3000 in your browser. Press Ctrl+C in the terminal to stop.

If you skip the keys, the app still opens in **preview mode** with sign-in off so you can
look around. That only works on your own computer, never online.

## Where the keys come from

| Key names | Where | Needed from |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` | clerk.com, your app, API keys | Phase 1 |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` | supabase.com, Project Settings, API | Phase 2 |
| `ANTHROPIC_API_KEY` | console.anthropic.com | Phase 3 |

Never paste keys into chat or email. They go only in `.env.local` (local) or Vercel's
Environment Variables (online).

## Adding a client brand

Edit `config/brands.ts`, copy one entry, change the name, colors, logo and contact email.
Put the logo file in `public/brands/`. That is the only file that changes. The new brand
appears under Settings, Brand.

## Folder map

```
app/            screens (one folder per screen) and the shared layout
components/     header, nav, footer, shared pieces
config/brands.ts  the brand list
lib/            server helpers: brand cookie, env checks, Supabase clients
prompts/        the assistant's instructions (Phase 3)
prototype/      the design reference (add WorkDashboard.jsx here)
public/brands/  logo files
proxy.ts        sign-in gate and Content Security Policy
next.config.ts  other security headers
```

## Security

See SECURITY.md for the rules and what is already in place.
