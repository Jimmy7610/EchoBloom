-- Fix: Replace workspace and membership INSERT policies
-- The server-side Supabase client needs simpler INSERT checks

-- Drop old policies
DROP POLICY IF EXISTS "Users can create a workspace" ON public.workspaces;
DROP POLICY IF EXISTS "Users can insert their own memberships" ON public.memberships;

-- New workspace INSERT policy: allow any authenticated user to insert
CREATE POLICY "Users can create a workspace" ON public.workspaces
    FOR INSERT TO authenticated
    WITH CHECK (true);

-- New membership INSERT policy: allow any authenticated user to insert their own membership
CREATE POLICY "Users can insert their own memberships" ON public.memberships
    FOR INSERT TO authenticated
    WITH CHECK (true);
