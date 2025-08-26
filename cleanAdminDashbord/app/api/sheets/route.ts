import { NextResponse } from "next/server"
import { google } from "googleapis"
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

function getServiceAccountJwt() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n")
  if (!clientEmail || !privateKey) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY")
  }
  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  })
}

export async function POST() {
  try {
    const auth = getServiceAccountJwt()
    const drive = google.drive({ version: "v3", auth })
    const sheets = google.sheets({ version: "v4", auth })

    const { data: posts, error } = await supabase
      .from("posts")
      .select("id, created_at, user_id, building, place, comment, status")
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const title = `Arupaka Reports ${new Date().toISOString().slice(0, 19).replace("T", " ")}`

    const file = await drive.files.create({
      requestBody: {
        name: title,
        mimeType: "application/vnd.google-apps.spreadsheet",
      },
      fields: "id, webViewLink",
    })

    const spreadsheetId = file.data.id as string

    const header = ["案件ID", "時間", "場所", "コメント", "アカウント情報", "ステータス"]
    const values: (string | null)[][] = [header]

    for (const r of (posts as Post[]) || []) {
      const location = r.building ? (r.place ? `${r.building} ${r.place}` : r.building) : (r.place ?? "")
      values.push([
        r.id,
        r.created_at,
        location,
        r.comment ?? "",
        r.user_id,
        r.status ?? "",
      ])
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    })

    // Anyone with the link can view (optional)
    const anyoneCanView = process.env.GOOGLE_SHEETS_LINK_SHARE === "true"
    if (anyoneCanView) {
      await drive.permissions.create({
        fileId: spreadsheetId,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      })
    }

    // Fetch webViewLink
    const { data: meta } = await drive.files.get({
      fileId: spreadsheetId,
      fields: "id, webViewLink",
    })

    return NextResponse.json({
      spreadsheetId,
      url: meta.webViewLink,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}


