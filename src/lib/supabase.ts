import { createClient } from '@supabase/supabase-js';

// Retrieve environment variables
const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const rawKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Provide a valid dummy URL structure if the user hasn't updated .env.local yet 
// to prevent the Next.js dev server from crashing on load.
const supabaseUrl = rawUrl.startsWith('http') ? rawUrl : 'https://dummy.supabase.co';
const supabaseAnonKey = rawKey && rawKey !== 'your_anon_key_here' ? rawKey : 'dummy-key';

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
