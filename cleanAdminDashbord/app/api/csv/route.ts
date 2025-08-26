import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

type Post = {
  id: string
  created_at: string
  user_id: string
  building?: string
  place?: string
  comment?: string
  status?: "new" | "active" | "resolved"
}

function escapeCsv(value: string | number | null | undefined): string {
  const s = value === undefined || value === null ? "" : String(value)
  if (s.includes("\"") || s.includes(",") || s.includes("\n") || s.includes("\r")) {
    return '"' + s.replace(/\"/g, '""') + '"'
  }
  return s
}

export async function GET() {
  const { data, error } = await supabase
    .from("posts")
    .select("id, created_at, user_id, building, place, comment, status")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const rows = (data as Post[] | null) ?? []

  const header = ["案件ID", "時間", "場所", "コメント", "アカウント情報", "ステータス"]
  const csvLines = [header.join(",")]

  for (const r of rows) {
    const location = r.building ? (r.place ? `${r.building} ${r.place}` : r.building) : (r.place ?? "")
    csvLines.push([
      escapeCsv(r.id),
      escapeCsv(r.created_at),
      escapeCsv(location),
      escapeCsv(r.comment ?? ""),
      escapeCsv(r.user_id),
      escapeCsv(r.status ?? ""),
    ].join(","))
  }

  const csv = csvLines.join("\n")

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=reports.csv`,
      "Cache-Control": "no-store",
    },
  })
}


