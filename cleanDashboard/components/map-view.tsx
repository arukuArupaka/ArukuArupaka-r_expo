import { MapPin } from "lucide-react"
import type { Report } from "@/app/page"

interface MapViewProps {
  reports: Report[]
}

export function MapView({ reports }: MapViewProps) {
  return (
    <div className="h-[600px] bg-gray-100 rounded-lg relative overflow-hidden">
      {/* Map background - using a placeholder pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ccc" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Map pins */}
      <div className="absolute top-20 left-32">
        <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" />
      </div>
      <div className="absolute top-40 right-40">
        <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" />
      </div>
      <div className="absolute bottom-32 left-20">
        <MapPin className="h-8 w-8 text-green-500 drop-shadow-lg" />
      </div>
      <div className="absolute bottom-20 right-32">
        <MapPin className="h-8 w-8 text-green-500 drop-shadow-lg" />
      </div>

      {/* Map legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg p-4 shadow-lg">
        <h3 className="font-semibold mb-2">凡例</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-red-500" />
            <span>未完了</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-green-500" />
            <span>完了</span>
          </div>
        </div>
      </div>

      {/* Map controls */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg p-2 shadow-lg">
        <div className="flex flex-col gap-1">
          <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded text-lg font-bold">+</button>
          <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded text-lg font-bold">-</button>
        </div>
      </div>
    </div>
  )
}
