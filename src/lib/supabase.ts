import { createClient } from '@supabase/supabase-js';

// Accessing environment variables using runtime injection if available, or Vite's import.meta.env
const getEnvVar = (key: string) => {
  if (typeof window !== 'undefined' && (window as any).__ENV__ && (window as any).__ENV__[key]) {
    return (window as any).__ENV__[key];
  }
  return (import.meta as any).env[key];
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || 'https://placeholder.supabase.co';
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || 'placeholder_key';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
