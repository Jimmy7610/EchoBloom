# EchoBloom Premium UI Rebuild

This plan details the implementation of a high-end, modern SaaS dark theme for EchoBloom, inspired by Linear and Vercel. All business logic and functionality will remain intact.

## Goal
Transform the current light-themed "template" feel into a premium, elevated dark theme SaaS experience with strong typographic hierarchy, glassmorphism, and subtle interactions.

## Proposed Changes

### 1. Global Color System & CSS
**Strategy:** We will define a new dark theme color palette directly in `apps/web/src/app/globals.css` using Tailwind v4's `@theme inline` structure. We will swap the root variables so the app is dark by default, dropping the need to add `dark:` to every single class. We will use a custom deep navy/charcoal palette.

#### [MODIFY] `apps/web/src/app/globals.css`
- Change `:root` `--background` to `#0B1020` (deep navy)
- Change `:root` `--foreground` to `#F8FAFC` (slate-50)
- Add custom color variables for surface cards (`#111827`), elevated cards (`#1A2235`), borders (`#1E293B`), and primary brand colors (`#6D5EF7` violet).
- Add CSS utilities for glassmorphism (`backdrop-blur`) and subtle glows.

### 2. Core Layout & Navigation
**Strategy:** Remove the stark white backgrounds and harsh borders. Use subtle, low-contrast borders and elevated backgrounds for active states.

#### [MODIFY] `apps/web/src/app/(dashboard)/layout.tsx`
- Ensure main content area uses the global dark background and padding feels generous.

#### [MODIFY] `apps/web/src/components/Sidebar.tsx`
- Background: Surface color `#111827`.
- Borders: Soft `#1E293B`.
- Active State: Glassy violet background `bg-indigo-500/10 text-indigo-400`.
- Profile Section: Elevated and cleaner.

#### [MODIFY] `apps/web/src/components/Topbar.tsx`
- Background: Transparent with `backdrop-blur` for a glassy effect.
- Search input: Dark elevated input `bg-slate-800/50` with subtle focus ring.

### 3. Page Redesigns

#### [MODIFY] `apps/web/src/app/(dashboard)/dashboard/page.tsx`
- **Hero/Checklist:** Convert into a premium onboarding module with a gradient border or subtle glow.
- **KPI Cards:** Use elevated surface backgrounds `bg-slate-800/50`, soft borders, and emphasize the numbers with strong typography.
- **AI Summary Panel:** Make it stand out with a subtle violet gradient border and glassy background to signify "intelligence". Improve sentiment chips (e.g., `bg-emerald-500/10 text-emerald-400`).
- **Recent Responses:** Cleaner list styling with subtle hover states.

#### [MODIFY] `apps/web/src/app/(dashboard)/prompts/page.tsx` & `create/page.tsx`
- Convert the prompt list into premium cards or a clean dark table.
- Upgrade form inputs in the create page to use dark backgrounds, soft borders, and strong focus rings (`focus:ring-indigo-500`).

#### [MODIFY] `apps/web/src/app/(dashboard)/responses/page.tsx`
- Refine the feed layout.
- Upgrade the sentiment badges to use the new dark-compatible semantic colors (emerald, amber, rose).

#### [MODIFY] `apps/web/src/app/(dashboard)/reports/page.tsx`
- Elevate the export card and empty states to look professional and intentional.

#### [MODIFY] `apps/web/src/app/(dashboard)/settings/page.tsx`
- Style the code snippet box to look like a modern developer tool (darker background, monospace font, clear copy button).

### 4. Auth & Landing Pages

#### [MODIFY] `apps/web/src/app/(auth)/login/page.tsx` & `signup/page.tsx`
- Upgrade to a premium dark layout.
- The auth card should be a glassy container `bg-slate-900/50 backdrop-blur-xl border border-slate-800`.

#### [MODIFY] `apps/web/src/app/page.tsx` (Landing Page)
- Update the landing page (which already has a dark section) to seamlessly transition into the new global dark theme so the entire app feels cohesive from first click to dashboard.

## Verification Plan

### Manual Verification
1. Open the dev server in the browser.
2. Verify visual appearance of Login/Signup.
3. Verify the Dashboard renders correctly with the new color palette.
4. Check all sub-pages (Prompts, Responses, Reports, Settings) to ensure no unreadable text (e.g., dark text on dark background).
5. Verify mobile responsiveness (Sidebar hiding, Topbar alignment).
