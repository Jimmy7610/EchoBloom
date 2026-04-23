-- EchoBloom Production Schema Update
-- Ensures all tables have required columns and indexes

-- 1. Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Utility Functions
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Core Tables (Add missing columns if they exist)

-- profiles
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- workspaces
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    owner_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan TEXT NOT NULL DEFAULT 'starter',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='workspaces' AND column_name='updated_at') THEN
        ALTER TABLE public.workspaces ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
    END IF;
END $$;

-- memberships
CREATE TABLE IF NOT EXISTS public.memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(workspace_id, user_id)
);
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='memberships' AND column_name='updated_at') THEN
        ALTER TABLE public.memberships ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
    END IF;
END $$;

-- prompts
CREATE TABLE IF NOT EXISTS public.prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    question_text TEXT NOT NULL,
    type TEXT NOT NULL,
    trigger_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'paused',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='prompts' AND column_name='updated_at') THEN
        ALTER TABLE public.prompts ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
    END IF;
END $$;

-- responses
CREATE TABLE IF NOT EXISTS public.responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prompt_id UUID NOT NULL REFERENCES public.prompts(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    session_id TEXT,
    rating_value INT,
    emoji_value TEXT,
    text_value TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='responses' AND column_name='updated_at') THEN
        ALTER TABLE public.responses ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='responses' AND column_name='sentiment') THEN
        ALTER TABLE public.responses ADD COLUMN sentiment TEXT;
    END IF;
END $$;

-- insights
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

-- reports
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    file_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- notifications
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

-- 4. Indexes
CREATE INDEX IF NOT EXISTS idx_workspaces_owner ON public.workspaces(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_user ON public.memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_workspace ON public.memberships(workspace_id);
CREATE INDEX IF NOT EXISTS idx_prompts_workspace ON public.prompts(workspace_id);
CREATE INDEX IF NOT EXISTS idx_responses_workspace ON public.responses(workspace_id);
CREATE INDEX IF NOT EXISTS idx_responses_prompt ON public.responses(prompt_id);
CREATE INDEX IF NOT EXISTS idx_responses_created ON public.responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_workspace ON public.notifications(workspace_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(workspace_id) WHERE is_read = false;

-- 5. Triggers
-- set_updated_at triggers
DO $$
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name IN ('profiles', 'workspaces', 'memberships', 'prompts', 'responses')
    LOOP
        IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE event_object_table = t AND trigger_name = 'tr_set_updated_at') THEN
            EXECUTE format('CREATE TRIGGER tr_set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();', t);
        END IF;
    END LOOP;
END;
$$;

-- handle_new_user trigger
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
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created') THEN
        CREATE TRIGGER on_auth_user_created
            AFTER INSERT ON auth.users
            FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    END IF;
END $$;

-- 6. RLS and Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- 7. Policies (Drop if exists then create)
DO $$ BEGIN
    DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
    DROP POLICY IF EXISTS "Users can view workspaces they are members of" ON public.workspaces;
    DROP POLICY IF EXISTS "Users can create workspaces" ON public.workspaces;
    DROP POLICY IF EXISTS "Users can view their own memberships" ON public.memberships;
    DROP POLICY IF EXISTS "Users can create their own memberships" ON public.memberships;
    DROP POLICY IF EXISTS "Workspace isolation - SELECT" ON public.prompts;
    DROP POLICY IF EXISTS "Workspace isolation - INSERT" ON public.prompts;
    DROP POLICY IF EXISTS "Workspace isolation - UPDATE" ON public.prompts;
    DROP POLICY IF EXISTS "Anyone can insert responses" ON public.responses;
    DROP POLICY IF EXISTS "Workspace isolation - SELECT responses" ON public.responses;
    DROP POLICY IF EXISTS "Workspace isolation - SELECT insights" ON public.insights;
    DROP POLICY IF EXISTS "Workspace isolation - SELECT reports" ON public.reports;
    DROP POLICY IF EXISTS "Workspace isolation - SELECT notifications" ON public.notifications;
    DROP POLICY IF EXISTS "Anyone can insert notifications" ON public.notifications;
    DROP POLICY IF EXISTS "Workspace isolation - UPDATE notifications" ON public.notifications;
END $$;

-- Re-create Policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view workspaces they are members of" ON public.workspaces FOR SELECT USING (EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = id AND user_id = auth.uid()));
CREATE POLICY "Users can create workspaces" ON public.workspaces FOR INSERT WITH CHECK (auth.uid() = owner_user_id);
CREATE POLICY "Users can view their own memberships" ON public.memberships FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create their own memberships" ON public.memberships FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Workspace isolation - SELECT" ON public.prompts FOR SELECT USING (EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = prompts.workspace_id AND user_id = auth.uid()));
CREATE POLICY "Workspace isolation - INSERT" ON public.prompts FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = workspace_id AND user_id = auth.uid()));
CREATE POLICY "Workspace isolation - UPDATE" ON public.prompts FOR UPDATE USING (EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = prompts.workspace_id AND user_id = auth.uid()));
CREATE POLICY "Anyone can insert responses" ON public.responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Workspace isolation - SELECT responses" ON public.responses FOR SELECT USING (EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = responses.workspace_id AND user_id = auth.uid()));
CREATE POLICY "Workspace isolation - SELECT insights" ON public.insights FOR SELECT USING (EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = insights.workspace_id AND user_id = auth.uid()));
CREATE POLICY "Workspace isolation - SELECT reports" ON public.reports FOR SELECT USING (EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = reports.workspace_id AND user_id = auth.uid()));
CREATE POLICY "Workspace isolation - SELECT notifications" ON public.notifications FOR SELECT USING (EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = notifications.workspace_id AND user_id = auth.uid()));
CREATE POLICY "Anyone can insert notifications" ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Workspace isolation - UPDATE notifications" ON public.notifications FOR UPDATE USING (EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = notifications.workspace_id AND user_id = auth.uid()));
