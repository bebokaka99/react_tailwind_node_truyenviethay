'use client';

import { useState } from 'react';

export default function AuthorStats() {
  const [timeRange, setTimeRange] = useState('7d');

  const stats = [
    {
      title: 'Tổng số truyện',
      value: '8',
      change: '+1',
      trend: 'up',
      icon: 'ri-book-line',
      color: 'blue',
      detail: '3 đang viết, 5 hoàn thành'
    },
    {
      title: 'Tổng lượt xem',
      value: '2.3M',
      change: '+15.2%',
      trend: 'up',
      icon: 'ri-eye-line',
      color: 'green',
      detail: '45K lượt xem tuần này'
    },
    {
      title: 'Người theo dõi',
      value: '12,456',
      change: '+234',
      trend: 'up',
      icon: 'ri-user-heart-line',
      color: 'purple',
      detail: 'Tăng 234 người theo dõi'
    },
    {
      title: 'Thu nhập tháng này',
      value: '₫25.8M',
      change: '+18.6%',
      trend: 'up',
      icon: 'ri-money-dollar-circle-line',
      color: 'orange',
      detail: 'Từ tính năng premium'
    }
  ];

  const recentChapters = [
    {
      id: 1,
      title: 'Chương 341: Thiên Kiếm Xuất Thế',
      story: 'Tu La Vương Triều',
      publishedAt: '2024-03-15 14:30',
      views: 15420,
      likes: 892,
      comments: 156,
      status: 'published'
    },
    {
      id: 2,
      title: 'Chương 245: Tình Yêu Đầu Tiên',
      story: 'Thiên Kim Tiểu Thư',
      publishedAt: '2024-03-14 20:15',
      views: 12340,
      likes: 675,
      comments: 89,
      status: 'published'
    },
    {
      id: 3,
      title: 'Chương 89: Hồi Ức Quá Khứ',
      story: 'Mộng Hồi Đại Thanh',
      publishedAt: null,
      views: 0,
      likes: 0,
      comments: 0,
      status: 'draft'
    }
  ];

  const topStories = [
    {
      title: 'Tu La Vương Triều',
      chapters: 341,
      views: '1.2M',
      rating: 4.8,
      genre: 'Tiên Hiệp',
      status: 'ongoing',
      lastUpdate: '2 giờ trước'
    },
    {
      title: 'Thiên Kim Tiểu Thư',
      chapters: 245,
      views: '856K',
      rating: 4.6,
      genre: 'Ngôn Tình',
      status: 'ongoing',
      lastUpdate: '1 ngày trước'
    },
    {
      title: 'Mộng Hồi Đại Thanh',
      chapters: 89,
      views: '234K',
      rating: 4.4,
      genre: 'Cổ Đại',
      status: 'hiatus',
      lastUpdate: '1 tuần trước'
    }
  ];

  const weeklyGoals = [
    { name: 'Chương mới', current: 5, target: 7, icon: 'ri-file-text-line' },
    { name: 'Từ viết', current: 15420, target: 20000, icon: 'ri-edit-line' },
    { name: 'Tương tác', current: 234, target: 300, icon: 'ri-chat-1-line' },
    { name: 'Người theo dõi mới', current: 67, target: 100, icon: 'ri-user-add-line' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Xin chào, Lê Minh Tâm!</h2>
            <p className="text-purple-100 mt-2">Hôm nay bạn đã viết được <span className="font-semibold">2,340 từ</span></p>
            <div className="flex items-center mt-4 space-x-6">
              <div className="flex items-center">
                <i className="ri-fire-line text-orange-400 mr-2 text-xl"></i>
                <span>Streak: 15 ngày</span>
              </div>
              <div className="flex items-center">
                <i className="ri-trophy-line text-yellow-400 mr-2 text-xl"></i>
                <span>Tác giả xuất sắc</span>
              </div>
            </div>
          </div>
          <button className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg text-white hover:bg-white/30 transition-colors whitespace-nowrap">
            <i className="ri-add-line mr-2"></i>
            Viết chương mới
          </button>
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Thống kê tổng quan</h3>
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                timeRange === range
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
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
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                stat.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                stat.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' : 'bg-orange-100 dark:bg-orange-900'
              }`}>
                <i className={`${stat.icon} text-xl ${
                  stat.color === 'blue' ? 'text-blue-600 dark:text-blue-300' :
                  stat.color === 'green' ? 'text-green-600 dark:text-green-300' :
                  stat.color === 'purple' ? 'text-purple-600 dark:text-purple-300' : 'text-orange-600 dark:text-orange-300'
                }`}></i>
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
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{stat.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Goals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Mục tiêu tuần này</h3>
            <button className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-600 text-sm font-medium whitespace-nowrap">
              Cập nhật mục tiêu
            </button>
          </div>
          <div className="space-y-4">
            {weeklyGoals.map((goal, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <i className={`${goal.icon} text-purple-600 dark:text-purple-300`}></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{goal.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 bg-purple-600 dark:bg-purple-400 rounded-full"
                      style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-10">
                    {Math.round((goal.current / goal.target) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Stories */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Truyện của tôi</h3>
            <button className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-600 text-sm font-medium whitespace-nowrap">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-4">
            {topStories.map((story, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <img 
                  src={`https://readdy.ai/api/search-image?query=Vietnamese%20$%7Bstory.genre%7D%20novel%20book%20cover%20with%20mystical%20elements%2C%20oriental%20fantasy%20design&width=50&height=70&seq=author-story-${index}&orientation=portrait`}
                  alt={story.title}
                  className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">{story.title}</h4>
                  <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center">
                      <i className="ri-file-list-line mr-1"></i>
                      {story.chapters}
                    </span>
                    <span className="flex items-center">
                      <i className="ri-eye-line mr-1"></i>
                      {story.views}
                    </span>
                    <span className="flex items-center">
                      <i className="ri-star-fill text-yellow-400 mr-1"></i>
                      {story.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      story.status === 'ongoing' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 
                      story.status === 'hiatus' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                      'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {story.status === 'ongoing' ? 'Đang ra' : 
                       story.status === 'hiatus' ? 'Tạm nghỉ' : 'Hoàn thành'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">{story.lastUpdate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Chapters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Chương gần đây</h3>
          <button className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-600 text-sm font-medium whitespace-nowrap">
            Quản lý chương
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Chương</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Trạng thái</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Thống kê</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Thời gian</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {recentChapters.map((chapter, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{chapter.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{chapter.story}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                      chapter.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {chapter.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center">
                        <i className="ri-eye-line mr-1"></i>
                        {chapter.views.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <i className="ri-heart-line mr-1"></i>
                        {chapter.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <i className="ri-chat-1-line mr-1"></i>
                        {chapter.comments}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                    {chapter.publishedAt || 'Chưa xuất bản'}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors">
                        <i className="ri-edit-line"></i>
                      </button>
                      <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors">
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <i className="ri-more-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}