-- 004_update_responses.sql
-- Adds sentiment column to responses table

DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='responses' AND column_name='sentiment') THEN
        ALTER TABLE public.responses ADD COLUMN sentiment TEXT;
    END IF;
END $$;
