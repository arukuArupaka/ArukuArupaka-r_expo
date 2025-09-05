"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import {
  ArrowLeft,
  Mail,
  Phone,
  Settings,
  LogOut,
  UserPlus,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface UserProfileProps {
  onBack: () => void
  onLogout: () => void
}

type UserData = {
  name: string | null
  nickname?: string | null
  role: string | null
  mail: string | null
  phone?: string | null
  created_at: string
}

export function UserProfile({ onBack, onLogout }: UserProfileProps) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteLoading, setInviteLoading] = useState(false)
  const [inviteMessage, setInviteMessage] = useState("")
  const [inviteError, setInviteError] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<UserData | null>(null)
  const [updateMessage, setUpdateMessage] = useState("")
  const [updateError, setUpdateError] = useState("")

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError || !user) {
          console.error("認証エラー:", authError?.message)
          setLoading(false)
          return
        }

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single()

        if (error) {
          console.error("ユーザーデータ取得エラー:", error.message)
        } else {
          setUserData(data)
        }
      } catch (err) {
        console.error("予期しないエラー:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [])

  const handleInvite = async () => {
    if (!inviteEmail) {
      setInviteError("メールアドレスを入力してください")
      return
    }

    setInviteLoading(true)
    setInviteMessage("")
    setInviteError("")

    try {
      const response = await fetch("/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: inviteEmail }),
      })

      const data = await response.json()

      if (response.ok) {
        setInviteMessage(data.message)
        setInviteEmail("")
        setTimeout(() => {
          setDialogOpen(false)
          setInviteMessage("")
        }, 2000)
      } else {
        setInviteError(data.error || "招待に失敗しました")
      }
    } catch (err: any) {
      setInviteError("ネットワークエラーが発生しました")
    } finally {
      setInviteLoading(false)
    }
  }

  const handleProfileUpdate = async () => {
    if (!editData) return

    setUpdateMessage("")
    setUpdateError("")

    const { data, error } = await supabase
      .from("users")
      .update({
        name: editData.name,
        nickname: editData.nickname,
        role: editData.role,
        // devise 削除済み
      })
      .eq("id", (await supabase.auth.getUser()).data.user?.id)

    if (error) {
      setUpdateError("更新に失敗しました: " + error.message)
    } else {
      setUserData(editData)
      setIsEditing(false)
      setUpdateMessage("プロフィールを更新しました")
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-4 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">ユーザーデータを読み込み中...</span>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Alert variant="destructive">
          <AlertDescription>
            ユーザーデータの取得に失敗しました。再度ログインしてください。
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 p-0 h-auto text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        戻る
      </Button>

      <Card>
        <CardHeader className="text-center pb-6">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="text-2xl bg-blue-100 text-blue-600">
              {userData.name?.charAt(0) ?? "U"}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{userData.name ?? "名無し"}</CardTitle>
          <p className="text-gray-600">{userData.role ?? "未設定"}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">メールアドレス</p>
                <p className="font-medium">{userData.mail}</p>
              </div>
            </div>

            {userData.phone && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">{userData.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Settings className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">登録日</p>
                <p className="font-medium">
                  {new Date(userData.created_at).toLocaleDateString("ja-JP")}
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">名前</Label>
                  <Input
                    id="name"
                    value={editData?.name ?? ""}
                    onChange={(e) =>
                      setEditData((prev) => prev && { ...prev, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="nickname">ニックネーム</Label>
                  <Input
                    id="nickname"
                    value={editData?.nickname ?? ""}
                    onChange={(e) =>
                      setEditData((prev) => prev && { ...prev, nickname: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="role">役割</Label>
                  <Input
                    id="role"
                    value={editData?.role ?? ""}
                    onChange={(e) =>
                      setEditData((prev) => prev && { ...prev, role: e.target.value })
                    }
                  />
                </div>

                {updateMessage && <Alert><AlertDescription>{updateMessage}</AlertDescription></Alert>}
                {updateError && (
                  <Alert variant="destructive"><AlertDescription>{updateError}</AlertDescription></Alert>
                )}

                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    キャンセル
                  </Button>
                  <Button onClick={handleProfileUpdate}>保存</Button>
                </div>
              </div>
            ) : (
              <Button variant="outline" onClick={() => { setEditData(userData); setIsEditing(true) }}>
                プロフィールを編集
              </Button>
            )}

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
                  <UserPlus className="h-4 w-4" />
                  ユーザーを招待
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>ユーザー招待</DialogTitle>
                  <DialogDescription>
                    新しいユーザーをプロジェクトに招待します。招待メールが送信されます。
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="invite-email">メールアドレス</Label>
                    <Input
                      id="invite-email"
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      placeholder="user@example.com"
                      disabled={inviteLoading}
                    />
                  </div>

                  {inviteMessage && (
                    <Alert>
                      <AlertDescription>{inviteMessage}</AlertDescription>
                    </Alert>
                  )}

                  {inviteError && (
                    <Alert variant="destructive">
                      <AlertDescription>{inviteError}</AlertDescription>
                    </Alert>
                  )}
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={inviteLoading}>
                    キャンセル
                  </Button>
                  <Button onClick={handleInvite} disabled={inviteLoading}>
                    {inviteLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        送信中...
                      </>
                    ) : (
                      "招待メールを送信"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              className="w-full justify-start gap-3 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
              onClick={onLogout}
            >
              <LogOut className="h-4 w-4" />
              ログアウト
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
