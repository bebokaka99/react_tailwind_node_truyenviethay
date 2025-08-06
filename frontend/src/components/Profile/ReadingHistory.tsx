// src/components/profile/ReadingHistory.tsx
import React from 'react';
import { RiPlayLine, RiBookmarkLine } from 'react-icons/ri';

interface ReadingItem {
  truyen_id: string;
  ten_truyen: string;
  anh_bia: string;
  thoi_gian_doc: string;
  tieu_de_chuong: string;
  so_chuong: number;
  tong_so_chuong: number;
  tac_gia: string;
  progress_percent?: number;
}

interface ReadingHistoryProps {
  history: ReadingItem[];
}

export default function ReadingHistory({ history }: ReadingHistoryProps) {
  return (
    <div className="p-6 space-y-4">
      {history.length > 0 ? (
        history.map((item) => (
          <div 
            key={item.truyen_id} 
            className="flex items-center gap-4 p-4 rounded-lg transition-all cursor-pointer group hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="relative flex-shrink-0">
              <img
                src={item.anh_bia}
                alt={item.ten_truyen}
                className="w-14 h-18 object-cover rounded shadow-md group-hover:shadow-lg transition-shadow"
              />
              <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                {item.progress_percent ? Math.round(item.progress_percent) : 0}%
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 transition-colors">
                {item.ten_truyen}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate mb-1">{item.tieu_de_chuong}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">tác giả: {item.tac_gia}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                  <span>Chương {item.so_chuong}/{item.tong_so_chuong}</span>
                  <span>{item.thoi_gian_doc}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress_percent || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1">
                <RiPlayLine />
                Tiếp Tục
              </button>
              <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 transition-colors cursor-pointer">
                <RiBookmarkLine />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Chưa có truyện nào trong lịch sử đọc gần đây.
        </div>
      )}
    </div>
  );
}