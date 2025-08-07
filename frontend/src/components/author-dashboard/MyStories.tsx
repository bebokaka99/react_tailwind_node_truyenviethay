'use client';

import { useState } from 'react';

export default function MyStories() {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated');

  const stories = [
    {
      id: 1,
      title: 'Tu La Vương Triều',
      genre: 'Tiên Hiệp',
      status: 'ongoing',
      chapters: 341,
      views: '1.2M',
      likes: '45K',
      rating: 4.8,
      lastUpdate: '2024-03-15',
      description: 'Một câu chuyện về hành trình tu luyện của thiếu niên từ phàm nhân trở thành Tu La Vương...',
      cover: 'https://readdy.ai/api/search-image?query=Vietnamese%20fantasy%20novel%20cover%20with%20mystical%20warrior%2C%20ancient%20oriental%20design%2C%20purple%20and%20gold%20colors&width=200&height=280&seq=mystory-001&orientation=portrait'
    },
    {
      id: 2,
      title: 'Thiên Kim Tiểu Thư',
      genre: 'Ngôn Tình',
      status: 'ongoing',
      chapters: 245,
      views: '856K',
      likes: '32K',
      rating: 4.6,
      lastUpdate: '2024-03-14',
      description: 'Câu chuyện tình yêu giữa cô tiểu thư nhà giàu và chàng trai nghèo có tài...',
      cover: 'https://readdy.ai/api/search-image?query=Vietnamese%20romance%20novel%20cover%20with%20elegant%20lady%20in%20traditional%20dress%2C%20soft%20pink%20and%20white%20colors&width=200&height=280&seq=mystory-002&orientation=portrait'
    },
    {
      id: 3,
      title: 'Mộng Hồi Đại Thanh',
      genre: 'Cổ Đại',
      status: 'hiatus',
      chapters: 89,
      views: '234K',
      likes: '12K',
      rating: 4.4,
      lastUpdate: '2024-03-07',
      description: 'Xuyên không về triều đại Thanh, cô gái hiện đại phải thích nghi với cuộc sống cung đình...',
      cover: 'https://readdy.ai/api/search-image?query=Vietnamese%20historical%20novel%20cover%20with%20ancient%20Chinese%20palace%2C%20traditional%20architecture%2C%20golden%20colors&width=200&height=280&seq=mystory-003&orientation=portrait'
    },
    {
      id: 4,
      title: 'Huyền Thoại Kiếm Sĩ',
      genre: 'Huyền Huyễn',
      status: 'completed',
      chapters: 567,
      views: '2.1M',
      likes: '78K',
      rating: 4.9,
      lastUpdate: '2024-02-28',
      description: 'Hành trình của một kiếm sĩ trẻ tuổi trở thành huyền thoại trong thế giới tu tiên...',
      cover: 'https://readdy.ai/api/search-image?query=Vietnamese%20fantasy%20novel%20cover%20with%20legendary%20sword%20master%2C%20mystical%20sword%2C%20blue%20and%20silver%20colors&width=200&height=280&seq=mystory-004&orientation=portrait'
    },
    {
      id: 5,
      title: 'Nữ Hoàng Băng Giá',
      genre: 'Tiên Hiệp',
      status: 'draft',
      chapters: 12,
      views: '0',
      likes: '0',
      rating: 0,
      lastUpdate: '2024-03-10',
      description: 'Câu chuyện về nữ tu sĩ có năng lực băng hệ mạnh mẽ...',
      cover: 'https://readdy.ai/api/search-image?query=Vietnamese%20fantasy%20novel%20cover%20with%20ice%20queen%20character%2C%20frozen%20landscape%2C%20blue%20and%20white%20colors&width=200&height=280&seq=mystory-005&orientation=portrait'
    }
  ];

  const filteredStories = stories.filter(story => {
    if (filter === 'all') return true;
    return story.status === filter;
  });

  const sortedStories = [...filteredStories].sort((a, b) => {
    if (sortBy === 'updated') return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime();
    if (sortBy === 'views') return parseInt(b.views.replace(/[^\d]/g, '')) - parseInt(a.views.replace(/[^\d]/g, ''));
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'chapters') return b.chapters - a.chapters;
    return 0;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'hiatus': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ongoing': return 'Đang ra';
      case 'completed': return 'Hoàn thành';
      case 'hiatus': return 'Tạm nghỉ';
      case 'draft': return 'Bản nháp';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Truyện của tôi</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Quản lý tất cả các tác phẩm của bạn</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 whitespace-nowrap">
          <i className="ri-add-line mr-2"></i>
          Tạo truyện mới
        </button>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="status-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">Trạng thái:</label>
              <select 
                id="status-filter"
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8 transition-colors"
              >
                <option value="all">Tất cả</option>
                <option value="ongoing">Đang ra</option>
                <option value="completed">Hoàn thành</option>
                <option value="hiatus">Tạm nghỉ</option>
                <option value="draft">Bản nháp</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="sort-by" className="text-sm font-medium text-gray-700 dark:text-gray-300">Sắp xếp:</label>
              <select 
                id="sort-by"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8 transition-colors"
              >
                <option value="updated">Cập nhật mới nhất</option>
                <option value="views">Lượt xem</option>
                <option value="rating">Đánh giá</option>
                <option value="chapters">Số chương</option>
              </select>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <i className="ri-grid-line text-lg"></i>
            </button>
            <button className="p-2 text-purple-600 bg-purple-50 dark:bg-purple-900 rounded-lg transition-colors">
              <i className="ri-list-check text-lg"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedStories.map((story) => (
          <div key={story.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img 
                src={story.cover} 
                alt={story.title}
                className="w-full h-48 object-cover object-top"
              />
              <div className="absolute top-3 right-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(story.status)}`}>
                  {getStatusText(story.status)}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2 text-white">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <i className="ri-file-list-line mr-1"></i>
                      {story.chapters} chương
                    </span>
                    <span className="flex items-center">
                      <i className="ri-star-fill text-yellow-400 mr-1"></i>
                      {story.rating > 0 ? story.rating : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-1">{story.title}</h3>
                  <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-xs rounded-full">
                    {story.genre}
                  </span>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <i className="ri-more-line"></i>
                </button>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{story.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                <span className="flex items-center">
                  <i className="ri-eye-line mr-1"></i>
                  {story.views}
                </span>
                <span className="flex items-center">
                  <i className="ri-heart-line mr-1"></i>
                  {story.likes}
                </span>
                <span className="flex items-center">
                  <i className="ri-calendar-line mr-1"></i>
                  {new Date(story.lastUpdate).toLocaleDateString('vi-VN')}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium whitespace-nowrap">
                  <i className="ri-edit-line mr-2"></i>
                  Chỉnh sửa
                </button>
                <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium whitespace-nowrap">
                  <i className="ri-eye-line mr-2"></i>
                  Xem
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedStories.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-book-line text-3xl text-gray-400 dark:text-gray-500"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Không có truyện nào</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Bạn chưa có truyện nào phù hợp với bộ lọc đã chọn.</p>
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap">
            <i className="ri-add-line mr-2"></i>
            Tạo truyện đầu tiên
          </button>
        </div>
      )}
    </div>
  );
}