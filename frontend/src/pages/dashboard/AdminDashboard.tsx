// src/pages/admin-dashboard/AdminDashboard.tsx
'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer'; // 👈 Thêm dòng này
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
      <Header />
      
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

      {/* 👈 Thêm Footer ở cuối */}
      <Footer />
    </div>
  );
}