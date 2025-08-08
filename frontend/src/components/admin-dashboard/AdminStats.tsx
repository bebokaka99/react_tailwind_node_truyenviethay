'use client';

import React from 'react';

// Định nghĩa props để nhận dữ liệu từ component cha
interface AdminStatsProps {
    stats: {
        totalStories: number;
        totalUsers: number;
        totalChapters: number;
        totalRevenue: number;
        newChaptersToday: number;
    } | null;
}

export default function AdminStats({ stats }: AdminStatsProps) {

    // Danh sách các thẻ thống kê
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

    // Helper function để trả về màu sắc của icon
    const iconColors = (color: string) => {
        switch (color) {
            case 'blue': return 'text-blue-600 dark:text-blue-400';
            case 'green': return 'text-green-600 dark:text-green-400';
            case 'yellow': return 'text-yellow-600 dark:text-yellow-400';
            case 'purple': return 'text-purple-600 dark:text-purple-400';
            default: return 'text-gray-600 dark:text-gray-400';
        }
    };

    // Helper function để trả về màu nền của icon
    const iconBackgrounds = (color: string) => {
        switch (color) {
            case 'blue': return 'bg-blue-100 dark:bg-blue-900';
            case 'green': return 'bg-green-100 dark:bg-green-900';
            case 'yellow': return 'bg-yellow-100 dark:bg-yellow-900';
            case 'purple': return 'bg-purple-100 dark:bg-purple-900';
            default: return 'bg-gray-100 dark:bg-gray-700';
        }
    };

    // Helper function để định dạng số lớn
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

    return (
        <div className="space-y-6">
            {/* Header cho phần thống kê */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Tổng Quan</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Các số liệu thống kê chính</p>
                </div>
            </div>

            {/* Khung chứa các thẻ thống kê */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-400">
                        <div className="flex items-center justify-between">
                            {/* Icon của thẻ */}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBackgrounds(stat.color)}`}>
                                <i className={`${stat.icon} text-xl ${iconColors(stat.color)}`}></i>
                            </div>
                        </div>
                        <div className="mt-4">
                            {/* Giá trị thống kê */}
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{formatNumber(stat.value)}</h3>
                            {/* Tiêu đề của thẻ */}
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}