import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";
import Constants from "expo-constants";
const APP_ENV =
  Constants.expoConfig?.extra?.APP_ENV ?? (__DEV__ ? "development" : "production");

const CONFIG = {
  development: {
    SUPABASE_URL: "https://aqcfoappnzfeqerovymn.supabase.co",
    SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxY2ZvYXBwbnpmZXFlcm92eW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NDY3MjIsImV4cCI6MjA2NzAyMjcyMn0.vvVIrE5zttk5oM2XLHQZSTLbWZogpDh83aFTsHD5NEM",
  },
  production: {
    SUPABASE_URL: "https://jsaekkwmadbxzyasdfcl.supabase.co",
    SUPABASE_ANON_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzYWVra3dtYWRieHp5YXNkZmNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4MDczODksImV4cCI6MjA3NDM4MzM4OX0.AnTKfSLy3DPuzm4POIZu2eWLGrEvOR1_Jmx79iZIsxg",
  },
};

const SUPABASE_URL =
  Constants.expoConfig?.extra?.SUPABASE_URL ?? CONFIG[APP_ENV].SUPABASE_URL;
const SUPABASE_ANON_KEY =
  Constants.expoConfig?.extra?.SUPABASE_ANON_KEY ??
  CONFIG[APP_ENV].SUPABASE_ANON_KEY;
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
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
