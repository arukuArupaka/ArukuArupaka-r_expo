"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Post } from "@/app/page";
import { supabase } from "@/lib/supabase";

interface ReportDetailProps {
  report: Post;
  onBack: () => void;
}

export function ReportDetail({ report, onBack }: ReportDetailProps) {
  const [resolving, setResolving] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [userEmailLoading, setUserEmailLoading] = useState<boolean>(false);
  const [userEmailError, setUserEmailError] = useState<string | null>(null);

  // auth.users からメール取得 (users テーブルに email が無い場合)
  useEffect(() => {
    let aborted = false;
    const fetchEmail = async () => {
      if (!report?.user_id) return;
      setUserEmailLoading(true);
      setUserEmailError(null);

      // まず public.users に email カラムがあればそこを見る (不要なら削除可)
      const { data: publicUser } = await supabase
        .from("users")
        .select("email")
        .eq("id", report.user_id)
        .maybeSingle();

      if (aborted) return;
      if (publicUser?.email) {
        setUserEmail(publicUser.email);
        setUserEmailLoading(false);
        return;
      }

      // 無い場合は管理用API経由 (service_role 使用) で auth 側から取得
      try {
        const res = await fetch(`/api/auth-user/${report.user_id}`);
        if (aborted) return;
        if (!res.ok) {
          setUserEmailError("取得失敗");
        } else {
          const json = await res.json();
          if (json?.email) {
            setUserEmail(json.email);
          } else {
            setUserEmailError("未登録");
          }
        }
      } catch (e) {
        if (!aborted) setUserEmailError("取得エラー");
      }
      if (!aborted) setUserEmailLoading(false);
    };
    fetchEmail();
    return () => {
      aborted = true;
    };
  }, [report?.user_id]);

  const handleResolve = async () => {
    setResolving(true);
    const { error } = await supabase
      .from("posts")
      .update({ status: "resolved" })
      .eq("id", report.id);

    if (error) {
      alert("完了処理に失敗しました");
    } else {
      alert("ステータスを「解決済み」に更新しました");
      onBack();
    }
    setResolving(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 p-0 h-auto text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        戻る
      </Button>

      <Card>
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* 日付といいね数 */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {new Date(report.created_at).toLocaleString()}
              </h2>
              <div className="flex items-center gap-1 text-red-500">
                <Heart className="h-5 w-5 fill-current" />
                <span>{report.good_count}</span>
              </div>
            </div>

            {/* 場所 */}
            <div>
              <label className="text-sm font-medium text-gray-600">場所</label>
              <div className="font-medium">
                {report.building && <span>{report.building}</span>}
                {report.place && report.building && <span> / </span>}
                {report.place && <span>{report.place}</span>}
                {!report.building && !report.place && <span>未指定</span>}
              </div>
            </div>

            {/* コメント */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                コメント
              </label>
              <div className="mt-1 text-lg">{report.comment || "なし"}</div>
            </div>

            {/* アカウント */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                アカウント (メール)
              </label>
              <div className="mt-1 text-lg">
                {userEmailLoading && (
                  <span className="text-gray-400">読み込み中...</span>
                )}
                {!userEmailLoading && userEmail && <span>{userEmail}</span>}
                {!userEmailLoading && !userEmail && userEmailError && (
                  <span className="text-red-500">{userEmailError}</span>
                )}
                {!userEmailLoading && !userEmail && !userEmailError && (
                  <span className="text-gray-400">不明</span>
                )}
              </div>
              {/* email は auth.users から取得。public.users へ同期する場合は DB トリガでコピー推奨 */}
            </div>

            {/* 画像表示 */}
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-3">
                画像
              </label>
              {report.image_url ? (
                <img
                  src={report.image_url}
                  alt="投稿画像"
                  className="rounded-lg border border-gray-300 max-h-64 object-contain mx-auto"
                />
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50 text-gray-400">
                  画像がありません
                </div>
              )}
            </div>

            {/* 解決ボタン */}
            {report.status !== "resolved" && (
              <div className="pt-6">
                <Button
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                  onClick={handleResolve}
                  disabled={resolving}
                >
                  {resolving ? "処理中..." : "完了にする"}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
