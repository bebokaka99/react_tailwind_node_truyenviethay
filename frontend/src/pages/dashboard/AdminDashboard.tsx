// src/pages/admin-dashboard/AdminDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AdminStats from '../../components/admin-dashboard/AdminStats';
import StoryManagement from '../../components/admin-dashboard/StoryManagement';
import UserManagement from '../../components/admin-dashboard/UserManagement';
import ChapterManagement from '../../components/admin-dashboard/ChapterManagement';
import SystemSettings from '../../components/admin-dashboard/SystemSettings';
import ReportsAnalytics from '../../components/admin-dashboard/ReportsAnalytics';
import AdminRecentActivities from '../../components/admin-dashboard/AdminRecentActivities';
import AdminTopStories from '../../components/admin-dashboard/AdminTopStories';
import { getAdminStats, AdminStatsResponse, getTopStories, TopStory } from '../../api/adminDashboard.api';

// Định nghĩa các kiểu dữ liệu cho response
interface DashboardData {
    stats: AdminStatsResponse;
    topStories: TopStory[];
    recentActivities: any[]; // Bạn nên tạo một interface chi tiết hơn cho activities
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const tabs = [
        { id: 'overview', label: 'Tổng quan', icon: 'ri-dashboard-line' },
        { id: 'stories', label: 'Quản lý truyện', icon: 'ri-book-line' },
        { id: 'users', label: 'Quản lý người dùng', icon: 'ri-user-line' },
        { id: 'chapters', label: 'Quản lý chương', icon: 'ri-file-list-line' },
        { id: 'reports', label: 'Báo cáo & Phân tích', icon: 'ri-bar-chart-line' },
        { id: 'settings', label: 'Cài đặt hệ thống', icon: 'ri-settings-line' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) throw new Error('Không tìm thấy token.');

                const [statsResponse, topStoriesResponse] = await Promise.all([
                    getAdminStats(token),
                    getTopStories(token, 5),
                ]);
            
                setDashboardData({
                    stats: statsResponse,
                    topStories: topStoriesResponse,
                    recentActivities: statsResponse.recentActivities,
                });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderContent = () => {
        if (loading) return <div className="text-center py-10">Đang tải dữ liệu...</div>;
        if (error) return <div className="text-center py-10 text-red-500">Lỗi: {error}</div>;

        switch (activeTab) {
            case 'overview':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <AdminStats stats={dashboardData?.stats || null} />
                            <AdminTopStories stories={dashboardData?.topStories || []} />
                        </div>
                        <AdminRecentActivities activities={dashboardData?.recentActivities || []} />
                    </div>
                );
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
                return <AdminStats stats={dashboardData?.stats || null} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <div className="flex">
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
                <main className="flex-1 p-6">
                    {renderContent()}
                </main>
            </div>
            <Footer />
        </div>
    );
}