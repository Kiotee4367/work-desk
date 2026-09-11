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

5. In the left menu click **Configure**, then **Restrictions**. Leave sign-up mode on **Public** so prospects can create their own account, and turn on **Bot protection** if it is offered. (Only set Restricted for an internal-only copy.)
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
   | `DEFAULT_BRAND` | `strategic-emarketing` for workdesksem, `holaris-advisors` for workdeskha |
   | `ADMIN_EMAILS` | your own sign-in email (several: separate with commas) |

5. Click **Deploy**. Wait about two minutes.
6. Click **Visit** (or the preview picture). That is your app's web address. Bookmark it.

From now on, every time Claude Code pushes a new phase, Vercel updates your app on its own within a few minutes. You never redo these steps.

### If Vercel says "No Production Deployment"

The project is connected but has not built yet. Either ask Claude Code to push a small
change (Vercel builds every push to `main`), or click **Deployments** in the left menu,
then **Create Deployment**, pick `main`, and click **Create**. Two minutes later the
Overview page shows a picture of the app and a **Visit** button.

If you added the Environment Variables after the first build, click **Deployments**,
open the three-dot menu on the newest one, and click **Redeploy**. Keys only take effect
on a new build.

## Two brands, two deployments

The same code runs once per brand. In Vercel you make two projects from the same repository:

| Vercel project | Brand | DEFAULT_BRAND | Clerk application |
|---|---|---|---|
| workdesksem | Strategic eMarketing | `strategic-emarketing` | its own |
| workdeskha | Holaris Advisors | `holaris-advisors` | its own |

Each project gets its own Clerk application (repeat Step 1 for the second brand) so the two prospect lists never mix. When Claude Code pushes an update, both projects rebuild on their own.

## Step 3: Make your first account

1. Open your app's web address. You should see a sign-in page with your brand's colors.
2. Click **Sign up** and use the email you put in ADMIN_EMAILS. That makes you an admin.
3. Check your inbox for the verification code, enter it, set a password.
4. You are in. Go to TESTING.md and run the Phase 1 checks.

## Later phases will ask for

- **Phase 2:** a Supabase project. Same idea: sign up at supabase.com, create a project, copy two values, paste them into Vercel's Environment Variables. Claude Code will give exact steps when it gets there.
- **Phase 3:** an Anthropic API key from console.anthropic.com.

## Rules to keep it safe

- Never paste a key into chat, email or a document. Keys go only into Vercel's Environment Variables.
- If you ever think a key leaked, go to Clerk and click **Regenerate** on it, then paste the new one into Vercel and click **Redeploy**.
- Keep the GitHub repository private. Share the app by giving people the web address and a Clerk invite.
