import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";

const supabaseUrl = "https://aqcfoappnzfeqerovymn.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxY2ZvYXBwbnpmZXFlcm92eW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDY3MjIsImV4cCI6MjA2NzAyMjcyMn0.vvVIrE5zttk5oM2XLHQZSTLbWZogpDh83aFTsHD5NEM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});

// React Native でバックグラウンド時の自動更新を制御（存在チェック付き）
try {
  const handler = (state) => {
    if (state === "active") {
      if (supabase?.auth?.startAutoRefresh) supabase.auth.startAutoRefresh();
    } else {
      if (supabase?.auth?.stopAutoRefresh) supabase.auth.stopAutoRefresh();
    }
  };
  const sub = AppState.addEventListener("change", handler);
  // 開始時に一度適用
  handler(AppState.currentState);
  // 注意: このモジュールはシングルトンとしてインポートしてください
} catch {}
