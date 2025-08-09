"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onUserClick: () => void
  onResolvedClick: () => void
  onActiveClick: () => void
  onUnresolvedClick: () => void
  onUsersClick: () => void
  onPinsClick: () => void
  resolvedCount: number
  activeCount: number
  newCount: number
  totalPins: number
  userCount: number
}

export function Header({
  onUserClick,
  onResolvedClick,
  onActiveClick,
  onUnresolvedClick,
  onUsersClick,
  onPinsClick,
  resolvedCount,
  activeCount,
  newCount,
  totalPins,
  userCount,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">ADMIN DASHBOARD</h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-blue-500 text-white hover:bg-blue-600"
          onClick={onUserClick}
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
        <div className="flex gap-4 mt-4">
        <StatCard
          number={userCount.toString()}  // ここを固定の"11111"から動的に
          label="users"
          subtitle="登録ユーザー数"
          onClick={onUsersClick}
          clickable
        />
     <StatCard
  number={totalPins.toString()}
  label="pins"
  subtitle="現在の案件数"
  onClick={onPinsClick}
  clickable
/>
        <StatCard
          number={resolvedCount.toString()}
          label="Resolved"
          color="text-blue-500"
          subtitle="解決済み案件"
          onClick={onResolvedClick}
          clickable
        />
        <StatCard
          number={activeCount.toString()}
          label="Active"
          color="text-green-500"
          subtitle="進行中案件"
          onClick={onActiveClick}
          clickable
        />
        <StatCard
          number={newCount.toString()}
          label="New"
          color="text-orange-500"
          subtitle="未解決案件"
          onClick={onUnresolvedClick}
          clickable
        />
      </div>
    </header>
  )
}

function StatCard({
  number,
  label,
  color = "text-gray-600",
  subtitle,
  onClick,
  clickable = false,
}: {
  number: string
  label: string
  color?: string
  subtitle?: string
  onClick?: () => void
  clickable?: boolean
}) {
  const cardClass = `bg-white rounded-lg border border-gray-200 px-6 py-4 shadow-sm ${
    clickable ? "cursor-pointer hover:shadow-md transition-shadow" : ""
  }`

  return (
    <div className={cardClass} onClick={onClick}>
      <div className="text-2xl font-bold text-gray-900">{number}</div>
      <div className={`text-sm ${color}`}>{label}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  )
}
