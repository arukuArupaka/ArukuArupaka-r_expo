"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin } from "lucide-react";
import type { Report } from "@/app/page";


interface MapViewProps {
  reports: Report[];
}

// types.ts に共通型
export type Report = {
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
}

export function MapView({ reports }: MapViewProps) {
  // 初期中心座標（例: 京都駅周辺）
  const center: [number, number] = [34.9813369,135.96298]

  // カスタムアイコン（LucideのMapPinはSVGなので、LeafletのDivIconで代用）
  function getPinIcon(color: string) {
    return L.divIcon({
      className: "custom-pin-icon",
      html: `<svg width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 21c-4.8-4.8-7.2-7.2-7.2-10.2A7.2 7.2 0 0 1 12 3a7.2 7.2 0 0 1 7.2 7.8c0 3-2.4 5.4-7.2 10.2z'/><circle cx='12' cy='10' r='2'/></svg>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }

  return (
    <div className="flex h-[600px] bg-gray-100 rounded-lg overflow-hidden">
      {/* 左カラム: コントロールや凡例 */}
      <div className="w-64 bg-white border-r p-4 flex flex-col gap-4 z-10">
        <h3 className="font-semibold mb-2">マップコントロール</h3>
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
        {/* ズームコントロールはLeaflet標準UIを利用 */}
      </div>

      {/* 右カラム: 地図本体 */}
      <div className="flex-1 relative">
        <MapContainer
          center={center}
          zoom={17}
          style={{ width: "100%", height: "600px", zIndex: 1 }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {reports.map((report) => {
            if (report.latitude === undefined || report.longitude === undefined) return null;
            const pinColor = report.status === "resolved" ? "green" : "red";
            return (
              <Marker
                key={report.id}
                position={[report.latitude, report.longitude]}
                icon={getPinIcon(pinColor)}
              >
                <Popup>
                  <div>
                    <div className="font-bold mb-1">{report.comment || "詳細なし"}</div>
                    <div>緯度: {report.latitude}, 経度: {report.longitude}</div>
                    <div>状態: {report.status === "resolved" ? "完了" : "未完了"}</div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
