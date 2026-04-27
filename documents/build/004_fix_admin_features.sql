-- 004_fix_admin_features.sql
-- 1. Add missing 'sentiment' column to responses
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='responses' AND column_name='sentiment') THEN
        ALTER TABLE public.responses ADD COLUMN sentiment TEXT;
    END IF;
END $$;

-- 2. Enable RLS and add missing policies
-- Responses
DROP POLICY IF EXISTS "Workspace isolation - DELETE responses" ON public.responses;
CREATE POLICY "Workspace isolation - DELETE responses" ON public.responses FOR DELETE USING (EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = responses.workspace_id AND user_id = auth.uid()));

-- Insights
DROP POLICY IF EXISTS "Workspace isolation - INSERT insights" ON public.insights;
CREATE POLICY "Workspace isolation - INSERT insights" ON public.insights FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = workspace_id AND user_id = auth.uid()));

DROP POLICY IF EXISTS "Workspace isolation - DELETE insights" ON public.insights;
CREATE POLICY "Workspace isolation - DELETE insights" ON public.insights FOR DELETE USING (EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = insights.workspace_id AND user_id = auth.uid()));

-- Notifications
DROP POLICY IF EXISTS "Workspace isolation - DELETE notifications" ON public.notifications;
CREATE POLICY "Workspace isolation - DELETE notifications" ON public.notifications FOR DELETE USING (EXISTS (SELECT 1 FROM public.memberships WHERE workspace_id = notifications.workspace_id AND user_id = auth.uid()));
