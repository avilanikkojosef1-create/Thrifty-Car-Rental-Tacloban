import { createClient } from '@supabase/supabase-js';

// Accessing environment variables using Vite's import.meta.env
// The type will be resolved via vite-env.d.ts in the standard setup
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
