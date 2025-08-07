// src/components/admin-dashboard/AdminStats.tsx
'use client';

import { useState } from 'react';

export default function AdminStats() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      title: 'Tổng số truyện',
      value: '12,845',
      change: '+5.2%',
      trend: 'up',
      icon: 'ri-book-line',
      color: 'blue'
    },
    {
      title: 'Người dùng hoạt động',
      value: '8,326',
      change: '+12.8%',
      trend: 'up',
      icon: 'ri-user-line',
      color: 'green'
    },
    {
      title: 'Chương mới hôm nay',
      value: '234',
      change: '-2.1%',
      trend: 'down',
      icon: 'ri-file-text-line',
      color: 'yellow'
    },
    {
      title: 'Doanh thu tháng',
      value: '₫45.2M',
      change: '+18.6%',
      trend: 'up',
      icon: 'ri-money-dollar-circle-line',
      color: 'purple'
    }
  ];

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

  const topStories = [
    {
      title: 'Tu La Vương Triều',
      author: 'Lê Minh Hoàng',
      views: '2.5M',
      chapters: 340,
      rating: 4.8,
      status: 'ongoing'
    },
    {
      title: 'Thiên Hạ Đệ Nhất Kiếm',
      author: 'Phạm Văn Thành',
      views: '1.8M',
      chapters: 256,
      rating: 4.6,
      status: 'ongoing'
    },
    {
      title: 'Ma Đạo Tổ Sư',
      author: 'Trần Thị Mai',
      views: '1.6M',
      chapters: 187,
      rating: 4.9,
      status: 'completed'
    }
  ];

  const statusColors = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'warning': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300';
      case 'urgent': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300';
      case 'ongoing': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'completed': return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard Tổng Quan</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Thống kê và hoạt động hệ thống</p>
        </div>
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                timeRange === range
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {range === '24h' ? '24 giờ' : range === '7d' ? '7 ngày' : range === '30d' ? '30 ngày' : '90 ngày'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBackgrounds(stat.color)}`}>
                <i className={`${stat.icon} text-xl ${iconColors(stat.color)}`}></i>
              </div>
              <span className={`flex items-center text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                <i className={`${stat.trend === 'up' ? 'ri-arrow-up-line' : 'ri-arrow-down-line'} mr-1`}></i>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</h3>
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
            {topStories.map((story, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="w-12 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">{story.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tác giả: {story.author}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <i className="ri-eye-line mr-1"></i>
                      {story.views}
                    </span>
                    <span className="flex items-center">
                      <i className="ri-file-list-line mr-1"></i>
                      {story.chapters} chương
                    </span>
                    <span className="flex items-center">
                      <i className="ri-star-fill text-yellow-400 mr-1"></i>
                      {story.rating}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors(story.status)}`}>
                  {story.status === 'ongoing' ? 'Đang ra' : 'Hoàn thành'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}