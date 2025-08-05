// src/pages/novel/NovelDetail.tsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChapterList from '../../components/novel/ChapterList';
import ReviewSection from '../../components/novel/ReviewSection';
import { getNovelById } from '../../mockData';

export default function NovelDetail() {
  const { id } = useParams<{ id: string }>();
  const novelId = id ? parseInt(id, 10) : 1;
  const [activeTab, setActiveTab] = useState('chapters');
  const [isFavorited, setIsFavorited] = useState(false);
  
  const novelData = getNovelById(novelId);

  // Nếu không tìm thấy truyện, có thể chuyển hướng hoặc hiển thị trang lỗi
  if (!novelData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-red-500 dark:text-red-400 mb-4">404 - Không tìm thấy truyện</h1>
          <p className="text-gray-600 dark:text-gray-400">Tiểu thuyết bạn đang tìm kiếm không tồn tại.</p>
          <Link to="/" className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Quay lại trang chủ
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        {/* Phần thông tin chi tiết truyện */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
          <div className="md:flex">
            <div className="md:w-80 md:flex-shrink-0">
              <img 
                src={novelData.coverUrl}
                alt={novelData.title}
                className="w-full h-96 md:h-full object-cover object-top"
              />
            </div>
            
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{novelData.title}</h1>
                <button 
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                    isFavorited 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-red-500'
                  }`}
                >
                  <i className={`ri-heart-${isFavorited ? 'fill' : 'line'} text-xl`}></i>
                </button>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">Tác giả: {novelData.author}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {novelData.genres.map((genre, index) => (
                  <span key={index} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
                <span className={`px-3 py-1 rounded-full text-sm ${
                  novelData.status === 'Đang cập nhật' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                }`}>
                  {novelData.status}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{novelData.chapters}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Chương</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{novelData.views}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Lượt đọc</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{novelData.rating}</div>
                  <div className="flex justify-center text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`ri-star-${i < Math.floor(novelData.rating) ? 'fill' : 'line'}`}></i>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{novelData.description}</p>
              
              <div className="flex space-x-4">
                <Link to={`/novel/${novelId}/read`} className="flex-1">
                  <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-semibold whitespace-nowrap cursor-pointer">
                    Bắt đầu đọc
                  </button>
                </Link>
                <Link to={`/novel/${novelId}/read?chapter=latest`}>
                  <button className="bg-green-600 dark:bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors font-semibold whitespace-nowrap cursor-pointer">
                    Đọc mới nhất
                  </button>
                </Link>
              </div>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">Cập nhật lần cuối: {novelData.lastUpdate}</p>
            </div>
          </div>
        </div>

        {/* Phần tab Danh sách chương và Đánh giá */}
        <div className="mt-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button 
              onClick={() => setActiveTab('chapters')}
              className={`px-6 py-3 font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'chapters'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Danh sách chương
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'reviews'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Đánh giá & Bình luận
            </button>
          </div>

          {activeTab === 'chapters' && <ChapterList novelId={String(novelId)} />}
          {activeTab === 'reviews' && <ReviewSection novelId={String(novelId)} />}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}