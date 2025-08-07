'use client';

import { useState } from 'react';
import AuthorStats from '../../components/author-dashboard/AuthorStats';
import MyStories from '../../components/author-dashboard/MyStories';
import CreateStory from '../../components/author-dashboard/CreateStory';
import ChapterEditor from '../../components/author-dashboard/ChapterEditor';
import Analytics from '../../components/author-dashboard/Analytics';
import AuthorProfile from '../../components/author-dashboard/AuthorProfile';

export default function AuthorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Tổng quan', icon: 'ri-dashboard-line' },
    { id: 'stories', label: 'Truyện của tôi', icon: 'ri-book-open-line' },
    { id: 'create', label: 'Tạo truyện mới', icon: 'ri-add-line' },
    { id: 'editor', label: 'Viết chương', icon: 'ri-edit-line' },
    { id: 'analytics', label: 'Thống kê', icon: 'ri-line-chart-line' },
    { id: 'profile', label: 'Hồ sơ tác giả', icon: 'ri-user-line' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AuthorStats />;
      case 'stories':
        return <MyStories />;
      case 'create':
        return <CreateStory />;
      case 'editor':
        return <ChapterEditor />;
      case 'analytics':
        return <Analytics />;
      case 'profile':
        return <AuthorProfile />;
      default:
        return <AuthorStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/profile" className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-600 transition-colors">
                <i className="ri-arrow-left-line text-xl"></i>
              </a>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Author Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Không gian sáng tác của bạn</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 whitespace-nowrap">
                <i className="ri-add-line mr-2"></i>
                Chương mới
              </button>
              <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <i className="ri-notification-line text-xl"></i>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">5</span>
              </button>
              <div className="flex items-center space-x-3">
                <img src="https://readdy.ai/api/search-image?query=creative%20writer%20author%20avatar%20with%20artistic%20expression%2C%20casual%20artistic%20style%2C%20inspiring%20background%20with%20books%20and%20pen&width=40&height=40&seq=author-avatar-001&orientation=squarish" 
                     alt="Author Avatar" className="w-10 h-10 rounded-full object-cover" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900 dark:text-gray-100">Lê Minh Tâm</p>
                  <p className="text-gray-600 dark:text-gray-400">Tác giả</p>
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
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span className="font-medium">{tab.label}</span>
              </button>
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