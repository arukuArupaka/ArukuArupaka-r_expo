"use client"

import { ArrowLeft, User, Mail, Phone, Calendar, MoreHorizontal, UserPlus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState} from "react"
import { supabase} from "@/lib/supabase"

interface UsersManagementProps {
  onBack: () => void
}

type User = {
  id: string
  created_at: string
  name: string | null
  mail: string | null
  role: string | null
}

export function UsersManagement({ onBack }: UsersManagementProps) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] =useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
         console.log("取得データ:", data)
         
      if (error) {
        console.error("ユーザー取得エラー:", error.message)
        alert("ユーザーの取得に失敗しました")
      } else {
        setUsers(data as User[])
      }
      setLoading(false)
    }

    fetchUsers()
  }, [])

  if (loading) {
    return <p className="p-4">ユーザーを読み込み中</p>
  }
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="p-0 h-auto text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5 mr-2" />
          戻る
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">ユーザー管理</h1>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <UserPlus className="h-4 w-4" />
          新規ユーザー追加
        </Button>
      </div>

 <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={`/placeholder-avatar-${user.id}.jpg`} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {user.name?.charAt(0) ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{user.name ?? "名無し"}</h3>
                    <div className="text-sm text-gray-600">{user.mail}</div>
                    <div className="text-sm text-gray-600">役割: {user.role ?? "未設定"}</div>
                    <div className="text-sm text-gray-500">登録日: {new Date(user.created_at).toLocaleDateString()}</div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      プロフィール表示
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="h-4 w-4 mr-2" />
                      メール送信
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
