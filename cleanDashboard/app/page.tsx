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
import { supabase } from '@/lib/supabase'

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

  useEffect(() => {
  const fetchPosts = async () => {
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

  fetchPosts()
}, [])

  const filteredReports =
  selectedLocation === "全て"
    ? posts
    : posts.filter((report) => report.building?.includes(selectedLocation))

const resolvedReports = posts.filter((report) => report.complete === true)
const newReports = posts.filter((report) => report.complete === false)
const activeReports = posts.filter((report) => report.complete === null)
const unresolvedReports = posts.filter((report) => report.complete === false)


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
        resolvedCount={resolvedReports.length}
        activeCount={activeReports.length}
        newCount={unresolvedReports.length}
        totalPins={posts.length}
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
            <ReportsList reports={filteredReports} building={selectedLocation} onReportClick={handleReportClick} />
          )}
          {currentView === "detail" && selectedReport && (
            <ReportDetail report={selectedReport} onBack={handleBackToList} />
          )}
          {currentView === "map" && <MapView reports={filteredReports} />}
          {currentView === "user" && <UserProfile onBack={handleListView} onLogout={handleLogout} />}
          {currentView === "resolved" && (
            <ResolvedReports reports={resolvedReports} onBack={handleListView} />
          )}
          {currentView === "active" && (
            <ActiveReports reports={activeReports} onBack={handleListView} />
          )}
          {currentView === "unresolved" && (
            <UnresolvedReports reports={unresolvedReports} onBack={handleListView} />
          )}
          {currentView === "users" && <UsersManagement onBack={handleListView} />}
        </main>
      </div>
    </div>
  )
}
