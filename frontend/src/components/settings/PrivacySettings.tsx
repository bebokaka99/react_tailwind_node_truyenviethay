// src/components/settings/PrivacySettings.tsx
'use client';

import { useState } from 'react';

export default function PrivacySettings() {
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    readingHistory: 'friends',
    achievements: 'public',
    favorites: 'public',
    onlineStatus: true,
    allowMessages: 'friends',
    showEmail: false,
    showLocation: false,
    allowSearch: true,
    dataSharing: false,
    analyticsTracking: true,
    advertisingPersonalization: false
  });

  const handleToggle = (key: string) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const visibilityOptions = [
    { value: 'public', label: 'Công khai', desc: 'Mọi người đều có thể xem' },
    { value: 'friends', label: 'Bạn bè', desc: 'Chỉ những người bạn theo dõi' },
    { value: 'private', label: 'Riêng tư', desc: 'Chỉ mình bạn xem được' }
  ];

  const messageOptions = [
    { value: 'everyone', label: 'Mọi người' },
    { value: 'friends', label: 'Bạn bè' },
    { value: 'none', label: 'Không ai' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <i className="ri-shield-user-line text-blue-600"></i>
          Quyền Riêng Tư & Bảo Mật
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Kiểm soát ai có thể xem thông tin và hoạt động của bạn</p>
      </div>

      <div className="p-6 space-y-8">
        {/* Profile Privacy */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <i className="ri-user-settings-line text-blue-600"></i>
            Hiển Thị Hồ Sơ
          </h4>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Hiển thị hồ sơ</label>
              <div className="space-y-3">
                {visibilityOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="profileVisibility"
                      value={option.value}
                      checked={privacy.profileVisibility === option.value}
                      onChange={(e) => handleSelectChange('profileVisibility', e.target.value)}
                      className="w-4 h-4 text-blue-600 dark:text-blue-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{option.label}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Lịch sử đọc</label>
              <div className="space-y-3">
                {visibilityOptions.map((option) => (
                  <div key={option.value} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="readingHistory"
                      value={option.value}
                      checked={privacy.readingHistory === option.value}
                      onChange={(e) => handleSelectChange('readingHistory', e.target.value)}
                      className="w-4 h-4 text-blue-600 dark:text-blue-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{option.label}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Communication Settings */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <i className="ri-message-line text-green-600"></i>
            Giao Tiếp
          </h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Ai có thể gửi tin nhắn cho bạn?</label>
              <select
                value={privacy.allowMessages}
                onChange={(e) => handleSelectChange('allowMessages', e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {messageOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Hiển thị trạng thái online</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cho phép người khác biết khi bạn đang online</p>
              </div>
              <button
                onClick={() => handleToggle('onlineStatus')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  privacy.onlineStatus ? 'bg-green-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    privacy.onlineStatus ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <i className="ri-information-line text-purple-600"></i>
            Thông Tin Cá Nhân
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Hiển thị email</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cho phép người khác xem địa chỉ email</p>
              </div>
              <button
                onClick={() => handleToggle('showEmail')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  privacy.showEmail ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Hiển thị vị trí</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cho phép người khác xem vị trí của bạn</p>
              </div>
              <button
                onClick={() => handleToggle('showLocation')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  privacy.showLocation ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    privacy.showLocation ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Cho phép tìm kiếm</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Xuất hiện trong kết quả tìm kiếm</p>
              </div>
              <button
                onClick={() => handleToggle('allowSearch')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  privacy.allowSearch ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    privacy.allowSearch ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data & Analytics */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <i className="ri-bar-chart-line text-orange-600"></i>
            Dữ Liệu & Phân Tích
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Chia sẻ dữ liệu</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Chia sẻ dữ liệu ẩn danh để cải thiện dịch vụ</p>
              </div>
              <button
                onClick={() => handleToggle('dataSharing')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  privacy.dataSharing ? 'bg-orange-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    privacy.dataSharing ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Theo dõi phân tích</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Cho phép thu thập dữ liệu sử dụng</p>
              </div>
              <button
                onClick={() => handleToggle('analyticsTracking')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  privacy.analyticsTracking ? 'bg-orange-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    privacy.analyticsTracking ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Cá nhân hóa quảng cáo</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hiển thị quảng cáo phù hợp với sở thích</p>
              </div>
              <button
                onClick={() => handleToggle('advertisingPersonalization')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  privacy.advertisingPersonalization ? 'bg-orange-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    privacy.advertisingPersonalization ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
            <i className="ri-shield-check-line text-red-600"></i>
            Hành Động Tài Khoản
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-700">
              <div>
                <p className="font-medium text-red-900 dark:text-red-100">Tạm khóa tài khoản</p>
                <p className="text-sm text-red-700 dark:text-red-300">Tạm thời ẩn tài khoản khỏi người dùng khác</p>
              </div>
              <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 font-medium px-4 py-2 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-800 whitespace-nowrap cursor-pointer transition-colors duration-200">
                Tạm khóa
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900 rounded-lg border border-red-200 dark:border-red-700">
              <div>
                <p className="font-medium text-red-900 dark:text-red-100">Xóa tài khoản</p>
                <p className="text-sm text-red-700 dark:text-red-300">Xóa vĩnh viễn tài khoản và tất cả dữ liệu</p>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-lg whitespace-nowrap cursor-pointer transition-colors duration-200">
                Xóa tài khoản
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors duration-200">
            <i className="ri-save-line"></i>
            Lưu Cài Đặt Riêng Tư
          </button>
        </div>
      </div>
    </div>
  );
}