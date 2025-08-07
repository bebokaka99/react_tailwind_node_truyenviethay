// src/components/admin-dashboard/ChapterManagement.tsx
'use client';

import { useState } from 'react';

export default function ChapterManagement() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapters, setSelectedChapters] = useState<number[]>([]);

  const chapters = [
    {
      id: 1,
      title: 'Chương 341: Thiên Kiếm Xuất Thế',
      story: 'Tu La Vương Triều',
      author: 'Lê Minh Hoàng',
      chapterNumber: 341,
      wordCount: 3250,
      status: 'published',
      publishedAt: '2024-03-15 14:30',
      views: 15420,
      likes: 892,
      comments: 156
    },
    {
      id: 2,
      title: 'Chương 257: Ma Khí Xuất Hiện',
      story: 'Thiên Hạ Đệ Nhất Kiếm',
      author: 'Phạm Văn Thành',
      chapterNumber: 257,
      wordCount: 2890,
      status: 'pending',
      publishedAt: null,
      views: 0,
      likes: 0,
      comments: 0
    },
    {
      id: 3,
      title: 'Chương 188: Vĩnh Biệt',
      story: 'Ma Đạo Tổ Sư',
      author: 'Trần Thị Mai',
      chapterNumber: 188,
      wordCount: 4120,
      status: 'published',
      publishedAt: '2024-03-14 20:15',
      views: 28750,
      likes: 1247,
      comments: 324
    },
    {
      id: 4,
      title: 'Chương 90: Tình Cảm Bùng Nổ',
      story: 'Liệt Hỏa Tâm Ma',
      author: 'Nguyễn Văn Đức',
      chapterNumber: 90,
      wordCount: 2650,
      status: 'rejected',
      publishedAt: null,
      views: 0,
      likes: 0,
      comments: 0,
      rejectReason: 'Nội dung không phù hợp với quy định'
    }
  ];

  const filteredChapters = chapters.filter(chapter => {
    const matchesFilter = filter === 'all' || chapter.status === filter;
    const matchesSearch = chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          chapter.story.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          chapter.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSelectAll = () => {
    if (selectedChapters.length === filteredChapters.length) {
      setSelectedChapters([]);
    } else {
      setSelectedChapters(filteredChapters.map(chapter => chapter.id));
    }
  };

  const handleSelectChapter = (chapterId: number) => {
    if (selectedChapters.includes(chapterId)) {
      setSelectedChapters(selectedChapters.filter(id => id !== chapterId));
    } else {
      setSelectedChapters([...selectedChapters, chapterId]);
    }
  };

  const statColors = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400';
      case 'yellow': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400';
      case 'green': return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400';
      case 'red': return 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
    }
  };

  const statusColors = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300';
      case 'rejected': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };
  
  const filterButtonColors = (isActive: boolean) => isActive
    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400'
    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Quản lý chương</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Kiểm duyệt và quản lý tất cả chương truyện</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
            <i className="ri-check-line mr-2"></i>
            Duyệt hàng loạt
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Chapter Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Chương hôm nay', value: '234', icon: 'ri-file-text-line', color: 'blue' },
          { title: 'Chờ duyệt', value: '42', icon: 'ri-time-line', color: 'yellow' },
          { title: 'Đã xuất bản', value: '8,945', icon: 'ri-check-line', color: 'green' },
          { title: 'Bị từ chối', value: '15', icon: 'ri-close-line', color: 'red' }
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${statColors(stat.color)}`}>
                <i className={`${stat.icon} text-xl`}></i>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lọc theo trạng thái:</span>
            {[
              { value: 'all', label: 'Tất cả' },
              { value: 'published', label: 'Đã xuất bản' },
              { value: 'pending', label: 'Chờ duyệt' },
              { value: 'rejected', label: 'Bị từ chối' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${filterButtonColors(filter === option.value)}`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
            <input
              type="text"
              placeholder="Tìm kiếm chương, truyện hoặc tác giả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
            />
          </div>
        </div>
      </div>

      {/* Chapters Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedChapters.length === filteredChapters.length && filteredChapters.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 dark:border-gray-500 text-blue-600 dark:text-blue-500 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Chương
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Truyện & Tác giả
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Thống kê
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ngày xuất bản
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredChapters.map((chapter) => (
                <tr key={chapter.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedChapters.includes(chapter.id)}
                      onChange={() => handleSelectChapter(chapter.id)}
                      className="rounded border-gray-300 dark:border-gray-500 text-blue-600 dark:text-blue-500 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{chapter.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Chương {chapter.chapterNumber} • {chapter.wordCount.toLocaleString()} từ
                      </p>
                      {chapter.rejectReason && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1 bg-red-50 dark:bg-red-900 px-2 py-1 rounded">
                          Lý do từ chối: {chapter.rejectReason}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-gray-100">{chapter.story}</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Tác giả: {chapter.author}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <i className="ri-eye-line mr-1"></i>
                        {chapter.views.toLocaleString()} lượt xem
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <i className="ri-heart-line mr-1"></i>
                        {chapter.likes.toLocaleString()} thích
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <i className="ri-chat-1-line mr-1"></i>
                        {chapter.comments.toLocaleString()} bình luận
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${statusColors(chapter.status)}`}>
                      {chapter.status === 'published' ? 'Đã xuất bản' :
                       chapter.status === 'pending' ? 'Chờ duyệt' : 'Bị từ chối'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {chapter.publishedAt || 'Chưa xuất bản'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors">
                        <i className="ri-eye-line"></i>
                      </button>
                      <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors">
                        <i className="ri-edit-line"></i>
                      </button>
                      {chapter.status === 'pending' && (
                        <>
                          <button className="p-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors">
                            <i className="ri-check-line"></i>
                          </button>
                          <button className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors">
                            <i className="ri-close-line"></i>
                          </button>
                        </>
                      )}
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

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Hiển thị <span className="font-medium">1-{filteredChapters.length}</span> trong tổng số <span className="font-medium">{chapters.length}</span> chương
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
              Trước
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
              Tiếp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}