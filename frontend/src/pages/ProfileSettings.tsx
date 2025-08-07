// src/page/ProfileSettings.tsx
'use client';

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AccountSettings from '../components/settings/AccountSettings';
import ReadingPreferences from '../components/settings/ReadingPreferences';
import NotificationSettings from '../components/settings/NotificationSettings';
import PrivacySettings from '../components/settings/PrivacySettings';
import DataManagement from '../components/settings/DataManagement';

export default function SettingsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <i className="ri-settings-line text-blue-600"></i>
                      Danh Mục Cài Đặt
                    </h2>
                  </div>
                  <nav className="p-4">
                    <div className="space-y-2">
                      <a href="#account" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        <i className="ri-user-line w-5 h-5 flex items-center justify-center text-blue-600"></i>
                        <span className="font-medium text-blue-600 dark:text-blue-400">Tài Khoản</span>
                      </a>
                      <a href="#reading" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        <i className="ri-book-line w-5 h-5 flex items-center justify-center"></i>
                        <span>Đọc Truyện</span>
                      </a>
                      <a href="#notifications" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        <i className="ri-notification-line w-5 h-5 flex items-center justify-center"></i>
                        <span>Thông Báo</span>
                      </a>
                      <a href="#privacy" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        <i className="ri-shield-user-line w-5 h-5 flex items-center justify-center"></i>
                        <span>Quyền Riêng Tư</span>
                      </a>
                      <a href="#data" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                        <i className="ri-database-line w-5 h-5 flex items-center justify-center"></i>
                        <span>Dữ Liệu</span>
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3 space-y-8">
              <div id="account">
                <AccountSettings />
              </div>
              <div id="reading">
                <ReadingPreferences />
              </div>
              <div id="notifications">
                <NotificationSettings />
              </div>
              <div id="privacy">
                <PrivacySettings />
              </div>
              <div id="data">
                <DataManagement />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}