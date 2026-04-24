-- 003_update_insights.sql
-- Adds sentiment distribution, risk level, and updated_at to insights table for AI Summaries

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='insights' AND column_name='sentiment_distribution') THEN
        ALTER TABLE public.insights ADD COLUMN sentiment_distribution JSONB DEFAULT '{"positive": 0, "neutral": 0, "negative": 0}'::jsonb;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='insights' AND column_name='risk_level') THEN
        ALTER TABLE public.insights ADD COLUMN risk_level TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='insights' AND column_name='updated_at') THEN
        ALTER TABLE public.insights ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;
    END IF;
END $$;

-- Ensure trigger exists for updated_at
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE event_object_table = 'insights' AND trigger_name = 'tr_set_updated_at') THEN
        CREATE TRIGGER tr_set_updated_at 
        BEFORE UPDATE ON public.insights 
        FOR EACH ROW 
        EXECUTE FUNCTION public.set_updated_at();
    END IF;
END $$;
