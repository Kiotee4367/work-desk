# Keeping it secure after launch

A checklist for the owner. No coding. Tick these off on a calendar reminder.
The full security program is in CLAUDE.md, section 8. This is the short version.

## Every week (10 minutes)

- [ ] GitHub, Pull requests: merge any **Dependabot** update whose checks are green. If a check is red, ask Claude Code to look at it.
- [ ] Sentry email digest: any new error you have not seen before? Ask Claude Code.
- [ ] Uptime email: any downtime? If yes, check Vercel's status page and ask Claude Code.

## Every month (20 minutes)

- [ ] Vercel, Environment Variables: is `ADMIN_EMAILS` still exactly the people who should be admins?
- [ ] Clerk, Users: anyone who left the company? Delete their account.
- [ ] Settings, Security in the app: does the "last cleanup ran" date show within the past day?
- [ ] Look at the audit log for admin actions you do not recognize.

## Every three months (1 hour, with Claude Code)

- [ ] Rotate keys: Clerk, Supabase, Anthropic, Google, Slack, Microsoft, and the token encryption key. Claude Code gives the click path for each; you paste new values into Vercel and redeploy.
- [ ] Ask Claude Code to run the security test suite and report.
- [ ] Ask Claude Code to test a database backup restore.
- [ ] Re-read the privacy notice in the app. Still true?

## Once a year

- [ ] Hire an outside penetration test before adding a paid tier or an enterprise client.

## If something goes wrong

- **A key leaked** (pasted somewhere public, laptop lost): rotate that key in its dashboard within the hour, paste the new one into Vercel, Redeploy. Tell Claude Code so it can check the logs.
- **You suspect someone got into user data:** in Clerk, turn sign-up and sign-in off (Restrictions). Tell Claude Code immediately. Do not delete anything.
- **Someone emails a security report:** reply within two business days, forward it to Claude Code. Critical issues get fixed within a week.

## Who to contact

Security reports come to the address in `public/.well-known/security.txt`.
