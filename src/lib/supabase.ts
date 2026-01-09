import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  author: string;
  published: boolean;
  meta_title: string | null;
  meta_description: string | null;
  tags: string[];
  views: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
