# Social CRM for individuals: build plan

A plan, not code. Read it, mark it up, and we build from it phase by phase, the same way Work Desk was built. Written for a non-coder; every term is explained where it first appears.

## 1. What we are building

A personal app that keeps your social life organized. Not a business CRM. It tracks:

1. **People**: friends and the details that matter. Phone, birthday, how you met, what they're into (golf, camping, happy hours, concerts), notes, and how often you want to be in touch.
2. **Circles**: the groups you do things with. The Saturday golf foursome. The camping crew. The Thursday happy hour gang. One person can be in many circles.
3. **Events**: plan an outing, invite a circle, collect RSVPs through a link that needs no app and no account, and track who brings what.
4. **Calendar**: your outings in one view, with a one-tap "add to my calendar" that works with Google, Apple and Outlook.
5. **Staying in touch**: log calls and texts in one tap, see who you haven't talked to in a while, get birthday reminders.
6. **Drafts, never sends**: same rule as Work Desk. The AI drafts the invite text or the "long time no talk" message in your voice. You copy it and send it yourself. The app sends nothing.

## 2. Before building: try the existing tools first

Building costs weeks. A few products already do parts of this, and it's worth an evening with each before committing. As of my last information: Partiful does invite links and RSVPs for casual events; Dex and Clay are personal CRMs that track people and remind you to reach out; Monica is a free open-source personal CRM. None of them combine people, circles, RSVP links, who-brings-what and AI drafting in your voice, which is the case for building. But check them first; they may cover enough.

## 3. First decision: where it lives

Two options:

- **A separate app in its own repo, reusing the Work Desk stack.** Recommended. Work Desk is a white-label business tool for prospects. This is personal. Mixing them complicates both, and keeping them apart means a bug in one never touches the other.
- A new section inside Work Desk. Cheaper to start, messier forever.

The rest of this plan assumes a separate app. Everything you learned running Work Desk (Vercel, Supabase, Clerk) applies as-is.

## 4. Stack

Same as Work Desk, so there is nothing new to learn:

- Next.js, TypeScript, Tailwind. Deploy on Vercel.
- Supabase: Postgres, Row Level Security on every table.
- Clerk for sign-in.
- Anthropic API for the AI drafting.
- Inngest for reminders.
- Sentry for errors.

One user (you) at first, so free tiers should cover it. Check each provider's current pricing page before committing; I'm not quoting prices here because they change.

## 5. Data model

All tables carry the signed-in user's id, `created_at`, `updated_at`. Row Level Security: you only ever see your own rows.

- `people`: id, name, phone, email, birthday, how_met, interests (tags: golf, camping, happy_hour, poker, concerts, dinner, other), notes, preferred_contact (text, call, email), cadence_days (how often you want to touch base, optional), last_contact_at
- `circles`: id, name ("Saturday golf"), activity, notes
- `circle_members`: circle_id, person_id
- `events`: id, title, activity, starts_at, ends_at, location, details (tee time, campsite link, meeting spot), circle_id (optional), status (planning, confirmed, done, canceled), rsvp_token (powers the public RSVP link), show_guest_list (on/off)
- `invites`: event_id, person_id, status (invited, in, out, maybe, no_answer), responded_at, note ("can't make 9, can do 10")
- `items`: event_id, name ("cooler", "firewood", "tent"), claimed_by (person, optional). The who-brings-what list.
- `touches`: id, person_id, kind (call, text, email, in_person), happened_at, note. The communication log.
- `reminders`: id, kind (birthday, cadence, event_prep), person_id or event_id, due_at, done_at

Retention: this is your own address book, so nothing auto-deletes. Export and delete-everything live in Settings, self-serve.

## 6. Screens

