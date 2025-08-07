'use client';

import { useState } from 'react';

export default function StoryManagement() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStories, setSelectedStories] = useState<number[]>([]);

  const stories = [
    {
      id: 1,
      title: 'Tu La Vương Triều',
      author: 'Lê Minh Hoàng',
      genre: 'Tiên Hiệp',
      chapters: 340,
      views: '2.5M',
      status: 'approved',
      rating: 4.8,
      createdAt: '2024-01-15',
      lastUpdate: '2024-03-15'
    },
    {
      id: 2,
      title: 'Thiên Hạ Đệ Nhất Kiếm',
      author: 'Phạm Văn Thành',
      genre: 'Huyền Huyễn',
      chapters: 256,
      views: '1.8M',
      status: 'pending',
      rating: 4.6,
      createdAt: '2024-02-10',
      lastUpdate: '2024-03-14'
    },
    {
      id: 3,
      title: 'Ma Đạo Tổ Sư',
      author: 'Trần Thị Mai',
      genre: 'Tiên Hiệp',
      chapters: 187,
      views: '1.6M',
      status: 'approved',
      rating: 4.9,
      createdAt: '2024-01-20',
      lastUpdate: '2024-03-13'
    },
    {
      id: 4,
      title: 'Liệt Hỏa Tâm Ma',
      author: 'Nguyễn Văn Đức',
      genre: 'Đam Mỹ',
      chapters: 89,
      views: '890K',
      status: 'rejected',
      rating: 4.2,
      createdAt: '2024-03-01',
      lastUpdate: '2024-03-10'
    }
  ];

  const filteredStories = stories.filter(story => {
    const matchesFilter = filter === 'all' || story.status === filter;
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          story.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSelectAll = () => {
    if (selectedStories.length === filteredStories.length && filteredStories.length > 0) {
      setSelectedStories([]);
    } else {
      setSelectedStories(filteredStories.map(story => story.id));
    }
  };

  const handleSelectStory = (storyId: number) => {
    if (selectedStories.includes(storyId)) {
      setSelectedStories(selectedStories.filter(id => id !== storyId));
    } else {
      setSelectedStories([...selectedStories, storyId]);
    }
  };

  const getStatusColors = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300';
      case 'rejected': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Quản lý truyện</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Kiểm duyệt và quản lý tất cả truyện trên hệ thống</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap">
            <i className="ri-check-line mr-2"></i>
            Phê duyệt tất cả
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Xuất dữ liệu
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lọc theo trạng thái:</span>
            {[
              { value: 'all', label: 'Tất cả' },
              { value: 'approved', label: 'Đã duyệt' },
              { value: 'pending', label: 'Chờ duyệt' },
              { value: 'rejected', label: 'Bị từ chối' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  filter === option.value
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="relative">
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Tìm kiếm truyện hoặc tác giả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-72"
            />
          </div>
        </div>
      </div>

      {/* Stories Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedStories.length === filteredStories.length && filteredStories.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Truyện
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Thể loại
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Thống kê
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStories.map((story) => (
                <tr key={story.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedStories.includes(story.id)}
                      onChange={() => handleSelectStory(story.id)}
                      className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={`https://readdy.ai/api/search-image?query=Vietnamese%20fantasy%20novel%20book%20cover%20with%20mystical%20elements%2C%20ancient%20oriental%20design%2C%20${story.genre}%20genre%20style&width=60&height=80&seq=story-${story.id}&orientation=portrait`}
                        alt={story.title}
                        className="w-12 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{story.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Tác giả: {story.author}</p>
                        <div className="flex items-center mt-1">
                          <i className="ri-star-fill text-yellow-400 text-sm mr-1"></i>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{story.rating}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300">
                      {story.genre}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <i className="ri-file-list-line mr-1"></i>
                        {story.chapters} chương
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <i className="ri-eye-line mr-1"></i>
                        {story.views} lượt xem
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColors(story.status)}`}>
                      {story.status === 'approved' ? 'Đã duyệt' :
                       story.status === 'pending' ? 'Chờ duyệt' : 'Bị từ chối'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {story.createdAt}
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
            Hiển thị <span className="font-medium">{filteredStories.length > 0 ? '1' : '0'}-{filteredStories.length}</span> trong tổng số <span className="font-medium">{stories.length}</span> truyện
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Trước
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Tiếp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}