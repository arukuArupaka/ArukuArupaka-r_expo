import { supabase } from "../lib/supabase";

export async function uploadImageAsync(uri, userId, bucket = "post-images") {
  // 拡張子を推定（クエリ文字列除去）
  const clean = uri.split("?")[0];
  const ext = (clean.split(".").pop() || "jpg").toLowerCase();

  // ファイルパス（ユーザーごとに分ける）
  const filePath = `${userId}/${Date.now()}.${ext}`;

  // Expo/React Native: fetch→blob
  const res = await fetch(uri);
  const blob = await res.blob();

  const contentType =
    ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, blob, { contentType, upsert: false });

  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`);
  }

  // Private運用なのでURLではなく「Storageのパス」を返す
  return filePath;
}
