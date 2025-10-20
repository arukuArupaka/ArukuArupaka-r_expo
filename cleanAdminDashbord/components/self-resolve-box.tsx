"use client";

import React from 'react';
import { Post } from '@/app/page';
import { Card, CardContent } from "@/components/ui/card";
import { Building, MapPin, Calendar, MessageSquare, Camera, CheckCircle } from "lucide-react";

type SelfResolveBoxProps = {
  reports: Post[];
};

export const SelfResolveBox = ({ reports }: SelfResolveBoxProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Self Resolved Reports</h1>
      </div>

      <div className="mb-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <div className="flex items-center gap-2 text-purple-800">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">
            現在 {reports.length} 件の案件が自己解決済みです
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start justify-between">
                {/* 情報エリア */}
                <div className="flex-1 mb-4 md:mb-0 md:mr-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(report.created_at).toLocaleString()}</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 font-medium text-gray-800">
                      <Building className="h-5 w-5 text-gray-500" />
                      <span>{report.building || '建物未指定'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mt-1 pl-7">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span>{report.place || '場所未指定'}</span>
                    </div>
                  </div>

                  {report.comment && (
                    <div className="flex items-start gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                      <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p>{report.comment}</p>
                    </div>
                  )}
                </div>

                {/* 画像エリア */}
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="text-xs text-gray-500 mb-1 block">Before</span>
                    {report.image_url ? (
                      <a href={report.image_url} target="_blank" rel="noopener noreferrer">
                        <img src={report.image_url} alt="Before" className="h-24 w-24 object-cover rounded-lg border" />
                      </a>
                    ) : (
                      <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Camera className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <span className="text-xs text-gray-500 mb-1 block">After</span>
                    {report.image_url_after ? (
                      <a href={report.image_url_after} target="_blank" rel="noopener noreferrer">
                        <img src={report.image_url_after} alt="After" className="h-24 w-24 object-cover rounded-lg border" />
                      </a>
                    ) : (
                      <div className="h-24 w-24 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Camera className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reports.length === 0 && (
        <div className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            自己解決済みの案件はありません
          </h3>
          <p className="text-gray-600">
            ステータスが 'self' の案件が見つかりませんでした。
          </p>
        </div>
      )}
    </div>
  );
};