// /app/update-password/page.tsx (または /pages/update-password.tsx)
"use client"

import { useEffect, useState } from "react"
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
    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      setMessage("パスワード更新に失敗しました: " + error.message)
    } else {
      setMessage("パスワードが更新されました。ログインしてください。")
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
