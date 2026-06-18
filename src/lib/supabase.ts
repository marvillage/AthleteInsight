import { createClient } from "@supabase/supabase-js";

// Supabase project credentials come from Vite env vars.
// Local dev: put them in a .env file (see .env.example).
// Production: set them in your Vercel project's Environment Variables.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// When the project isn't configured yet, the app shows a friendly setup
// notice instead of crashing.
export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = createClient(
  url ?? "https://placeholder.supabase.co",
  anonKey ?? "placeholder-anon-key",
);
