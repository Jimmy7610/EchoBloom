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
