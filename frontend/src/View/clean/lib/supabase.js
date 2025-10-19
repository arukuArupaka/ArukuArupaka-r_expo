import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { AppState } from "react-native";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};
const APP_ENV = extra.APP_ENV ?? (__DEV__ ? "development" : "production");
const SUPABASE_URL = extra.SUPABASE_URL;
const SUPABASE_ANON_KEY = extra.SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false,
  },
});

try {
  const handler = (state) => {
    if (state === "active") {
      if (supabase?.auth?.startAutoRefresh) supabase.auth.startAutoRefresh();
    } else {
      if (supabase?.auth?.stopAutoRefresh) supabase.auth.stopAutoRefresh();
    }
  };
  const sub = AppState.addEventListener("change", handler);
  handler(AppState.currentState);
} catch {}
