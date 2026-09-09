# Testing checklist

Do this after each phase. Each line says what to click and what you should see.
If something does not match, tell Claude Code the line number and what you saw instead.

## Phase 1: shell, brand switch, sign-in

Open your app's web address (from SETUP.md) and sign in.

If instead you see a plain page starting "This work desk is not ready yet", read the
sentence after it. It names which key is wrong and how to fix it in Vercel's Environment
Variables. After fixing, click Deployments, then Redeploy on the newest one.

| # | Click | You should see |
|---|---|---|
| 1 | Nothing yet, just look | Navy header with the Strategic eMarketing logo. Six tabs under it: Start here, Inbox, Ask anything, Brand library, Notebook, Settings. |
| 2 | Each of the six tabs | The tab you are on is underlined in green. Inbox, Ask anything, Brand library and Notebook say which phase builds them. |
| 3 | **Settings** | A Brand box with two choices, a Setup status box, and a "Coming in later phases" list. |
| 4 | **Holaris Advisors**, then **Save brand** | A yellow note: "Brand saved. You are now on Holaris Advisors." The header turns black with a gold star logo. Buttons turn black. |
| 5 | **Start here** | Still Holaris colors. Heading says "Welcome to your Holaris work desk". |
| 6 | **Settings**, **Strategic eMarketing**, **Save brand** | Back to navy and green. |
| 7 | Your picture or initials, top right | A menu with **Sign out**. Click it. |
| 8 | Nothing, after sign out | The sign-in page. You cannot see any other screen until you sign in again. |
| 9 | On your phone, open the same address | Same screens, one column, tabs scroll sideways, nothing cut off. |

**Done when all nine match.** Tell Claude Code: "Phase 1 checks pass" or list the lines that failed.

## Phase 2 and later

Claude Code adds a new table here at the end of each phase.
