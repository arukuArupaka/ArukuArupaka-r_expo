// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true, // ブラウザにセッション保存
    autoRefreshToken: true, // トークン自動更新
    storageKey: "cleanAdminDashbord-auth", // 衝突防止のストレージキー
  },
});
