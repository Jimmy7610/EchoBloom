# Admin Testing Panel Documentation

The Admin Testing Panel is a dedicated internal tool located at `/admin`. It is designed to allow the primary admin (`eliassonjimmy76@gmail.com`) to safely simulate system activity, verify features, and manage demo data.

## Access Control & Security

1. **Email-Locked:** The `/admin` route is strictly restricted to `eliassonjimmy76@gmail.com`.
2. **Server-Side Verification:** Access is verified at the layout level using `supabase.auth.getUser()`. Any unauthorized authenticated user is redirected to `/dashboard`. Unauthenticated users are redirected to `/login` via middleware.
3. **Action Guards:** Every server action in `admin/actions.ts` includes a `verifyAdmin()` call that re-validates the user's email and workspace ownership before performing any mutation.
4. **No Hardcoded Secrets:** No passwords or keys are stored in the codebase. Authentication relies entirely on Supabase Auth.

## Available Tools

### 1. Demo Data Management
- **Generate Responses:** Create batches of 20, 50, or 100 responses with realistic text and sentiment.
- **Sentiment Simulation:** Generate "Negative Spikes" or "Onboarding Feedback" to test how the AI Summary and Trend Charts respond to specific data patterns.
- **Clear Demo Data:** Removes all responses, prompts, and notifications prefixed with `[DEMO]`.
- **Reset Workspace:** A thorough cleanup tool that removes all demo-related content to return the workspace to a clean state.

### 2. Feature Testing
- **Prompts:** Create Text, Emoji, or Rating prompts with a single click. Bulk activate or pause all demo prompts.
- **Notifications:** Simulate sentiment alerts or response milestones to verify the notification system.
- **AI Summary:** Manually trigger a demo AI insight insertion to verify UI rendering without consuming OpenAI credits.

## Safe Testing Guidelines

- **Prefixing:** All generated data is prefixed with `[DEMO]`. This is used by the system to distinguish between test data and real customer feedback.
- **Destructive Actions:** Use "Reset Workspace" or "Clear Demo Data" with caution. While these tools specifically target `[DEMO]` content, always ensure you are in the correct workspace.
- **Production Warning:** Do not use the "Generate 100 Responses" tool on a live production workspace unless explicitly testing load or layout stability.

## Troubleshooting

- **Access Denied:** Ensure you are logged in as `eliassonjimmy76@gmail.com`. If you are redirected to `/dashboard`, check that your Supabase email exactly matches the admin email.
- **Actions Failing:** Check the browser console. Most actions require at least one active prompt to exist; use the "Prompt Testing" tools to create one first.
