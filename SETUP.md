# First-time setup, no coding needed

You do this once. About 15 minutes. You need a web browser and nothing else.

## Step 1: Get sign-in keys from Clerk (5 minutes)

1. Go to https://clerk.com and click **Sign up**. Use your work email.
2. Click **Create application**.
3. Name it **Work Desk**. Under sign-in options, tick **Email** and **Google**. Click **Create application**.
4. You land on a page with two keys. Leave this tab open. You will copy from it in Step 2.
   - The first starts with `pk_test_`
   - The second starts with `sk_test_`

Two safety settings while you are here:

5. In the left menu click **Configure**, then **Restrictions**. Set sign-up mode to **Restricted**. Now only people you invite can create an account.
6. Click **Configure**, then **Multi-factor**. Turn on **Authenticator application**. This lets users add a second check at sign-in.

## Step 2: Put the app online with Vercel (5 minutes)

1. Go to https://vercel.com and click **Sign up**. Choose **Continue with GitHub** and approve.
2. Click **Add New**, then **Project**.
3. Find **work-desk** in the list and click **Import**. If you don't see it, click **Adjust GitHub App Permissions** and allow access to the work-desk repository.
4. Open the **Environment Variables** section. Add these two, one at a time. Copy the values from the Clerk tab.

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | the key starting with `pk_test_` |
   | `CLERK_SECRET_KEY` | the key starting with `sk_test_` |

5. Click **Deploy**. Wait about two minutes.
6. Click **Visit** (or the preview picture). That is your app's web address. Bookmark it.

From now on, every time Claude Code pushes a new phase, Vercel updates your app on its own within a few minutes. You never redo these steps.

## Step 3: Make your first account

1. Open your app's web address. You should see a sign-in page with your brand's colors.
2. Click **Sign up**. Because sign-up is Restricted, you first need to invite yourself:
   go back to the Clerk tab, click **Users**, then **Invite**, type your email, send.
3. Open the invite email, follow the link, set a password.
4. You are in. Go to TESTING.md and run the Phase 1 checks.

## Later phases will ask for

- **Phase 2:** a Supabase project. Same idea: sign up at supabase.com, create a project, copy two values, paste them into Vercel's Environment Variables. Claude Code will give exact steps when it gets there.
- **Phase 3:** an Anthropic API key from console.anthropic.com.

## Rules to keep it safe

- Never paste a key into chat, email or a document. Keys go only into Vercel's Environment Variables.
- If you ever think a key leaked, go to Clerk and click **Regenerate** on it, then paste the new one into Vercel and click **Redeploy**.
- Keep the GitHub repository private. Share the app by giving people the web address and a Clerk invite.
