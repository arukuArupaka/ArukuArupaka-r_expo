"use client"

import { useState } from "react"
import { ArrowLeft, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Post } from "@/app/page"
import { supabase } from "@/lib/supabase"

interface ReportDetailProps {
  report: Post
  onBack: () => void
}

export function ReportDetail({ report, onBack }: ReportDetailProps) {
  const [resolving, setResolving] = useState(false)

  const handleResolve = async () => {
    setResolving(true)
    const { error } = await supabase
      .from("posts")
      .update({ status: "resolved" })
      .eq("id", report.id)

    if (error) {
      alert("完了処理に失敗しました")
    } else {
      alert("ステータスを「解決済み」に更新しました")
      onBack()
    }
    setResolving(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-6 p-0 h-auto text-gray-600 hover:text-gray-900">
        <ArrowLeft className="h-5 w-5 mr-2" />
        戻る
      </Button>

      <Card>
        <CardContent className="p-8">
          <div className="space-y-6">
            {/* 日付といいね数 */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{new Date(report.created_at).toLocaleString()}</h2>
              <div className="flex items-center gap-1 text-red-500">
                <Heart className="h-5 w-5 fill-current" />
                <span>{report.good_count}</span>
              </div>
            </div>

            {/* 場所 */}
            <div>
              <label className="text-sm font-medium text-gray-600">場所</label>
              <div className="mt-1 text-lg">{report.building ?? report.place ?? "未指定"}</div>
            </div>

            {/* コメント */}
            <div>
              <label className="text-sm font-medium text-gray-600">コメント</label>
              <div className="mt-1 text-lg">{report.comment || "なし"}</div>
            </div>

            {/* アカウント（仮表示） */}
            <div>
              <label className="text-sm font-medium text-gray-600">アカウント</label>
              <div className="mt-1 text-lg">{report.user_id}</div>
              {/* 本来ならユーザー情報もSupabaseから取得してメールアドレスを表示 */}
            </div>

            {/* 画像表示 */}
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-3">画像</label>
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
  )
}
