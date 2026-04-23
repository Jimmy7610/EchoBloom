-- EchoBloom Migration: Add missing tables, indexes, and policies
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/qnsnuhtwvcvfpqexqici/sql/new
-- Safe to run multiple times (uses IF NOT EXISTS / OR REPLACE)

----------------------------------------------------------------------
-- 1. Extensions
----------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

----------------------------------------------------------------------
-- 2. Utility function: set_updated_at
----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

----------------------------------------------------------------------
-- 3. Missing table: profiles
----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
END $$;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

----------------------------------------------------------------------
-- 4. Missing table: notifications
----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    related_prompt_id UUID REFERENCES public.prompts(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "View notifications" ON public.notifications;
    DROP POLICY IF EXISTS "Insert notifications" ON public.notifications;
    DROP POLICY IF EXISTS "Update notifications" ON public.notifications;
END $$;

CREATE POLICY "View notifications" ON public.notifications FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = notifications.workspace_id AND user_id = auth.uid())
);
CREATE POLICY "Insert notifications" ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Update notifications" ON public.notifications FOR UPDATE USING (
    EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = notifications.workspace_id AND user_id = auth.uid())
);

----------------------------------------------------------------------
-- 5. Missing table: insights
----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    prompt_id UUID REFERENCES public.prompts(id) ON DELETE CASCADE,
    summary TEXT NOT NULL,
    themes JSONB DEFAULT '[]'::jsonb,
    suggested_actions JSONB DEFAULT '[]'::jsonb,
    period_start TIMESTAMP WITH TIME ZONE,
    period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "View insights" ON public.insights;
END $$;

CREATE POLICY "View insights" ON public.insights FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = insights.workspace_id AND user_id = auth.uid())
);

----------------------------------------------------------------------
-- 6. Missing table: reports
----------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
    DROP POLICY IF EXISTS "View reports" ON public.reports;
END $$;

CREATE POLICY "View reports" ON public.reports FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = reports.workspace_id AND user_id = auth.uid())
);

----------------------------------------------------------------------
-- 7. handle_new_user trigger (auto-create profile on signup)
----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url')
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN
        CREATE TRIGGER on_auth_user_created
            AFTER INSERT ON auth.users
            FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    END IF;
END $$;

----------------------------------------------------------------------
-- 8. Indexes
----------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_workspaces_owner ON public.workspaces(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_user ON public.memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_workspace ON public.memberships(workspace_id);
CREATE INDEX IF NOT EXISTS idx_prompts_workspace ON public.prompts(workspace_id);
CREATE INDEX IF NOT EXISTS idx_responses_workspace ON public.responses(workspace_id);
CREATE INDEX IF NOT EXISTS idx_responses_prompt ON public.responses(prompt_id);
CREATE INDEX IF NOT EXISTS idx_responses_created ON public.responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_workspace ON public.notifications(workspace_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(workspace_id) WHERE is_read = false;

----------------------------------------------------------------------
-- 9. Backfill profiles for existing users
----------------------------------------------------------------------
INSERT INTO public.profiles (id)
SELECT id FROM auth.users
ON CONFLICT (id) DO NOTHING;
