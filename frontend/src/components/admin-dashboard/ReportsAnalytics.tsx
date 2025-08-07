// src/components/admin-dashboard/ReportsAnalytics.tsx
'use client';

import { useState } from 'react';

export default function ReportsAnalytics() {
  const [timeRange, setTimeRange] = useState('7d');
  const [reportType, setReportType] = useState('overview');

  const overviewStats = [
    {
      title: 'Tổng lượt xem',
      value: '2.5M',
      change: '+12.5%',
      trend: 'up',
      icon: 'ri-eye-line',
      color: 'blue'
    },
    {
      title: 'Người dùng mới',
      value: '1,234',
      change: '+8.3%',
      trend: 'up',
      icon: 'ri-user-add-line',
      color: 'green'
    },
    {
      title: 'Doanh thu',
      value: '₫125M',
      change: '+15.7%',
      trend: 'up',
      icon: 'ri-money-dollar-circle-line',
      color: 'purple'
    },
    {
      title: 'Tỷ lệ chuyển đổi',
      value: '3.2%',
      change: '-0.8%',
      trend: 'down',
      icon: 'ri-line-chart-line',
      color: 'orange'
    }
  ];

  const topGenres = [
    { name: 'Tiên Hiệp', value: 35, color: 'bg-blue-500' },
    { name: 'Huyền Huyễn', value: 28, color: 'bg-green-500' },
    { name: 'Đô Thị', value: 18, color: 'bg-purple-500' },
    { name: 'Đam Mỹ', value: 12, color: 'bg-pink-500' },
    { name: 'Khác', value: 7, color: 'bg-gray-500' }
  ];

  const recentReports = [
    {
      id: 1,
      type: 'content',
      title: 'Nội dung không phù hợp trong "Kiếm Thần"',
      reporter: 'user123',
      status: 'resolved',
      reportedAt: '2024-03-15 14:30',
      priority: 'high'
    },
    {
      id: 2,
      type: 'spam',
      title: 'Spam bình luận từ tài khoản bot',
      reporter: 'moderator1',
      status: 'investigating',
      reportedAt: '2024-03-15 12:15',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'copyright',
      title: 'Vi phạm bản quyền truyện "Ma Đạo"',
      reporter: 'author_original',
      status: 'pending',
      reportedAt: '2024-03-14 18:45',
      priority: 'high'
    },
    {
      id: 4,
      type: 'harassment',
      title: 'Quấy rối người dùng trong bình luận',
      reporter: 'victim_user',
      status: 'resolved',
      reportedAt: '2024-03-14 16:20',
      priority: 'medium'
    }
  ];

  const dailyStats = [
    { date: '15/03', users: 1200, chapters: 45, revenue: 2500 },
    { date: '14/03', users: 1180, chapters: 52, revenue: 2800 },
    { date: '13/03', users: 1350, chapters: 48, revenue: 2200 },
    { date: '12/03', users: 1100, chapters: 41, revenue: 2100 },
    { date: '11/03', users: 1450, chapters: 55, revenue: 3200 },
    { date: '10/03', users: 1320, chapters: 49, revenue: 2900 },
    { date: '09/03', users: 1280, chapters: 46, revenue: 2600 }
  ];

  const statColors = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400';
      case 'green': return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400';
      case 'purple': return 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400';
      case 'orange': return 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  const trendColors = (trend: string) => {
    return trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  const reportTypeColors = (type: string) => {
    switch (type) {
      case 'content': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300';
      case 'spam': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300';
      case 'copyright': return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300';
      case 'harassment': return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const reportPriorityColors = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300';
      case 'low': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  const reportStatusColors = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300';
      case 'investigating': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300';
      case 'pending': return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Báo cáo & Phân tích</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Thống kê chi tiết về hoạt động hệ thống</p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="24h">24 giờ qua</option>
            <option value="7d">7 ngày qua</option>
            <option value="30d">30 ngày qua</option>
            <option value="90d">90 ngày qua</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${statColors(stat.color)}`}>
                <i className={`${stat.icon} text-xl`}></i>
              </div>
              <span className={`flex items-center text-sm font-medium ${trendColors(stat.trend)}`}>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Activity Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Hoạt động hàng ngày</h3>
          <div className="space-y-4">
            {dailyStats.map((day, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <div className="font-medium text-gray-900 dark:text-gray-100">{day.date}</div>
                <div className="flex items-center space-x-8 text-sm">
                  <div className="flex items-center">
                    <i className="ri-user-line text-blue-600 dark:text-blue-400 mr-1"></i>
                    <span className="text-gray-600 dark:text-gray-400">{day.users}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-file-text-line text-green-600 dark:text-green-400 mr-1"></i>
                    <span className="text-gray-600 dark:text-gray-400">{day.chapters}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-money-dollar-circle-line text-purple-600 dark:text-purple-400 mr-1"></i>
                    <span className="text-gray-600 dark:text-gray-400">₫{day.revenue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Genres */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Thể loại phổ biến</h3>
          <div className="space-y-4">
            {topGenres.map((genre, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${genre.color}`}></div>
                  <span className="text-gray-700 dark:text-gray-300">{genre.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${genre.color}`}
                      style={{ width: `${genre.value}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-8">{genre.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Báo cáo vi phạm gần đây</h3>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm font-medium whitespace-nowrap">
              Xem tất cả
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Báo cáo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Loại
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Mức độ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Thời gian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{report.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Báo cáo bởi: {report.reporter}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${reportTypeColors(report.type)}`}>
                      {report.type === 'content' ? 'Nội dung' :
                       report.type === 'spam' ? 'Spam' :
                       report.type === 'copyright' ? 'Bản quyền' : 'Quấy rối'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${reportPriorityColors(report.priority)}`}>
                      {report.priority === 'high' ? 'Cao' :
                       report.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${reportStatusColors(report.status)}`}>
                      {report.status === 'resolved' ? 'Đã giải quyết' :
                       report.status === 'investigating' ? 'Đang xử lý' : 'Chờ xử lý'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {report.reportedAt}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors">
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors">
                        <i className="ri-check-line"></i>
                      </button>
                      <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors">
                        <i className="ri-close-line"></i>
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