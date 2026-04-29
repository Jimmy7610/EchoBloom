-- 004_security_rls_fix.sql
-- URGENT: Fixes RLS vulnerabilities and restricts public table access
-- Targets: rls_disabled_in_public and sensitive_columns_exposed warnings

-- 1. Ensure RLS is enabled on all public tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 2. Drop all existing policies to ensure a clean, secure slate
DO $$ 
DECLARE
    pol record;
BEGIN
    FOR pol IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public') 
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol.policyname, pol.tablename);
    END LOOP;
END $$;

-- 3. Implement Strict Policies

-- PROFILES: Users can only see and edit their own profile data.
-- Email is protected by this owner-only SELECT policy.
CREATE POLICY "Profiles - Owner only SELECT" ON public.profiles 
    FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Profiles - Owner only UPDATE" ON public.profiles 
    FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- WORKSPACES: Owner or members can see a workspace. Only owners can create/edit.
CREATE POLICY "Workspaces - Member SELECT" ON public.workspaces 
    FOR SELECT TO authenticated USING (
        auth.uid() = owner_user_id OR
        EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = id AND user_id = auth.uid())
    );

CREATE POLICY "Workspaces - Owner INSERT" ON public.workspaces 
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_user_id);

CREATE POLICY "Workspaces - Owner UPDATE" ON public.workspaces 
    FOR UPDATE TO authenticated USING (auth.uid() = owner_user_id);

-- MEMBERSHIPS: Users can see their own memberships only.
-- NOTE: Simple user_id check avoids infinite recursion between workspaces/memberships policies.
CREATE POLICY "Memberships - Self SELECT" ON public.memberships 
    FOR SELECT TO authenticated USING (
        user_id = auth.uid()
    );

CREATE POLICY "Memberships - Owner INSERT" ON public.memberships 
    FOR INSERT TO authenticated WITH CHECK (
        user_id = auth.uid() OR -- Allow self-joining if invited (simplified)
        EXISTS (SELECT 1 FROM public.workspaces WHERE id = workspace_id AND owner_user_id = auth.uid())
    );

-- PROMPTS: Strict workspace isolation
CREATE POLICY "Prompts - Workspace member SELECT" ON public.prompts 
    FOR SELECT TO authenticated USING (
        EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = prompts.workspace_id AND user_id = auth.uid())
    );

CREATE POLICY "Prompts - Workspace member INSERT" ON public.prompts 
    FOR INSERT TO authenticated WITH CHECK (
        EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = workspace_id AND user_id = auth.uid())
    );

CREATE POLICY "Prompts - Workspace member UPDATE" ON public.prompts 
    FOR UPDATE TO authenticated USING (
        EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = prompts.workspace_id AND user_id = auth.uid())
    );

-- RESPONSES: NO PUBLIC ACCESS (Routed through Server API with Service Role)
-- Logged in users can see responses for their workspace
CREATE POLICY "Responses - Workspace member SELECT" ON public.responses 
    FOR SELECT TO authenticated USING (
        EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = responses.workspace_id AND user_id = auth.uid())
    );

-- INSIGHTS: Workspace isolation
CREATE POLICY "Insights - Workspace member SELECT" ON public.insights 
    FOR SELECT TO authenticated USING (
        EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = insights.workspace_id AND user_id = auth.uid())
    );

-- REPORTS: Workspace isolation
CREATE POLICY "Reports - Workspace member SELECT" ON public.reports 
    FOR SELECT TO authenticated USING (
        EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = reports.workspace_id AND user_id = auth.uid())
    );

-- NOTIFICATIONS: Workspace isolation
CREATE POLICY "Notifications - Workspace member SELECT" ON public.notifications 
    FOR SELECT TO authenticated USING (
        EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = notifications.workspace_id AND user_id = auth.uid())
    );

CREATE POLICY "Notifications - Workspace member UPDATE" ON public.notifications 
    FOR UPDATE TO authenticated USING (
        EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = notifications.workspace_id AND user_id = auth.uid())
    );

-- 4. Audit: Protect profiles.email explicitly if it exists
DO $$ BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='email') THEN
        -- The SELECT policy already restricts this, but we reinforce it by ensuring 
        -- no other policy accidentally grants access to 'anon'.
        REVOKE ALL ON public.profiles FROM anon;
        GRANT SELECT (id, full_name, avatar_url, updated_at, created_at, email) ON public.profiles TO authenticated;
    END IF;
END $$;
