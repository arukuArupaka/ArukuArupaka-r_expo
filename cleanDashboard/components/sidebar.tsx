"use client"

import { ChevronRight, Map } from "lucide-react"
import { Button } from "@/components/ui/button"

const locations = ["全て", "コラーニングハウス", "コラーニングハウスII", "フォレストハウス", "ユニオンカフェテリア", "その他"]

interface SidebarProps {
  selectedLocation: string
  onLocationChange: (location: string) => void
  onMapView: () => void
  onListView: () => void
  currentView: "list" | "detail" | "map"
}

export function Sidebar({ selectedLocation, onLocationChange, onMapView, onListView, currentView }: SidebarProps) {
  return (
    <aside className="w-80 bg-white border-r border-gray-200 p-6">
      <div className="space-y-2">
        <Button
          variant="ghost"
          className={`w-full justify-between text-left h-12 ${currentView === "map" ? "bg-gray-100" : ""}`}
          onClick={currentView === "map" ? onListView : onMapView}
        >
          <span className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            {currentView === "map" ? "リストを表示" : "マップを表示"}
          </span>
          <ChevronRight className="h-4 w-4" />
        </Button>

        {currentView !== "map" &&
          locations.map((location) => (
            <Button
              key={location}
              variant="ghost"
              className={`w-full justify-between text-left h-12 ${selectedLocation === location ? "bg-gray-100" : ""}`}
              onClick={() => onLocationChange(location)}
            >
              <span>{location}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          ))}
      </div>
    </aside>
  )
}
