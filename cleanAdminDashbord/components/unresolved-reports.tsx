"use client"

import { useState } from "react"
import { ArrowLeft, Heart, Camera, AlertCircle, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Report } from "@/app/page"
import { supabase } from "@/lib/supabase"

interface UnresolvedReportsProps {
  reports: Report[]
  onBack: () => void
  onAssigned: () => void // ← 新たに追加
}

export function UnresolvedReports({ reports, onBack, onAssigned }: UnresolvedReportsProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleAssignReport = async (reportId: string) => {
    setLoadingId(reportId)

    const { error } = await supabase
      .from("posts")
      .update({ status: "active" })
      .eq("id", reportId)

    setLoadingId(null)

    if (error) {
      alert("案件を担当に変更できませんでした: " + error.message)
      return
    }

    onAssigned() // 状態を親に通知して遷移させる
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="p-0 h-auto text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-2" />
          戻る
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">未解決案件</h1>
        <div></div>
      </div>

      <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <div className="flex items-center gap-2 text-orange-800">
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">{reports.length} 件の案件が未解決です</span>
        </div>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow border-l-4 border-l-orange-400">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm font-medium">{report.date}</span>
                    <div className="flex items-center gap-1 text-red-500">
                      <Heart className="h-4 w-4 fill-current" />
                      <span className="text-sm">{report.likes}</span>
                    </div>
                    <Badge className="bg-orange-100 text-orange-800 border-0">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      未解決
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

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>報告日: {report.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-orange-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>対応が必要です</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleAssignReport(report.id)}
                      disabled={loadingId === report.id}
                    >
                      {loadingId === report.id ? "担当中..." : "案件を担当する"}
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

      {reports.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">未解決案件はありません</h3>
          <p className="text-gray-600">すべての案件が解決されています。</p>
        </div>
      )}
    </div>
  )
}
