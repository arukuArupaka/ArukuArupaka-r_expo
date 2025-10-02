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

  const header = ["案件ID", "時間", "場所", "コメント", "メールアドレス", "生協会員番号", "氏名", "生年月日", "ステータス"]
  const csvLines = [header.join(",")]

  console.log("CSV rows count:", rows.length)

  // user_id -> email 変換: auth.users から service_role でまとめて取得
  const uniqueUserIds = Array.from(new Set(rows.map(r => r.user_id).filter(Boolean)))

  const idToEmail: Record<string, string> = {}
  if (uniqueUserIds.length > 0) {
    // 同時並列取得 (件数が多い場合はレート制限対策で適宜制限)
    const chunks: string[][] = []
    const chunkSize = 50 // レート/パフォーマンスバランス
    for (let i = 0; i < uniqueUserIds.length; i += chunkSize) {
      chunks.push(uniqueUserIds.slice(i, i + chunkSize))
    }
    for (const c of chunks) {
      // chunk 内は Promise.all
      const results = await Promise.all(
        c.map(uid => supabaseAdmin.auth.admin.getUserById(uid).catch(err => ({ data: null, error: err } as any)))
      )
      results.forEach(res => {
        const user = (res as any)?.data?.user
        if (user?.id) {
          idToEmail[user.id] = user.email || ""
        }
      })
    }
  }

  // user_id -> coop_member_number / real_name / birth_date 変換: users テーブルを一括参照
  const idToCoop: Record<string, string> = {}
  const idToName: Record<string, string> = {}
  const idToBirth: Record<string, string> = {}
  if (uniqueUserIds.length > 0) {
    const { data: userRows } = await supabaseAdmin
      .from("users")
      .select("id, coop_member_number, real_name, birth_date")
      .in("id", uniqueUserIds)

    ;(userRows ?? []).forEach((u: any) => {
      if (!u?.id) return
      idToCoop[u.id] = u.coop_member_number ?? ""
      idToName[u.id] = u.real_name ?? ""
      idToBirth[u.id] = u.birth_date ?? ""
    })
  }

  for (const r of rows) {
    const location = r.building ? (r.place ? `${r.building} ${r.place}` : r.building) : (r.place ?? "")
    const email = r.user_id ? (idToEmail[r.user_id] || r.user_id) : ""
    const coop_number = r.user_id ? (idToCoop[r.user_id] || "") : ""
    const real_name = r.user_id ? (idToName[r.user_id] || "") : ""
    const birth_date = r.user_id ? (idToBirth[r.user_id] || "") : ""
    csvLines.push([
      escapeCsv(r.id),
      escapeCsv(r.created_at),
      escapeCsv(location),
      escapeCsv(r.comment ?? ""),
      escapeCsv(email),
      escapeCsv(coop_number),
      escapeCsv(real_name),
      escapeCsv(birth_date),
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


