"use client";

import { User, Calendar as CalendarIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";

interface HeaderProps {
  onUserClick: () => void;
  onResolvedClick: () => void;
  onActiveClick: () => void;
  onUnresolvedClick: () => void;
  onCSVClick: () => void;
  onUsersClick: () => void;
  onPinsClick: () => void;
  resolvedCount: number;
  activeCount: number;
  newCount: number;
  CSVsheet: number;
  totalPins: number;
  userCount: number;
  currentUserEmail?: string;
}

export function Header({
  onUserClick,
  onResolvedClick,
  onActiveClick,
  onUnresolvedClick,
  onCSVClick,
  onUsersClick,
  onPinsClick,
  resolvedCount,
  activeCount,
  newCount,
  CSVsheet,
  totalPins,
  userCount,
  currentUserEmail,
}: HeaderProps) {
  const [csvDialogOpen, setCsvDialogOpen] = useState(false);
  const [range, setRange] = useState<{ from: Date | undefined; to: Date | undefined }>({ from: undefined, to: undefined });

  const downloadCsv = () => {
    const params = new URLSearchParams();
    if (range.from) params.set("start", format(range.from, "yyyy-MM-dd"));
    if (range.to) params.set("end", format(range.to, "yyyy-MM-dd"));
    const url = `/api/csv${params.toString() ? `?${params.toString()}` : ""}`;
    // そのままナビゲーションでダウンロード
    window.location.href = url;
    setCsvDialogOpen(false);
    // 既存のカウンタクリック動作も必要なら呼ぶ
    onCSVClick?.();
  };
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">ADMIN DASHBOARD</h1>
        <div className="flex items-center gap-3">
          {currentUserEmail && (
            <span className="text-sm text-gray-700 max-w-[180px] truncate" title={currentUserEmail}>
              {currentUserEmail}
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-blue-500 text-white hover:bg-blue-600"
            onClick={onUserClick}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <StatCard
          number={userCount.toString()} // ここを固定の"11111"から動的に
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
        <div>
          <div className="bg-white rounded-lg border border-gray-200 px-6 py-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow" onClick={() => setCsvDialogOpen(true)}>
            <div className="text-2xl font-bold text-gray-900">{CSVsheet.toString()}</div>
            <div className={`text-sm text-lime-500`}>CSV</div>
            <div className="text-xs text-gray-500 mt-1">期間を選んでダウンロード</div>
          </div>
          <Dialog open={csvDialogOpen} onOpenChange={setCsvDialogOpen}>
            <DialogContent className="sm:max-w-3xl w-[calc(100vw-2rem)] p-0 overflow-hidden">
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle>CSV出力の期間選択</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="max-h-[70vh] overflow-auto pr-1">
                    <Calendar
                      mode="range"
                      numberOfMonths={2}
                      selected={range as any}
                      onSelect={(r: any) => setRange(r ?? { from: undefined, to: undefined })}
                      locale={ja}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-700">
                    <div>
                      {range.from ? format(range.from, "yyyy-MM-dd") : "開始日未選択"} ～ {range.to ? format(range.to, "yyyy-MM-dd") : "終了日未選択"}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setRange({ from: undefined, to: undefined })}>クリア</Button>
                      <Button onClick={downloadCsv} disabled={!range.from && !range.to}>
                        <Download className="h-4 w-4 mr-1" /> ダウンロード
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}

function StatCard({
  number,
  label,
  color = "text-gray-600",
  subtitle,
  onClick,
  clickable = false,
}: {
  number: string;
  label: string;
  color?: string;
  subtitle?: string;
  onClick?: () => void;
  clickable?: boolean;
}) {
  const cardClass = `bg-white rounded-lg border border-gray-200 px-6 py-4 shadow-sm ${
    clickable ? "cursor-pointer hover:shadow-md transition-shadow" : ""
  }`;

  return (
    <div className={cardClass} onClick={onClick}>
      <div className="text-2xl font-bold text-gray-900">{number}</div>
      <div className={`text-sm ${color}`}>{label}</div>
      {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
    </div>
  );
}
