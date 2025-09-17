"use client"

import React, { useEffect, useState } from "react"
import { ArrowLeft, Heart, Camera, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import type { Post } from "@/app/page" // Post型を利用

interface SelfReportsProps {
  onBack?: () => void // 戻るボタン
}

export function SelfReports({ onBack }: SelfReportsProps) {
  const [reports, setReports] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetchSelfReports()
  }, [])

  const fetchSelfReports = async () => {
    setLoading(true)

    // ログインユーザーを取得
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    if (sessionError || !sessionData?.session?.user) {
      console.error("ログインユーザー取得失敗:", sessionError)
      setLoading(false)
      return
    }

    const userId = sessionData.session.user.id
    console.log("ログインユーザーID:", userId)

    // 自分の投稿のみ取得
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", userId)

    if (error) {
      console.error("自分の投稿取得エラー:", error)
    } else {
      console.log("取得データ:", data)
      setReports(data as Post[])
    }

    setLoading(false)
  }

  return (
    <div>
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        {onBack && (
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-0 h-auto text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            戻る
          </Button>
        )}
        <h1 className="text-2xl font-bold text-gray-900">自分の投稿</h1>
        <div></div>
      </div>

      {/* 読み込み中 */}
      {loading ? (
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-300 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">読み込み中...</h3>
        </div>
      ) : reports.length === 0 ? (
        // 投稿なし
        <div className="text-center py-12">
          <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">投稿はありません</h3>
          <p className="text-gray-600">まだ自分の投稿はありません。</p>
        </div>
      ) : (
        // 投稿リスト
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-sm text-gray-500">
                        {report.created_at?.split("T")[0]}
                      </span>
                      <div className="flex items-center gap-1 text-red-500">
                        <Heart className="h-4 w-4 fill-current" />
                        <span className="text-sm">{report.good_count}</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800 border-0">
                        自分の投稿
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="mb-3">
                        <span className="text-sm text-gray-600">場所</span>
                        <div className="font-medium">
                          {report.building && <span>{report.building}</span>}
                          {report.place && report.building && <span> / </span>}
                          {report.place && <span>{report.place}</span>}
                          {!report.building && !report.place && <span>未指定</span>}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">コメント</span>
                        <div className="text-gray-800">{report.comment}</div>
                      </div>
                    </div>

                    {report.resolved && (
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>解決日: {report.resolved}</span>
                        </div>
                        {report.assignedTo && (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>担当者: {report.assignedTo}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center ml-4">
                    {report.image_url ? (
                      <img
                        src={report.image_url}
                        alt="現場写真"
                        className="object-cover w-20 h-20 rounded-lg"
                      />
                    ) : (
                      <Camera className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
