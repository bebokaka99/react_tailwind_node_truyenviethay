'use client';

import { useState } from 'react';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedStory, setSelectedStory] = useState('all');

  const stories = [
    { id: 'all', title: 'Tất cả truyện' },
    { id: '1', title: 'Tu La Vương Triều' },
    { id: '2', title: 'Thiên Kim Tiểu Thư' },
    { id: '3', title: 'Mộng Hồi Đại Thanh' },
    { id: '4', title: 'Huyền Thoại Kiếm Sĩ' }
  ];

  const overviewStats = [
    {
      title: 'Tổng lượt xem',
      value: '2.34M',
      change: '+12.5%',
      trend: 'up',
      icon: 'ri-eye-line',
      color: 'blue'
    },
    {
      title: 'Lượt thích',
      value: '156K',
      change: '+8.2%',
      trend: 'up',
      icon: 'ri-heart-line',
      color: 'red'
    },
    {
      title: 'Bình luận',
      value: '23.4K',
      change: '+15.7%',
      trend: 'up',
      icon: 'ri-chat-1-line',
      color: 'green'
    },
    {
      title: 'Người theo dõi',
      value: '12.5K',
      change: '+234',
      trend: 'up',
      icon: 'ri-user-heart-line',
      color: 'purple'
    }
  ];

  const topChapters = [
    {
      title: 'Chương 341: Thiên Kiếm Xuất Thế',
      story: 'Tu La Vương Triều',
      views: 45230,
      likes: 2340,
      comments: 567,
      publishDate: '2024-03-15'
    },
    {
      title: 'Chương 245: Tình Yêu Đầu Tiên',
      story: 'Thiên Kim Tiểu Thư',
      views: 38920,
      likes: 1890,
      comments: 423,
      publishDate: '2024-03-14'
    },
    {
      title: 'Chương 340: Quyết Chiến Cuối Cùng',
      story: 'Tu La Vương Triều',
      views: 35670,
      likes: 1756,
      comments: 389,
      publishDate: '2024-03-13'
    },
    {
      title: 'Chương 567: Hồi Kết Viên Mãn',
      story: 'Huyền Thoại Kiếm Sĩ',
      views: 32450,
      likes: 1623,
      comments: 298,
      publishDate: '2024-02-28'
    }
  ];

  const readerDemographics = [
    { age: '13-17', percentage: 25, count: '3.1K' },
    { age: '18-24', percentage: 35, count: '4.4K' },
    { age: '25-34', percentage: 28, count: '3.5K' },
    { age: '35+', percentage: 12, count: '1.5K' }
  ];

  const engagementData = [
    { metric: 'Tỷ lệ đọc hết chương', value: '78%', change: '+5%' },
    { metric: 'Thời gian đọc trung bình', value: '8.5 phút', change: '+12%' },
    { metric: 'Tỷ lệ bình luận', value: '12.3%', change: '+3%' },
    { metric: 'Tỷ lệ chia sẻ', value: '4.7%', change: '+8%' }
  ];

  const monthlyData = [
    { month: 'T1', views: 180000, likes: 12000, comments: 3400 },
    { month: 'T2', views: 220000, likes: 15000, comments: 4100 },
    { month: 'T3', views: 280000, likes: 18500, comments: 5200 },
    { month: 'T4', views: 320000, likes: 21000, comments: 6100 },
    { month: 'T5', views: 290000, likes: 19500, comments: 5800 },
    { month: 'T6', views: 350000, likes: 23000, comments: 6900 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Thống kê & Phân tích</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Theo dõi hiệu suất và tương tác của độc giả</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedStory}
            onChange={(e) => setSelectedStory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm pr-8"
          >
            {stories.map(story => (
              <option key={story.id} value={story.id}>{story.title}</option>
            ))}
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm pr-8"
          >
            <option value="7d">7 ngày qua</option>
            <option value="30d">30 ngày qua</option>
            <option value="90d">90 ngày qua</option>
            <option value="1y">1 năm qua</option>
          </select>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                stat.color === 'red' ? 'bg-red-100 dark:bg-red-900' :
                stat.color === 'green' ? 'bg-green-100 dark:bg-green-900' : 'bg-purple-100 dark:bg-purple-900'
              }`}>
                <i className={`${stat.icon} text-xl ${
                  stat.color === 'blue' ? 'text-blue-600 dark:text-blue-300' :
                  stat.color === 'red' ? 'text-red-600 dark:text-red-300' :
                  stat.color === 'green' ? 'text-green-600 dark:text-green-300' : 'text-purple-600 dark:text-purple-300'
                }`}></i>
              </div>
              <span className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                <i className="ri-arrow-up-line mr-1"></i>
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
        {/* Monthly Trends Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Xu hướng theo tháng</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">Lượt xem</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">Lượt thích</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col space-y-1 mb-2">
                  <div 
                    className="bg-blue-500 rounded-t"
                    style={{ height: `${(data.views / 350000) * 200}px` }}
                  ></div>
                  <div 
                    className="bg-red-500 rounded-t"
                    style={{ height: `${(data.likes / 25000) * 100}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reader Demographics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Độ tuổi độc giả</h3>
          <div className="space-y-4">
            {readerDemographics.map((demo, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-12">{demo.age}</span>
                  <div className="flex-1 w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="h-2 bg-purple-600 rounded-full"
                      style={{ width: `${demo.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{demo.percentage}%</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{demo.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Chapters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Chương được yêu thích nhất</h3>
            <button className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-600 text-sm font-medium whitespace-nowrap">
              Xem tất cả
            </button>
          </div>
          <div className="space-y-4">
            {topChapters.map((chapter, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-300">#{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">{chapter.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{chapter.story}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
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
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(chapter.publishDate).toLocaleDateString('vi-VN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Mức độ tương tác</h3>
          <div className="space-y-6">
            {engagementData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{item.metric}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{item.value}</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                    <i className="ri-arrow-up-line mr-1"></i>
                    {item.change}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">so với tháng trước</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Analytics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Phân tích doanh thu</h3>
          <button className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Xuất báo cáo
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-xl border border-green-200 dark:border-green-800">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-money-dollar-circle-line text-xl text-green-600 dark:text-green-300"></i>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100">₫25.8M</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Doanh thu tháng này</p>
            <span className="inline-flex items-center text-sm font-medium text-green-600 dark:text-green-400 mt-2">
              <i className="ri-arrow-up-line mr-1"></i>
              +18.6%
            </span>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-vip-crown-line text-xl text-blue-600 dark:text-blue-300"></i>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,234</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Độc giả Premium</p>
            <span className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 mt-2">
              <i className="ri-arrow-up-line mr-1"></i>
              +12.3%
            </span>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 rounded-xl border border-orange-200 dark:border-orange-800">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="ri-gift-line text-xl text-orange-600 dark:text-orange-300"></i>
            </div>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100">₫3.2M</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Quà tặng từ độc giả</p>
            <span className="inline-flex items-center text-sm font-medium text-orange-600 dark:text-orange-400 mt-2">
              <i className="ri-arrow-up-line mr-1"></i>
              +25.4%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}