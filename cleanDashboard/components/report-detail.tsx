"use client"

import { ArrowLeft, Heart, Camera, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Report } from "@/app/page"

interface ReportDetailProps {
  report: Report
  onBack: () => void
}

export function ReportDetail({ report, onBack }: ReportDetailProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-6 p-0 h-auto text-gray-600 hover:text-gray-900">
        <ArrowLeft className="h-5 w-5 mr-2" />
        戻る
      </Button>

      <Card>
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{report.date}</h2>
              <div className="flex items-center gap-1 text-red-500">
                <Heart className="h-5 w-5 fill-current" />
                <span>{report.likes}</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">場所</label>
              <div className="mt-1 text-lg">{report.location}</div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">コメント</label>
              <div className="mt-1 text-lg">{report.comment}</div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600">アカウント</label>
              <div className="mt-1 text-lg">メールアドレス</div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 block mb-3">画像</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Upload className="h-4 w-4" />
                  画像をアップロード
                </Button>
              </div>
            </div>

            <div className="pt-6">
              <Button className="w-full bg-red-500 hover:bg-red-600 text-white">完了にする</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
