-- Initial Schema for EchoBloom MVP

-- Enable uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: workspaces
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    owner_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plan TEXT NOT NULL DEFAULT 'starter',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: memberships
CREATE TABLE IF NOT EXISTS public.memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member', -- e.g., 'owner', 'admin', 'member'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(workspace_id, user_id)
);

-- Row Level Security (RLS) configuration

ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- Workspaces Policies
-- 1. A user can view a workspace if they are a member of it.
CREATE POLICY "Users can view their workspaces" ON public.workspaces
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.memberships
            WHERE memberships.workspace_id = workspaces.id
            AND memberships.user_id = auth.uid()
        )
    );

-- 2. A user can insert a workspace if they are authenticated, and they become the owner
CREATE POLICY "Users can create a workspace" ON public.workspaces
    FOR INSERT WITH CHECK (auth.uid() = owner_user_id);

-- Memberships Policies
-- 1. A user can view their own memberships
CREATE POLICY "Users can view their own memberships" ON public.memberships
    FOR SELECT USING (user_id = auth.uid());

-- 2. A user can create a membership (during workspace creation)
CREATE POLICY "Users can insert their own memberships" ON public.memberships
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Table: prompts
CREATE TABLE IF NOT EXISTS public.prompts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    question_text TEXT NOT NULL,
    type TEXT NOT NULL, -- 'text', 'rating', 'emoji'
    trigger_type TEXT NOT NULL, -- 'after_signup', 'first_login', 'step_completed', 'time_active'
    status TEXT NOT NULL DEFAULT 'paused', -- 'active', 'paused'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

-- Prompts Policies
-- 1. Users can view prompts in their workspaces
CREATE POLICY "Users can view prompts in their workspaces" ON public.prompts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.memberships
            WHERE memberships.workspace_id = prompts.workspace_id
            AND memberships.user_id = auth.uid()
        )
    );

-- 2. Users can insert prompts in their workspaces
CREATE POLICY "Users can insert prompts in their workspaces" ON public.prompts
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.memberships
            WHERE memberships.workspace_id = workspace_id
            AND memberships.user_id = auth.uid()
        )
    );

-- 3. Users can update prompts in their workspaces
CREATE POLICY "Users can update prompts in their workspaces" ON public.prompts
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.memberships
            WHERE memberships.workspace_id = prompts.workspace_id
            AND memberships.user_id = auth.uid()
        )
    );

-- Table: responses
CREATE TABLE IF NOT EXISTS public.responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prompt_id UUID NOT NULL REFERENCES public.prompts(id) ON DELETE CASCADE,
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    session_id TEXT, -- To track anonymous users/visitors
    rating_value INT,
    emoji_value TEXT,
    text_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

-- Responses Policies
-- 1. Anyone can insert a response (public endpoint for widget)
CREATE POLICY "Anyone can insert responses" ON public.responses
    FOR INSERT WITH CHECK (true);

-- 2. Users can view responses in their workspaces
CREATE POLICY "Users can view responses in their workspaces" ON public.responses
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.memberships
            WHERE memberships.workspace_id = responses.workspace_id
            AND memberships.user_id = auth.uid()
        )
    );

-- Table: notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'sentiment_alert', 'milestone_1', 'milestone_10', 'prompt_activated', 'prompt_paused'
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    related_prompt_id UUID REFERENCES public.prompts(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Notifications Policies
-- 1. Users can view notifications in their workspaces
CREATE POLICY "Users can view notifications in their workspaces" ON public.notifications
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.memberships
            WHERE memberships.workspace_id = notifications.workspace_id
            AND memberships.user_id = auth.uid()
        )
    );

-- 2. Anyone can insert notifications (to allow triggers from API/Widget)
CREATE POLICY "Anyone can insert notifications" ON public.notifications
    FOR INSERT WITH CHECK (true);

-- 3. Users can update notifications in their workspaces (for marking as read)
CREATE POLICY "Users can update notifications in their workspaces" ON public.notifications
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.memberships
            WHERE memberships.workspace_id = notifications.workspace_id
            AND memberships.user_id = auth.uid()
        )
    );
