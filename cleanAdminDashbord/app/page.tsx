"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { ReportsList } from "@/components/reports-list"
import { ReportDetail } from "@/components/report-detail"
import { MapView } from "@/components/map-view"
import { UserProfile } from "@/components/user-profile"
import { ResolvedReports } from "@/components/resolved-reports"
import { LoginScreen } from "@/components/login-screen"
import { ActiveReports } from "@/components/active-reports"
import { UnresolvedReports } from "@/components/unresolved-reports"
import { UsersManagement } from "@/components/users-management"
import { supabase } from "@/lib/supabase"
import dynamic from "next/dynamic"


export type Post = {
  id: string
  created_at: string
  user_id: string
  building?: string
  place?: string
  longitude?: number
  latitude?: number
  comment?: string
  image_url?: string
  request?: boolean
  complete?: boolean
  good_count: number
  status?: "new" | "active" | "resolved"
}

export default function AdminDashboard() {
  const [selectedLocation, setSelectedLocation] = useState("全て")
  const [selectedReport, setSelectedReport] = useState<Post | null>(null)
  const [currentView, setCurrentView] = useState<
    "list" | "detail" | "map" | "user" | "resolved" | "active" | "unresolved" | "users" | "login"
  >("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [userCount, setUserCount] = useState(0)

  
// postsだけ取得する関数
const fetchPosts = async () => {
  setLoading(true)
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("データ取得エラー:", error.message)
    alert("データの取得に失敗しました")
  } else {
    setPosts(data as Post[])
  }
  setLoading(false)
}

// ユーザー数だけ取得する関数
const fetchUserCount = async () => {
  const { count, error } = await supabase
    .from("users") // 自分のユーザーテーブル名に合わせてください
    .select("id", { count: "exact", head: true })

  if (error) {
    console.error("ユーザー数の取得に失敗しました:", error.message)
  } else if (count !== null) {
    setUserCount(count)
  }
}

  
  useEffect(() => {
  if (isLoggedIn) {
    fetchPosts()
    fetchUserCount()
  }
}, [isLoggedIn])


  // 全体のフィルター処理
  const filteredReports =
    selectedLocation === "全て"
      ? posts
      : posts.filter((report) => report.building?.includes(selectedLocation))

  const resolvedReports = posts.filter((report) => report.status === "resolved")
  const activeReports = posts.filter((report) => report.status === "active")
  const unresolvedReports = posts.filter((report) => report.status === "new")

  // フィルター適用済みバージョン
  const filteredResolvedReports =
    selectedLocation === "全て"
      ? resolvedReports
      : resolvedReports.filter((r) => r.building?.includes(selectedLocation))

  const filteredActiveReports =
    selectedLocation === "全て"
      ? activeReports
      : activeReports.filter((r) => r.building?.includes(selectedLocation))

  const filteredUnresolvedReports =
    selectedLocation === "全て"
      ? unresolvedReports
      : unresolvedReports.filter((r) => r.building?.includes(selectedLocation))

  const handleReportClick = (report: Post) => {
    setSelectedReport(report)
    setCurrentView("detail")
  }

  const handleBackToList = () => {
    setCurrentView("list")
    setSelectedReport(null)
  }

  const handleMapView = () => setCurrentView("map")
  const handleListView = () => setCurrentView("list")
  const handleUserView = () => setCurrentView("user")
  const handleResolvedView = () => setCurrentView("resolved")
  const handleActiveView = () => setCurrentView("active")
  const handleUnresolvedView = () => setCurrentView("unresolved")
  const handleUsersView = () => setCurrentView("users")

const MapView = dynamic(() => import("@/components/map-view").then(mod => mod.MapView), {
  ssr: false,
})

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        alert("ログイン失敗：" + error.message)
        return
      }
      if (data.user) {
        setIsLoggedIn(true)
        setCurrentView("list")
      }
    } catch (e) {
      alert("ログイン中にエラーが発生しました")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentView("login")
  }

  const handleAssigned = () => {
    setCurrentView("list")
    fetchPosts()
  }

  const handleResolveCompleted = async () => {
    await fetchPosts()
    setCurrentView("resolved")
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  if (loading) {
    return <p className="p-4">レポートを読み込んでいます...</p>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onUserClick={handleUserView}
        onResolvedClick={handleResolvedView}
        onActiveClick={handleActiveView}
        onUnresolvedClick={handleUnresolvedView}
        onUsersClick={handleUsersView}
        onPinsClick={handleListView}
        resolvedCount={resolvedReports.length}
        activeCount={activeReports.length}
        newCount={unresolvedReports.length}
        totalPins={posts.length}
        userCount={userCount}
      />
      <div className="flex">
        <Sidebar
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          onMapView={handleMapView}
          onListView={handleListView}
          currentView={currentView}
        />
        <main className="flex-1 p-6">
          {currentView === "list" && (
            <ReportsList
              reports={filteredReports}
              building={selectedLocation}
              onReportClick={handleReportClick}
            />
          )}
          {currentView === "detail" && selectedReport && (
            <ReportDetail report={selectedReport} onBack={handleBackToList} />
          )}
          {currentView === "map" && <MapView reports={filteredReports} />}
          {currentView === "user" && (
            <UserProfile onBack={handleListView} onLogout={handleLogout} />
          )}
          {currentView === "resolved" && (
            <ResolvedReports
              reports={filteredResolvedReports}
              onBack={handleListView}
            />
          )}
          {currentView === "active" && (
            <ActiveReports
              reports={filteredActiveReports}
              onBack={handleListView}
              onResolved={handleResolveCompleted}
              selectedLocation={selectedLocation}
            />
          )}
          {currentView === "unresolved" && (
            <UnresolvedReports
              reports={filteredUnresolvedReports}
              onBack={handleListView}
              onAssigned={handleAssigned}
            />
          )}
          {currentView === "users" && (
            <UsersManagement onBack={handleListView} />
          )}
        </main>
      </div>
    </div>
  )
}
