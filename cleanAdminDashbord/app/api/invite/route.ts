// /app/api/invite/route.ts
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service_roleキー (admin権限)
)

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "メールアドレスが必要です" }, { status: 400 })
    }

    // ① ユーザーを招待
    const { data: inviteData, error: inviteError } =
      await supabase.auth.admin.inviteUserByEmail(email)

    if (inviteError) {
      return NextResponse.json({ error: inviteError.message }, { status: 500 })
    }

    const userId = inviteData?.user?.id
    if (!userId) {
      return NextResponse.json({ error: "ユーザーIDが取得できませんでした" }, { status: 500 })
    }

    // ② users テーブルに admin 権限で登録 or 更新
    const { error: dbError } = await supabase
      .from("users")
      .upsert({ id: userId,  role: "admin" }, { onConflict: "id" })

    if (dbError) {
      return NextResponse.json({ error: "role設定に失敗しました: " + dbError.message }, { status: 500 })
    }

    
    // ③ パスワードリセットリンクを送る（＝パスワード設定リンク）
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/update-password",
    })
    if (resetError) {
      return NextResponse.json({ error: "パスワード設定リンクの送信に失敗しました" }, { status: 500 })
    }

    return NextResponse.json({ message: "管理者として招待し、パスワード設定リンクを送信しました" })
  } catch (err: any) {
    console.error("サーバーエラー:", err)
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 })
  }
}
