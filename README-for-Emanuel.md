# How to build this with Claude Code

1. Make a new empty folder on your computer named `work-desk`.
2. Unzip this package into it. You should see CLAUDE.md, README-for-Emanuel.md, a `prompts` folder and a `prototype` folder.
3. Open a terminal in that folder and run `claude`.
4. Paste this first message:

   Read CLAUDE.md and the prototype in prototype/WorkDashboard.jsx. Confirm you understand the ten sections, list any questions, then start Phase 1 of the build order. Stop after Phase 1 and tell me what to click to check it.

5. Answer its questions one at a time. When it says a phase is done, open the app in your browser and follow its checking instructions.
6. When you are happy, say: Continue to the next phase.
7. Repeat until Phase 9 is done.

Things Claude Code will ask you for along the way (have them ready):
- Supabase project URL and keys (from supabase.com, Project Settings, API)
- Clerk keys (from clerk.com, API Keys)
- Anthropic API key (from console.anthropic.com)
- Later: Google Cloud OAuth client for Gmail, and a Slack app for Slack

Never paste keys into chat here. Put them in the `.env.local` file Claude Code creates, when it tells you to.

Package contents:
- CLAUDE.md: the full build spec Claude Code follows
- prompts/assistant-system-prompt.md: the assistant's instructions
- prototype/WorkDashboard.jsx: the working design reference
