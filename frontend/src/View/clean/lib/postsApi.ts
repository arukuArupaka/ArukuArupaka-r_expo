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
  users?: { name?: string; nickname?: string | null } | null;
  [key: string]: any; // フォールバック
}

// 単発取得関数（必要なら直接呼び出し可能）
export const fetchPostsOnce = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select(`*, users ( name, nickname )`);
  if (error) throw error;
  return data || [];
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

    // Realtime購読: INSERT / UPDATE / DELETE に対応
    const channel = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload: any) => {
          setPosts((prev) => [payload.new as Post, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "posts" },
        (payload: any) => {
          setPosts((prev) =>
            prev.map((p) =>
              p.id === payload.new.id ? { ...p, ...(payload.new as Post) } : p
            )
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "posts" },
        (payload: any) => {
          setPosts((prev) => prev.filter((p) => p.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  return { posts, loading, error, refetch: load };
};

// 追加例：IDで取得（今後の拡張用）
export const fetchPostById = async (id: string): Promise<Post | null> => {
  const { data, error } = await supabase
    .from("posts")
    .select(`*, users ( name, nickname )`)
    .eq("id", id)
    .single();
  if (error) throw error;
  return data ?? null;
};

// Realtime購読は usePosts 内で実装済み
