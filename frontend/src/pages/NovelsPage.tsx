// src/pages/NovelsPage.tsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { novelDetails } from '../mockData';

// Chuyển hàm parseViews ra ngoài để có thể truy cập được
const parseViews = (views: string) => {
  if (views.endsWith('M')) {
    return parseFloat(views) * 1000000;
  }
  if (views.endsWith('K')) {
    return parseFloat(views) * 1000;
  }
  return parseFloat(views);
};

export default function NovelsPage() {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const genres = [
    { id: 'all', name: 'Tất cả' },
    { id: 'kiem-hiep', name: 'Kiếm hiệp' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'tu-tien', name: 'Tu tiên' },
    { id: 'ngon-tinh', name: 'Ngôn tình' },
    { id: 'do-thi', name: 'Đô thị' },
    { id: 'lich-su', name: 'Lịch sử' }
  ];

  const processedNovels = novelDetails.map(novel => ({
    ...novel,
    genre: novel.genres[0].toLowerCase().replace(/\s/g, '-')
  }));

  const filteredNovels = useMemo(() => {
    return processedNovels.filter(novel => {
      const genreMatch = selectedGenre === 'all' || novel.genre === selectedGenre;
      const statusMatch = selectedStatus === 'all' || novel.status === selectedStatus;
      return genreMatch && statusMatch;
    });
  }, [selectedGenre, selectedStatus, processedNovels]);

  const sortedNovels = useMemo(() => {
    return [...filteredNovels].sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return b.chapters - a.chapters;
        case 'rating':
          return b.rating - a.rating;
        case 'views':
          return parseViews(b.views) - parseViews(a.views);
        default: // popular
          return parseViews(b.views) - parseViews(a.views);
      }
    });
  }, [filteredNovels, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Tiểu thuyết</h1>
          <p className="text-gray-600 dark:text-gray-400">Khám phá thế giới tiểu thuyết phong phú với hàng nghìn tác phẩm hấp dẫn</p>
        </div>

        {/* Bộ lọc và sắp xếp */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Thể loại</label>
              <select 
                value={selectedGenre} 
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 pr-8"
              >
                {genres.map(genre => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Tình trạng</label>
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 pr-8"
              >
                <option value="all">Tất cả</option>
                <option value="Đang cập nhật">Đang cập nhật</option>
                <option value="Hoàn thành">Hoàn thành</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">Sắp xếp</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 pr-8"
              >
                <option value="popular">Phổ biến</option>
                <option value="latest">Mới nhất</option>
                <option value="rating">Đánh giá cao</option>
                <option value="views">Lượt đọc</option>
              </select>
            </div>
          </div>
        </div>

        {/* Danh sách tiểu thuyết */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedNovels.map((novel) => (
            <div key={novel.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
              <div className="flex">
                <div className="w-32 flex-shrink-0">
                  <img 
                    src={novel.coverUrl}
                    alt={novel.title}
                    className="w-full h-48 object-cover object-top rounded-l-lg"
                  />
                </div>
                
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/novel/${novel.id}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 line-clamp-1">{novel.title}</h3>
                    </Link>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ml-2 whitespace-nowrap ${
                      novel.status === 'Đang cập nhật' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                    }`}>
                      {novel.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Tác giả: {novel.author}</p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">{novel.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{novel.chapters} chương</span>
                      <span>{novel.views} lượt đọc</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <i key={i} className={`ri-star-${i < Math.floor(novel.rating) ? 'fill' : 'line'} text-sm`}></i>
                        ))}
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">{novel.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-500 dark:text-gray-500 text-xs mb-3">Cập nhật: {novel.lastUpdate}</p>
                  
                  <Link to={`/novel/${novel.id}`} className="block">
                    <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors whitespace-nowrap cursor-pointer">
                      Đọc ngay
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Thông báo khi không có truyện */}
        {sortedNovels.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full mx-auto mb-4">
              <i className="ri-book-line text-2xl text-gray-400 dark:text-gray-500"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Không tìm thấy tiểu thuyết</h3>
            <p className="text-gray-600 dark:text-gray-400">Thử thay đổi bộ lọc để tìm kiếm tác phẩm khác</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}