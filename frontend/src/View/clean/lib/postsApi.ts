import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";

// Post型（必要に応じて拡張）
export interface Post {
  id: string;
  user_id: string;
  building?: string;
  place?: string;
  comment?: string;
  image_url?: string | null;
  image_url_after?: string | null;
  request?: boolean;
  status?: string;
  latitude: number;
  longitude: number;
  created_at?: string;
  users?: { nickname?: string | null } | null;
  [key: string]: any; // フォールバック
}

export const fetchPostsOnce = async (): Promise<Post[]> => {
  const [limitedRes, newRes] = await Promise.all([
    supabase
      .from("posts")
      .select(`*, users ( nickname )`)
      .in("status", ["resolved", "self"])
      .order("created_at", { ascending: false })
      .limit(80),
    supabase
      .from("posts")
      .select(`*, users ( nickname )`)
      .eq("status", "new")
      .order("created_at", { ascending: false }),
  ]);

  if (limitedRes.error) throw limitedRes.error;
  if (newRes.error) throw newRes.error;

  const combined = [...(newRes.data ?? []), ...(limitedRes.data ?? [])].sort(
    (a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return combined as Post[];
};

// カスタムフック：一覧取得 + ローディング/エラー状態 + リフレッシュ
export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchPostsOnce();
      setPosts(list);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();

    const channel = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload: any) => {
          setPosts((prev) => {
            const next = [payload.new as Post, ...prev];
            return resortAndTrim(next);
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "posts" },
        (payload: any) => {
          setPosts((prev) => {
            const updated = prev.map((p) =>
              p.id === payload.new.id ? { ...p, ...(payload.new as Post) } : p
            );
            return resortAndTrim(updated);
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "posts" },
        (payload: any) => {
          setPosts((prev) => {
            const filtered = prev.filter((p) => p.id !== payload.old.id);
            return resortAndTrim(filtered);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  return { posts, loading, error, refetch: load };
};

// 並び替え + resolved/self 合計80件制限
function resortAndTrim(list: Post[]): Post[] {
  const sorted = [...list].sort(
    (a, b) =>
      new Date(b.created_at || 0).getTime() -
      new Date(a.created_at || 0).getTime()
  );
  let limitedCount = 0;
  const result: Post[] = [];
  for (const p of sorted) {
    if (p.status === "resolved" || p.status === "self") {
      if (limitedCount >= 80) continue;
      limitedCount++;
    }
    result.push(p);
  }
  return result;
}

// 追加例：IDで取得（今後の拡張用）
export const fetchPostById = async (id: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from("posts")
    .select(`*, users ( nickname )`)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data ?? null;
};

// Realtime購読は usePosts 内で実装済み
