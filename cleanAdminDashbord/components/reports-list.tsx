"use client"

import { Heart, Camera } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Report } from "@/app/page"

interface ReportsListProps {
  reports: Report[]
  onReportClick: (report: Report) => void,
  building?: string
}

export function ReportsList({ reports, onReportClick,building }: ReportsListProps) {
  return (
    <div className="space-y-4">

     {reports.map((report) => (

        <div
          key={report.id}
          className="bg-white rounded-lg border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onReportClick(report)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm font-medium">{report.date}</span>
                <div className="flex items-center gap-1 text-red-500">
                  <Heart className="h-4 w-4 fill-current" />
                  <span className="text-sm">{report.likes}</span>
                </div>
              </div>
            <div>
  <span className="text-sm text-gray-600">場所</span>
  <div className="font-medium">{report.building ?? report.place ?? "未指定"}</div>
</div>

              <div className="mb-3">
                <span className="text-sm text-gray-600">コメント</span>
                <div className="text-gray-800">{report.comment}</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-400" />
              </div>
              <StatusBadge status={report.status} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: Report["status"] }) {
  const statusMap: Record<string, { label: string; className: string }> = {
    resolved: {
      label: "解決済み",
      className: "bg-blue-100 text-blue-800",
    },
    active: {
      label: "進行中",
      className: "bg-green-100 text-green-800",
    },
    new: {
      label: "未解決",
      className: "bg-orange-100 text-orange-800",
    },
  }

  if (!status || !statusMap[status]) return null

  return (
    <Badge className={`${statusMap[status].className} border-0`}>
      {statusMap[status].label}
    </Badge>
  )
}

