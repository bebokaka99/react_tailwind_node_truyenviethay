'use client';

import { useState, useEffect } from 'react';
import { getAdminStats, AdminStatsResponse, getTopStories, TopStory } from '../../api/adminDashboard.api';

export default function AdminStats() {
    const [stats, setStats] = useState<AdminStatsResponse | null>(null);
    const [topStories, setTopStories] = useState<TopStory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [timeRange, setTimeRange] = useState('7d');

    // Dữ liệu giả cho các phần khác (hoạt động)
    const recentActivities = [
        {
            type: 'story',
            title: 'Truyện "Kiếm Thần Truyền Kỳ" được phê duyệt',
            author: 'Nguyễn Văn A',
            time: '5 phút trước',
            status: 'approved'
        },
        {
            type: 'user',
            title: 'Người dùng "reader123" bị khóa tài khoản',
            author: 'Admin System',
            time: '15 phút trước',
            status: 'warning'
        },
        {
            type: 'chapter',
            title: 'Chương 245 - "Ma Đạo Tổ Sư" cần kiểm duyệt',
            author: 'Trần Thị B',
            time: '32 phút trước',
            status: 'pending'
        },
        {
            type: 'report',
            title: 'Báo cáo vi phạm nội dung từ người dùng',
            author: 'Hệ thống',
            time: '1 giờ trước',
            status: 'urgent'
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    throw new Error('Không tìm thấy token xác thực.');
                }

                // Gọi đồng thời cả hai API để tối ưu thời gian tải
                const [statsData, topStoriesData] = await Promise.all([
                    getAdminStats(token),
                    getTopStories(token, 5),
                ]);

                setStats(statsData);
                setTopStories(topStoriesData);

            } catch (err) {
                console.error(err);
                setError('Không thể tải dữ liệu.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const statCards = [
        {
            title: 'Tổng số truyện',
            value: stats?.totalStories,
            icon: 'ri-book-line',
            color: 'blue'
        },
        {
            title: 'Tổng số người dùng',
            value: stats?.totalUsers,
            icon: 'ri-user-line',
            color: 'green'
        },
        {
            title: 'Chương mới hôm nay',
            value: stats?.newChaptersToday,
            icon: 'ri-file-text-line',
            color: 'yellow'
        },
        {
            title: 'Tổng doanh thu',
            value: stats?.totalRevenue,
            icon: 'ri-money-dollar-circle-line',
            color: 'purple'
        }
    ];

    const statusColors = (status: string) => {
        switch (status) {
            case 'approved': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
            case 'warning': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
            case 'pending': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
            case 'urgent': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
            case 'dang_tien_hanh': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
            case 'hoan_thanh': return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
            default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
        }
    };

    const iconColors = (color: string) => {
        switch (color) {
            case 'blue': return 'text-blue-600 dark:text-blue-400';
            case 'green': return 'text-green-600 dark:text-green-400';
            case 'yellow': return 'text-yellow-600 dark:text-yellow-400';
            case 'purple': return 'text-purple-600 dark:text-purple-400';
            default: return 'text-gray-600 dark:text-gray-400';
        }
    };

    const iconBackgrounds = (color: string) => {
        switch (color) {
            case 'blue': return 'bg-blue-100 dark:bg-blue-900';
            case 'green': return 'bg-green-100 dark:bg-green-900';
            case 'yellow': return 'bg-yellow-100 dark:bg-yellow-900';
            case 'purple': return 'bg-purple-100 dark:bg-purple-900';
            default: return 'bg-gray-100 dark:bg-gray-700';
        }
    };

    const formatNumber = (num: number | undefined) => {
        if (num === undefined || num === null) return 'N/A';
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toLocaleString();
    };

    if (loading) {
        return <div className="text-center py-10 text-gray-500 dark:text-gray-400">Đang tải dữ liệu thống kê...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500 dark:text-red-400">Đã xảy ra lỗi: {error}</div>;
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard Tổng Quan</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Thống kê và hoạt động hệ thống</p>
                </div>
                <div className="flex space-x-2">
                    {/* Các nút lọc theo thời gian */}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBackgrounds(stat.color)}`}>
                                <i className={`${stat.icon} text-xl ${iconColors(stat.color)}`}></i>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{formatNumber(stat.value)}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Hoạt động gần đây</h3>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium whitespace-nowrap">
                            Xem tất cả
                        </button>
                    </div>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${statusColors(activity.status)}`}>
                                    <i className={`${
                                        activity.type === 'story' ? 'ri-book-line' :
                                        activity.type === 'user' ? 'ri-user-line' :
                                        activity.type === 'chapter' ? 'ri-file-text-line' :
                                        'ri-alert-line'
                                    } text-sm`}></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">{activity.title}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                        {activity.author} • {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Stories */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Truyện phổ biến nhất</h3>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium whitespace-nowrap">
                            Xem chi tiết
                        </button>
                    </div>
                    <div className="space-y-4">
                        {topStories.length > 0 ? (
                            topStories.map((story, index) => (
                                <div key={story.id_truyen} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                    <div className="w-12 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold text-lg">{index + 1}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">{story.ten_truyen}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Tác giả: {story.tac_gia}</p>
                                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            <span className="flex items-center">
                                                <i className="ri-eye-line mr-1"></i>
                                                {formatNumber(story.luot_xem)} lượt xem
                                            </span>
                                            <span className="flex items-center">
                                                <i className="ri-star-fill text-yellow-400 mr-1"></i>
                                                {story.rating?.toFixed(1) || '0.0'}
                                            </span>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors(story.trang_thai_viet)}`}>
                                        {story.trang_thai_viet === 'dang_tien_hanh' ? 'Đang ra' : 'Hoàn thành'}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4 text-gray-500 dark:text-gray-400">Không có truyện nào.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}