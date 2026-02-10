import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export type Profile = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  display_name?: string;
  use_alias?: boolean;
  age?: number;
  gender?: string;
  birthday?: string;
  location?: string;
  full_address?: string;
  housing_status?: 'housed' | 'looking';
  house_type?: string;
  total_rooms?: number;
  current_occupants?: number;
  roommates_needed?: number;
  budget_min?: number;
  budget_max?: number;
  move_in_date?: string;
  lease_duration_value?: number;
  lease_duration_unit?: 'months' | 'years' | 'indefinite';
  contact_phone?: string;
  contact_email?: string;
  contact_instagram?: string;
  contact_facebook?: string;
  diet?: string;
  religion?: string;
  pets?: string;
  smoking?: string;
  drinking?: string;
  sleep_schedule?: string;
  background?: string;
  profile_photo_url?: string;
  avatar_id?: string;
  onboarding_completed?: boolean;
  onboarding_step?: string;
  created_at: string;
  updated_at: string;
};
