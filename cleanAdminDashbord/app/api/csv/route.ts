import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// サーバー側は service_role で実行して RLS を回避（管理者のCSVエクスポート想定）
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

export async function GET(request: Request) {
  const url = new URL(request.url)
  const start = url.searchParams.get("start") // YYYY-MM-DD
  const end = url.searchParams.get("end") // YYYY-MM-DD

  // start/end をUTC境界に変換（含む範囲）
  const startIso = start ? new Date(start + "T00:00:00.000Z").toISOString() : undefined
  const endIso = end ? new Date(end + "T23:59:59.999Z").toISOString() : undefined

  let query = supabaseAdmin
    .from("posts")
    .select("id, created_at, user_id, building, place, comment, status")
    .order("created_at", { ascending: false })

  if (startIso) query = query.gte("created_at", startIso)
  if (endIso) query = query.lte("created_at", endIso)

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const rows = (data as Post[] | null) ?? []

  const header = ["案件ID", "時間", "場所", "コメント", "アカウント情報", "ステータス"]
  const csvLines = [header.join(",")]

  console.log("CSV rows count:", rows.length)

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

  const csv = csvLines.join("\r\n")

  // Excel向けにUTF-8のBOMを先頭に付与して文字化けを防止
  const bom = "\uFEFF"

  return new NextResponse(bom + csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=reports.csv`,
      "Cache-Control": "no-store",
    },
  })
}


