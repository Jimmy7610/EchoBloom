-- 005_fix_workspace_rls.sql
-- HOTFIX: Fixes workspace creation failure caused by chicken-and-egg RLS problem
-- The SELECT policy on workspaces required a membership to exist,
-- but membership is created AFTER the workspace INSERT + .select().
-- Fix: Allow owner_user_id OR membership-based SELECT access.
-- Also fixes infinite recursion in memberships SELECT policy.

-- 1. Drop the broken policies
DROP POLICY IF EXISTS "Workspaces - Member SELECT" ON public.workspaces;
DROP POLICY IF EXISTS "Memberships - Workspace member SELECT" ON public.memberships;
DROP POLICY IF EXISTS "Memberships - Self SELECT" ON public.memberships;
DROP POLICY IF EXISTS "Memberships - Member SELECT" ON public.memberships;

-- 2. Recreate with correct logic

-- Workspaces: Owner can ALWAYS see their workspace (no membership needed).
-- Other members can also see it via the memberships table.
CREATE POLICY "Workspaces - Member SELECT" ON public.workspaces
    FOR SELECT TO authenticated USING (
        auth.uid() = owner_user_id OR
        EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = id AND user_id = auth.uid())
    );

-- Memberships: Users see their own rows only.
-- NOTE: Using a simple user_id check to avoid infinite recursion between
-- workspaces and memberships policies.
CREATE POLICY "Memberships - Self SELECT" ON public.memberships
    FOR SELECT TO authenticated USING (
        user_id = auth.uid()
    );
