// src/components/settings/DataManagementSettings.tsx
'use client';

import React, { useState } from 'react';

export default function DataManagementSettings() {
  const [isExporting, setIsExporting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleExportData = async (dataType: string) => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      alert(`Đã xuất dữ liệu ${dataType} thành công!`);
    }, 2000);
  };

  const handleClearData = async (dataType: string) => {
    if (confirm(`Bạn có chắc muốn xóa tất cả ${dataType}? Hành động này không thể hoàn tác.`)) {
      setIsClearing(true);
      setTimeout(() => {
        setIsClearing(false);
        alert(`Đã xóa ${dataType} thành công!`);
      }, 1500);
    }
  };

  const storageData = {
    readingHistory: { size: '2.4 MB', items: 342 },
    favorites: { size: '1.8 MB', items: 23 },
    bookmarks: { size: '0.9 MB', items: 156 },
    comments: { size: '3.2 MB', items: 89 },
    cache: { size: '45.7 MB', items: 1200 }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <i className="ri-database-line text-blue-600"></i>
          Quản Lý Dữ Liệu
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Sao lưu, xuất và quản lý dữ liệu cá nhân của bạn</p>
      </div>

      <div className="p-6 space-y-8">
        {/* Data Export */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <i className="ri-download-line text-green-600"></i>
            Xuất Dữ Liệu
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Xuất tất cả dữ liệu</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tải về tất cả thông tin tài khoản (JSON format)</p>
              </div>
              <button
                onClick={() => handleExportData('tất cả')}
                disabled={isExporting}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors duration-200"
              >
                {isExporting ? (
                  <>
                    <i className="ri-loader-line animate-spin"></i>
                    Đang xuất...
                  </>
                ) : (
                  <>
                    <i className="ri-download-line"></i>
                    Xuất tất cả
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Xuất lịch sử đọc</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Danh sách truyện và chương đã đọc (CSV format)</p>
              </div>
              <button
                onClick={() => handleExportData('lịch sử đọc')}
                className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 font-medium py-2 px-4 border border-green-300 dark:border-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-gray-600 whitespace-nowrap transition-colors duration-200"
              >
                <i className="ri-file-list-line mr-2"></i>
                Xuất CSV
              </button>
            </div>
          </div>
        </div>

        {/* Data Cleanup */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <i className="ri-delete-bin-line text-red-600"></i>
            Dọn Dẹp Dữ Liệu
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg border border-yellow-200 dark:border-yellow-700">
              <div>
                <p className="font-medium text-yellow-900 dark:text-yellow-100">Xóa bộ nhớ cache</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">Giải phóng {storageData.cache.size} dung lượng, có thể làm chậm tải trang</p>
              </div>
              <button
                onClick={() => handleClearData('bộ nhớ cache')}
                disabled={isClearing}
                className="text-yellow-700 hover:text-yellow-900 dark:text-yellow-300 dark:hover:text-yellow-100 font-medium py-2 px-4 border border-yellow-400 dark:border-yellow-600 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800 whitespace-nowrap transition-colors duration-200"
              >
                {isClearing ? 'Đang xóa...' : 'Xóa Cache'}
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-700">
              <div>
                <p className="font-medium text-red-900 dark:text-red-100">Xóa lịch sử đọc</p>
                <p className="text-sm text-red-700 dark:text-red-300">Xóa tất cả {storageData.readingHistory.items} mục lịch sử đọc (không thể hoàn tác)</p>
              </div>
              <button
                onClick={() => handleClearData('lịch sử đọc')}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors duration-200"
              >
                Xóa lịch sử
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}