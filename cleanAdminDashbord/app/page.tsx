"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { ReportsList } from "@/components/reports-list";
import { ReportDetail } from "@/components/report-detail";
import dynamic from "next/dynamic";
import { UserProfile } from "@/components/user-profile";
import { ResolvedReports } from "@/components/resolved-reports";
import { LoginScreen } from "@/components/login-screen";
import { ActiveReports } from "@/components/active-reports";
import { UnresolvedReports } from "@/components/unresolved-reports";
import { UsersManagement } from "@/components/users-management";
import { supabase } from "@/lib/supabase";

export type Post = {
  id: string;
  created_at: string;
  user_id: string;
  building?: string;
  place?: string;
  longitude?: number;
  latitude?: number;
  comment?: string;
  image_url?: string;
  request?: boolean;
  complete?: boolean;
  good_count: number;
  status?: "new" | "active" | "resolved";
};

export default function AdminDashboard() {
  const [selectedLocation, setSelectedLocation] = useState("全て");
  const [selectedReport, setSelectedReport] = useState<Post | null>(null);
  const [currentView, setCurrentView] = useState<
    | "list"
    | "detail"
    | "map"
    | "user"
    | "resolved"
    | "active"
    | "unresolved"
    | "users"
    | "login"
  >("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);

  // セッション復元 + 変化監視
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        // 既存のユーザーがadminか確認
        const { data: userData } = await supabase
          .from("users")
          .select("role")
          .eq("id", session.user.id)
          .single();
        if (userData?.role === "admin") {
          setIsLoggedIn(true);
          setCurrentView("list");
        }
      }
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setIsLoggedIn(true);
          if (currentView === "login") setCurrentView("list");
        } else {
          setIsLoggedIn(false);
          setCurrentView("login");
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("データ取得エラー:", error.message);
      alert("データの取得に失敗しました");
    } else {
      setPosts(data as Post[]);
    }
    setLoading(false);
  };

  const fetchUserCount = async () => {
    const { count, error } = await supabase
      .from("users")
      .select("id", { count: "exact", head: true });

    if (error) {
      console.error("ユーザー数の取得に失敗しました:", error.message);
    } else if (count !== null) {
      setUserCount(count);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchPosts();
      fetchUserCount();
    }
  }, [isLoggedIn]);

  const locations = [
    "全て",
    "コラーニングハウス",
    "コラーニングハウスII",
    "フォレストハウス",
    "ユニオンカフェテリア",
    "その他",
  ];

  const filteredReports =
    selectedLocation === "全て"
      ? posts
      : selectedLocation === "その他"
      ? posts.filter(
          (report) => report.building && !locations.includes(report.building)
        )
      : posts.filter((report) => report.building?.includes(selectedLocation));

  const resolvedReports = posts.filter(
    (report) => report.status === "resolved"
  );
  const activeReports = posts.filter((report) => report.status === "active");
  const unresolvedReports = posts.filter((report) => report.status === "new");

  const filteredResolvedReports =
    selectedLocation === "全て"
      ? resolvedReports
      : selectedLocation === "その他"
      ? resolvedReports.filter(
          (r) => r.building && !locations.includes(r.building)
        )
      : resolvedReports.filter((r) => r.building?.includes(selectedLocation));

  const filteredActiveReports =
    selectedLocation === "全て"
      ? activeReports
      : selectedLocation === "その他"
      ? activeReports.filter(
          (r) => r.building && !locations.includes(r.building)
        )
      : activeReports.filter((r) => r.building?.includes(selectedLocation));

  const filteredUnresolvedReports =
    selectedLocation === "全て"
      ? unresolvedReports
      : selectedLocation === "その他"
      ? unresolvedReports.filter(
          (r) => r.building && !locations.includes(r.building)
        )
      : unresolvedReports.filter((r) => r.building?.includes(selectedLocation));

  const handleCSVClick = async () => {
    try {
      const res = await fetch("/api/sheets", { method: "POST" });
      if (!res.ok) throw new Error("Failed to create sheet");
      const json = await res.json();
      if (json?.url) {
        window.open(json.url, "_blank");
      } else {
        // Fallback to CSV if URL not available
        window.open("/api/csv", "_blank");
      }
    } catch {
      window.open("/api/csv", "_blank");
    }
  };

  const handleReportClick = (report: Post) => {
    setSelectedReport(report);
    setCurrentView("detail");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedReport(null);
  };

  const handleMapView = () => setCurrentView("map");
  const handleListView = () => setCurrentView("list");
  const handleUserView = () => setCurrentView("user");
  const handleResolvedView = () => setCurrentView("resolved");
  const handleActiveView = () => setCurrentView("active");
  const handleUnresolvedView = () => setCurrentView("unresolved");
  const handleUsersView = () => setCurrentView("users");

  const DynamicMapView = dynamic(
    () => import("@/components/map-view").then((mod) => mod.MapView),
    {
      ssr: false,
    }
  );

  const handleLogin = async (email: string, password: string) => {
    try {
      // 1. Supabase Auth でログイン
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("ログイン失敗：" + error.message);
        return;
      }

      const user = data.user;
      if (!user) {
        alert("ユーザーが見つかりません");
        return;
      }

      // 2. users テーブルで role を取得
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (userError) {
        alert("ユーザー情報の取得に失敗しました: " + userError.message);
        return;
      }

      // 3. role が admin でなければログイン不可
      if (userData?.role !== "admin") {
        alert("管理者ではありません");
        return;
      }

      // 4. ログイン成功
      setIsLoggedIn(true);
      setCurrentView("list");
    } catch (e: any) {
      alert("ログイン中にエラーが発生しました: " + e.message);
    }
  };

  const handleResolveCompleted = async () => {
    await fetchPosts();
    setCurrentView("resolved");
  };

  // 仮の関数
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView("login");
  };

  const handleAssigned = () => {
    alert("担当者割り当て処理");
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (loading) {
    return <p className="p-4">レポートを読み込んでいます...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onUserClick={handleUserView}
        onResolvedClick={handleResolvedView}
        onActiveClick={handleActiveView}
        onUnresolvedClick={handleUnresolvedView}
        onCSVClick={handleCSVClick}
        onUsersClick={handleUsersView}
        onPinsClick={handleListView}
        resolvedCount={resolvedReports.length}
        activeCount={activeReports.length}
        newCount={unresolvedReports.length}
        CSVsheet={posts.length}
        totalPins={posts.length}
        userCount={userCount}
      />
      <div className="flex">
        <Sidebar
          selectedLocation={selectedLocation}
          onLocationChange={setSelectedLocation}
          onMapView={handleMapView}
          onListView={handleListView}
          currentView={currentView as unknown as "list" | "detail" | "map"}
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
          {currentView === "map" && (
            <DynamicMapView reports={filteredReports} />
          )}
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
  );
}
