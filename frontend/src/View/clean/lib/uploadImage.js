import { supabase } from "./supabase";
// use legacy API to keep getInfoAsync and other legacy helpers available
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

// デバッグ用ログを一括制御（必要になったら true）
const DEBUG_UPLOAD = false;

// 単体画像アップロード (React Native file:// / Web File / 既存URL)
export async function uploadSingleImage(
  source,
  { userId, bucket = "post-images", prefix, verify = true } = {}
) {
  if (!source) return null;
  const isFile = typeof File !== "undefined" && source instanceof File;
  let ext;
  if (isFile) ext = (source.name.split(".").pop() || "jpg").toLowerCase();
  else if (typeof source === "string")
    ext = (source.split("?")[0].split(".").pop() || "jpg").toLowerCase();
  else throw new Error("未知の画像ソース");
  if (["heic", "heif"].includes(ext)) ext = "jpg";
  const contentType =
    ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg";

  let uploadBody; // Blob | ArrayBuffer
  let originalSize = 0;
  if (isFile) {
    uploadBody = source;
    originalSize = source.size || 0;
  } else if (typeof source === "string" && source.startsWith("file://")) {
    // React Native: base64 -> Uint8Array -> ArrayBuffer (fetch(data URI)回避)
    const info = await FileSystem.getInfoAsync(source);
    if (!info.exists || info.size === 0)
      throw new Error("ローカルファイルサイズが 0");
    const base64 = await FileSystem.readAsStringAsync(source, {
      encoding: FileSystem.EncodingType.Base64,
    });
    if (!base64) throw new Error("Base64取得失敗");
    const uint8 = decodeBase64ToUint8Array(base64);
    originalSize = uint8.length;
    uploadBody = uint8.buffer;
    if (DEBUG_UPLOAD) {
      console.log("[uploadSingleImage][RN] decoded", {
        originalFileSize: info.size,
        uint8Length: uint8.length,
      });
    }
  } else if (typeof source === "string") {
    const res = await fetch(source);
    const blob = await res.blob();
    originalSize = blob.size;
    uploadBody = blob;
  }
  if (
    !uploadBody ||
    (uploadBody instanceof ArrayBuffer && uploadBody.byteLength === 0)
  ) {
    throw new Error("アップロードデータ生成失敗 (0 byte)");
  }

  const name = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const parts = [userId, prefix, name].filter(Boolean);
  const path = parts.join("/");

  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, uploadBody, { upsert: false, contentType });
  if (error) throw new Error(`アップロード失敗: ${error.message}`);

  // アップロード直後にサイズ検証（白画像=0 byte 検知用）
  if (verify) {
    try {
      const { data: downloaded, error: dlErr } = await supabase.storage
        .from(bucket)
        .download(path);
      if (dlErr) {
        if (DEBUG_UPLOAD) {
          console.warn("[uploadSingleImage] download検証失敗", dlErr.message);
        }
      } else if (downloaded?.size === 0) {
        if (DEBUG_UPLOAD) {
          console.error("[uploadSingleImage] アップ後サイズ0 DETECTED", {
            path,
            originalSize,
          });
        }
        throw new Error(
          "アップ後サイズが0でした (端末のbase64->blob変換不具合の可能性)"
        );
      } else {
        if (DEBUG_UPLOAD) {
          console.log("[uploadSingleImage] verify size ok", {
            path,
            size: downloaded.size,
          });
        }
      }
    } catch (verErr) {
      // ここで throw すると呼び出し側全体失敗するので再throw
      throw verErr;
    }
  }
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  if (!data?.publicUrl) throw new Error("公開URL取得失敗");
  return data.publicUrl;
}

// base64 文字列 -> Uint8Array (atob 非依存)
function decodeBase64ToUint8Array(b64) {
  const table =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let buffer = 0;
  let bits = 0;
  const out = [];
  for (let i = 0; i < b64.length; i++) {
    const c = b64[i];
    if (c === "=") break;
    const val = table.indexOf(c);
    if (val === -1) continue;
    buffer = (buffer << 6) | val;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out.push((buffer >> bits) & 0xff);
    }
  }
  return Uint8Array.from(out);
}

// 画像(before/after) をまとめてアップロードし posts へ挿入
export async function uploadPostWithImages({
  userId,
  building = "",
  place = "",
  comment = "",
  beforeUri, // required
  afterUri, // self の時 required
  isRequestingCleaning,
  latitude,
  longitude,
  bucket = "post-images",
  verify = true,
}) {
  if (!userId) throw new Error("userId必須");
  if (!beforeUri) throw new Error("before画像必須");
  if (!isRequestingCleaning && !afterUri) throw new Error("after画像必須");

  // 並列アップロード (失敗時の片方クリーンアップは今は省略)
  const [imageUrl, imageUrlAfter] = await Promise.all([
    uploadSingleImage(beforeUri, {
      userId,
      bucket,
      prefix: isRequestingCleaning ? "request" : "self",
      verify,
    }),
    isRequestingCleaning
      ? Promise.resolve(null)
      : uploadSingleImage(afterUri, {
          userId,
          bucket,
          prefix: "after",
          verify,
        }),
  ]);

  const status = isRequestingCleaning ? "new" : "self";
  const payload = {
    user_id: userId,
    building,
    place,
    comment,
    image_url: imageUrl,
    image_url_after: imageUrlAfter,
    request: isRequestingCleaning,
    status,
    latitude,
    longitude,
  };

  const { data, error } = await supabase
    .from("posts")
    .insert([payload])
    .select()
    .limit(1);
  if (error) throw new Error(`posts挿入失敗: ${error.message}`);
  return { post: data?.[0] || null, imageUrl, imageUrlAfter };
}

// 任意: ストレージ上オブジェクトサイズ確認 (0 byte 調査用)
export async function verifyObjectSize(path, bucket = "post-images") {
  const { data, error } = await supabase.storage.from(bucket).download(path);
  if (error) throw error;
  return data.size;
}

// publicUrl からストレージ内のオブジェクトパス抽出
export function extractStoragePathFromPublicUrl(url, bucket = "post-images") {
  if (!url) return null;
  // 形式: https://<proj>.supabase.co/storage/v1/object/public/<bucket>/<path>
  const marker = `/storage/v1/object/public/${bucket}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  return url.substring(idx + marker.length);
}

// 最近の posts の画像サイズをまとめてチェック（デバッグ用）
export async function debugCheckRecentPostImageSizes(limit = 10) {
  const { data, error } = await supabase
    .from("posts")
    .select("id,image_url,image_url_after,created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  const results = [];
  for (const row of data) {
    for (const field of ["image_url", "image_url_after"]) {
      const url = row[field];
      if (!url) continue;
      const path = extractStoragePathFromPublicUrl(url);
      if (!path) {
        results.push({ id: row.id, field, error: "pathExtractFail" });
        continue;
      }
      try {
        const size = await verifyObjectSize(path);
        results.push({ id: row.id, field, size, path });
      } catch (e) {
        results.push({ id: row.id, field, error: e.message });
      }
    }
  }
  if (DEBUG_UPLOAD) {
    console.log("[debugCheckRecentPostImageSizes]", results);
  }
  return results;
}

export default {
  uploadSingleImage,
  uploadPostWithImages,
  verifyObjectSize,
  extractStoragePathFromPublicUrl,
  debugCheckRecentPostImageSizes,
};