1. **Home**: "This week" (upcoming events with RSVP counts), "Reach out" (people past their cadence, plus birthdays in the next two weeks), and quick add buttons. Like Work Desk's Today line, the goal is one glance and close the app.
2. **People**: searchable list with interest tags and last-contact date. Person page shows their details, touch history, and the events you've done together. "Log a touch" is one tap from anywhere their name appears.
3. **Circles**: list of groups with members and a "Plan something" button that starts an event with that circle pre-invited.
4. **Events**: list and month view. An event page shows details, the invite list with each person's status, the who-brings-what list, "Draft the invite" (AI writes the text, you copy it), and "Nudge the quiet ones" (drafts a friendly follow-up to the no-answers).
5. **RSVP page**: the one public page. A friend taps your link and sees the event, picks In / Out / Maybe, can leave a note, and can claim an item from the list. No account, no app install. This is the whole coordination trick.
6. **Settings**: reminder preferences, export, delete account, and later the Google Calendar connection.

## 7. How coordination works (the RSVP link)

You create the event and pick the people. The app gives you a short link and a drafted message ("Golf Saturday, 9:04 tee time at Stonebridge. In? [link]"). You text it out yourself, from your own phone, so it comes from you, not from an app. Friends tap In or Out. The event page updates. You nudge the quiet ones with another drafted message.

Privacy rules for that public page: it shows the event details and, only if you switch it on, first names of who's in. Never phone numbers, never your contact list. The link uses a long random token, the page is rate limited, and the token stops working 30 days after the event (you can also kill it any time).

## 8. Calendar

Start simple and avoid a slow approval process:

- **Phase 1**: the app has its own month view, and every event offers "Add to calendar", which downloads a standard calendar file (.ics) that Google, Apple and Outlook all open. No connection, no sign-in, works day one.
- **Later, only if wanted**: a real Google Calendar connection that writes outings to your calendar automatically. Google reviews apps that ask for calendar access and that takes time, which is why it's not phase 1.

## 9. Staying in touch

- Birthday reminders 7 days ahead and day-of, shown on Home.
- Cadence: set "about every 6 weeks" on a person and they appear under "Reach out" when it's been longer, with a drafted opener you can copy.
- Event prep: "Camping in 5 days. 3 items unclaimed, 2 people haven't answered."
- Reminders run on Inngest (the same background-job service Work Desk uses).

## 10. AI, kept small

- Draft the invite, the nudge, and the reach-out message in your voice. Reuses the Work Desk style questionnaire idea in a lighter form.
- "Plan it for me": type "golf Saturday morning for the usual four" and get a filled-in event draft to confirm.
- Same safety rules as Work Desk: the AI never gets a tool that can send anything, and text from friends (RSVP notes) is data, not instructions.

## 11. Security, shortened from Work Desk section 8

The full Work Desk security program applies where relevant. The parts that matter most here:

- Clerk sign-in with MFA. RLS on every table with a test in CI.
- The RSVP page is the only public surface, so it gets the most care: long random tokens, rate limits, expiry, nothing personal exposed, all input validated on the server.
- No secrets in the repo. Security headers on every response. Export and delete-account self-serve.

## 12. Build order

Stop after each phase, run the app, and check it in plain words, same as Work Desk.

1. Scaffold: copy the Work Desk scaffold, strip the brand-switch machinery (one brand: yours), sign-in, layout.
2. People and circles: add, edit, search, tags, touch log, person pages.
3. Events: create, invite a circle or pick people, who-brings-what, month view, .ics download.
4. The public RSVP page with token links. This phase gets a short security review before it goes live, since it's the public door.
5. Home: This week, Reach out, birthdays. Reminders via Inngest.
6. AI drafting: invite, nudge, reach-out, plan-it-for-me.
7. Optional: Google Calendar connection, and a home-screen install (the app works like a phone app without an app store).
8. Polish: export, delete account, guided tour.

## 13. Open questions (answer these before phase 1)

1. Separate app or inside Work Desk? This plan recommends separate.
2. Is it only you, or should a friend ever co-organize an event? Phase 1 assumes only you, with account-free RSVP links for everyone else.
3. Is the .ics "Add to calendar" file enough to start, or is automatic Google Calendar sync a must-have on day one?
4. Which activities should ship as the starter interest tags? Golf, camping and happy hours are in; what else?

## 14. Definition of done, per phase

Same bar as Work Desk section 10: the build passes, every screen works on a 390 px phone, no em dashes in UI copy, disabled buttons say why, and you can check the phase without reading code.
