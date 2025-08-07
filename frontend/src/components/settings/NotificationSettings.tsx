// src/components/settings/NotificationSettings.tsx
'use client';

import { useState } from 'react';

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: {
      newChapter: true,
      favoriteUpdate: true,
      systemNews: false,
      marketing: false,
      weeklyDigest: true
    },
    push: {
      newChapter: true,
      favoriteUpdate: true,
      systemAlert: true,
      achievement: true,
      reminder: false
    },
    inApp: {
      comments: true,
      likes: true,
      follows: true,
      mentions: true,
      systemNotify: true
    }
  });

  const handleToggle = (category: string, key: string) => {
    setNotifications(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: !prev[category as keyof typeof prev][key as keyof any]
      }
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <i className="ri-notification-line text-blue-600"></i>
          Cài Đặt Thông Báo
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Quản lý các loại thông báo bạn muốn nhận</p>
      </div>

      <div className="p-6 space-y-8">
        {/* Email Notifications */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <i className="ri-mail-line text-blue-600"></i>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Thông Báo Email</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Nhận thông báo qua email của bạn</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* New Chapter */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Chương mới</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Truyện bạn theo dõi có chương mới</p>
              </div>
              <button
                onClick={() => handleToggle('email', 'newChapter')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  notifications.email.newChapter ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    notifications.email.newChapter ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Favorite Update */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Cập nhật yêu thích</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Truyện yêu thích có cập nhật mới</p>
              </div>
              <button
                onClick={() => handleToggle('email', 'favoriteUpdate')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  notifications.email.favoriteUpdate ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    notifications.email.favoriteUpdate ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* System News */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Tin tức hệ thống</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cập nhật và thông báo từ website</p>
              </div>
              <button
                onClick={() => handleToggle('email', 'systemNews')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  notifications.email.systemNews ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    notifications.email.systemNews ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Weekly Digest */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Tóm tắt hàng tuần</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Báo cáo hoạt động đọc hàng tuần</p>
              </div>
              <button
                onClick={() => handleToggle('email', 'weeklyDigest')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  notifications.email.weeklyDigest ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    notifications.email.weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <i className="ri-smartphone-line text-green-600"></i>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Thông Báo Đẩy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Nhận thông báo trên thiết bị của bạn</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* New Chapter */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Chương mới</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Thông báo ngay khi có chương mới</p>
              </div>
              <button
                onClick={() => handleToggle('push', 'newChapter')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  notifications.push.newChapter ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    notifications.push.newChapter ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* New Achievement */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Thành tích mới</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Khi bạn đạt được thành tích mới</p>
              </div>
              <button
                onClick={() => handleToggle('push', 'achievement')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  notifications.push.achievement ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    notifications.push.achievement ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Reading Reminder */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Nhắc nhở đọc</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Nhắc nhở đọc truyện hàng ngày</p>
              </div>
              <button
                onClick={() => handleToggle('push', 'reminder')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  notifications.push.reminder ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    notifications.push.reminder ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* In-App Notifications */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <i className="ri-notification-badge-line text-purple-600"></i>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Thông Báo Trong App</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Thông báo hiển thị trong ứng dụng</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* New Comments */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Bình luận mới</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Khi có người bình luận về truyện</p>
              </div>
              <button
                onClick={() => handleToggle('inApp', 'comments')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  notifications.inApp.comments ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    notifications.inApp.comments ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Likes */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Lượt thích</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Khi có người thích bình luận của bạn</p>
              </div>
              <button
                onClick={() => handleToggle('inApp', 'likes')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  notifications.inApp.likes ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    notifications.inApp.likes ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* New Follows */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Người theo dõi mới</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Khi có người theo dõi bạn</p>
              </div>
              <button
                onClick={() => handleToggle('inApp', 'follows')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  notifications.inApp.follows ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    notifications.inApp.follows ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors duration-200">
            <i className="ri-save-line"></i>
            Lưu Cài Đặt Thông Báo
          </button>
        </div>
      </div>
    </div>
  );
}