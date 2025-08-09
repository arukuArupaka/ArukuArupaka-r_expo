"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Camera, Clock, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Report } from "@/app/page"
import { supabase } from "@/lib/supabase"

interface ActiveReportsProps {
  reports: Report[]
  onBack: () => void
  onResolved: () => void
  selectedLocation: string
}

export function ActiveReports({
  reports,
  onBack,
  onResolved,
  selectedLocation,
}: ActiveReportsProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleResolveReport = async (reportId: string) => {
    setLoadingId(reportId)

    const resolvedDate = new Date().toISOString().split("T")[0] // YYYY-MM-DD形式

    const { error } = await supabase
      .from("posts")
      .update({ status: "resolved", resolvedDate })
      .eq("id", reportId)

    setLoadingId(null)

    if (error) {
      alert("案件の解決状態への更新に失敗しました: " + error.message)
      return
    }

    onResolved()
  }

  const filteredReports =
    selectedLocation === "全て" || !selectedLocation
      ? reports
      : reports.filter((report) => {
          const location = selectedLocation?.trim()
          // ここで値を確認するためのログ
          console.log('report.building:', report.building, 'report.place:', report.place, 'selectedLocation:', location)
          return (
            report.building?.trim() === location ||
            report.place?.trim() === location
          )
        })

  // フィルター結果の件数もログ出力
  console.log('selectedLocation:', selectedLocation)
  console.log('filteredReports.length:', filteredReports.length)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-0 h-auto text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          戻る
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">進行中案件</h1>
        <div></div>
      </div>

      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2 text-green-800">
          <Clock className="h-5 w-5" />
          <span className="font-medium">
            現在 {filteredReports.length} 件の案件が進行中です
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm font-medium">{report.date}</span>
                    <div className="flex items-center gap-1 text-red-500">
                      <Heart className="h-4 w-4 fill-current" />
                      <span className="text-sm">{report.likes}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 border-0">
                      <Clock className="h-3 w-3 mr-1" />
                      進行中
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-gray-600">場所</span>
                      <div className="font-medium">
                        {report.building ?? report.place ?? "未指定"}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm text-gray-600">コメント</span>
                      <div className="text-gray-800">{report.comment}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>開始日: {report.date}</span>
                    </div>
                    {report.assignedTo && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>担当者: {report.assignedTo}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleResolveReport(report.id)}
                      disabled={loadingId === report.id}
                    >
                      {loadingId === report.id ? "処理中..." : "解決済みに変更"}
                    </Button>
                  </div>
                </div>

                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center ml-4">
                  <Camera className="h-6 w-6 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            進行中の案件はありません
          </h3>
          <p className="text-gray-600">
            {selectedLocation === "全て" || !selectedLocation
              ? "現在進行中の案件がありません。"
              : `「${selectedLocation || "未指定"}」に進行中の案件がありません。`}
          </p>
        </div>
      )}
    </div>
  )
}
