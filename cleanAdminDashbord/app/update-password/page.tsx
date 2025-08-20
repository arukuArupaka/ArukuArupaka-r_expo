"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function UpdatePasswordPage() {
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    setMessage("")

    // 1. Supabase Auth のパスワード更新
    const { data, error: authError } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (authError) {
      setMessage("パスワード更新に失敗しました: " + authError.message)
      setLoading(false)
      return
    }

    // 2. users テーブルの role を admin に更新
    const userId = data?.user?.id
    if (!userId) {
      setMessage("ユーザー情報が取得できませんでした。")
      setLoading(false)
      return
    }

    const { error: dbError } = await supabase
      .from("users")
      .update({ role: "admin" })
      .eq("id", userId)

    if (dbError) {
      setMessage("ユーザー情報の更新に失敗しました: " + dbError.message)
    } else {
      setMessage("パスワードと権限が更新されました。ログインしてください。")
      setTimeout(() => router.push("/login"), 2000)
    }

    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-semibold mb-4">パスワードを設定</h1>
      <Input
        type="password"
        placeholder="新しいパスワード"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={loading || !newPassword} className="mt-4">
        {loading ? "更新中..." : "パスワードを設定"}
      </Button>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  )
}
