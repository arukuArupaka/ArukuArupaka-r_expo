import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aqcfoappnzfeqerovymn.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxY2ZvYXBwbnpmZXFlcm92eW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDY3MjIsImV4cCI6MjA2NzAyMjcyMn0.vvVIrE5zttk5oM2XLHQZSTLbWZogpDh83aFTsHD5NEM'; // ←自分のanonキーに置き換えて！

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
