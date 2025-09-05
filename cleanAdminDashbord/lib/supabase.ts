// lib/supabase.ts
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://aqcfoappnzfeqerovymn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxY2ZvYXBwbnpmZXFlcm92eW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDY3MjIsImV4cCI6MjA2NzAyMjcyMn0.vvVIrE5zttk5oM2XLHQZSTLbWZogpDh83aFTsHD5NEM'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true, // ブラウザにセッション保存
    autoRefreshToken: true, // トークン自動更新
    storageKey: 'cleanAdminDashbord-auth', // 衝突防止のストレージキー
  },
})
