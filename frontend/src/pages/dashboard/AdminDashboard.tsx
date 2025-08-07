// src/app/admin-dashboard/page.tsx
'use client';

import { useState } from 'react';
import AdminStats from '../../components/admin-dashboard/AdminStats';
import StoryManagement from '../../components/admin-dashboard/StoryManagement';
import UserManagement from '../../components/admin-dashboard/UserManagement';
import ChapterManagement from '../../components/admin-dashboard/ChapterManagement';
import SystemSettings from '../../components/admin-dashboard/SystemSettings';
import ReportsAnalytics from '../../components/admin-dashboard/ReportsAnalytics';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: 'ri-dashboard-line' },
    { id: 'stories', label: 'Quản lý truyện', icon: 'ri-book-line' },
    { id: 'users', label: 'Quản lý người dùng', icon: 'ri-user-line' },
    { id: 'chapters', label: 'Quản lý chương', icon: 'ri-file-list-line' },
    { id: 'reports', label: 'Báo cáo & Phân tích', icon: 'ri-bar-chart-line' },
    { id: 'settings', label: 'Cài đặt hệ thống', icon: 'ri-settings-line' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminStats />;
      case 'stories':
        return <StoryManagement />;
      case 'users':
        return <UserManagement />;
      case 'chapters':
        return <ChapterManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <AdminStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/profile" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <i className="ri-arrow-left-line text-xl"></i>
              </a>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Admin Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Quản lý hệ thống đọc truyện</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <i className="ri-notification-line text-xl"></i>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center space-x-3">
                <img src="https://readdy.ai/api/search-image?query=professional%20administrator%20avatar%20with%20friendly%20expression%2C%20business%20casual%20style%2C%20clean%20background&width=40&height=40&seq=admin-avatar-001&orientation=squarish" 
                     alt="Admin Avatar" className="w-10 h-10 rounded-full object-cover" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900 dark:text-gray-100">Admin User</p>
                  <p className="text-gray-600 dark:text-gray-400">Quản trị viên</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-200 dark:border-gray-700 min-h-screen">
          <nav className="p-4 space-y-2">
            {tabs.map((tab) => (
              <a
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span className="font-medium">{tab.label}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}