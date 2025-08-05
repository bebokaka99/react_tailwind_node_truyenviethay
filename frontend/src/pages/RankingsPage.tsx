// src/pages/RankingsPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { novelRankings, comicRankings } from '../mockDataRankings';

export default function RankingsPage() {
  const [activeTab, setActiveTab] = useState('novels');
  const [rankingType, setRankingType] = useState('popular');

  const currentRankings = activeTab === 'novels' ? novelRankings : comicRankings;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return 'ri-arrow-up-line text-green-500';
      case 'down': return 'ri-arrow-down-line text-red-500';
      case 'new': return 'ri-star-line text-yellow-500';
      default: return 'ri-subtract-line text-gray-400';
    }
  };

  const getRankingColor = (index: number) => {
    if (index === 0) return 'text-yellow-500'; // Gold
    if (index === 1) return 'text-gray-400'; // Silver
    if (index === 2) return 'text-orange-600'; // Bronze
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Bảng xếp hạng</h1>
          <p className="text-gray-600 dark:text-gray-400">Khám phá những tác phẩm được yêu thích và đánh giá cao nhất</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              <button 
                onClick={() => setActiveTab('novels')}
                className={`px-6 py-4 font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'novels'
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Tiểu thuyết
              </button>
              <button 
                onClick={() => setActiveTab('comics')}
                className={`px-6 py-4 font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  activeTab === 'comics'
                    ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                Truyện tranh
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-wrap gap-4 mb-6">
              <button 
                onClick={() => setRankingType('popular')}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  rankingType === 'popular'
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Phổ biến nhất
              </button>
              <button 
                onClick={() => setRankingType('rating')}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  rankingType === 'rating'
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Đánh giá cao
              </button>
              <button 
                onClick={() => setRankingType('latest')}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                  rankingType === 'latest'
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Mới nhất
              </button>
            </div>

            <div className="space-y-4">
              {currentRankings[rankingType].map((item, index) => (
                <Link key={item.id} to={`/${activeTab === 'novels' ? 'novel' : 'comic'}/${item.id}`}>
                  <div className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
                    <div className={`w-12 h-12 flex items-center justify-center font-bold text-2xl ${getRankingColor(index)} mr-4`}>
                      {index < 3 ? (
                        <i className={`ri-medal-${index === 0 ? 'fill' : 'line'}`}></i>
                      ) : (
                        index + 1
                      )}
                    </div>
                    
                    <div className="w-16 h-20 flex-shrink-0 mr-4">
                      <img 
                        src={`https://readdy.ai/api/search-image?query=${activeTab === 'novels' ? 'Vietnamese novel' : 'manga manhwa comic'} book cover design for ${item.title}, elegant typography, modern minimalist aesthetic, professional cover art, vibrant colors&width=64&height=80&seq=ranking-${activeTab}-${item.id}&orientation=portrait`}
                        alt={item.title}
                        className="w-full h-full object-cover object-top rounded"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mr-2">{item.title}</h3>
                        <i className={getTrendIcon(item.trend)}></i>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Tác giả: {item.author}</p>
                      <div className="flex flex-wrap items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{item.chapters} chương</span>
                        <span>{item.views} lượt {activeTab === 'novels' ? 'đọc' : 'xem'}</span>
                        <div className="flex items-center">
                          <i className="ri-star-fill text-yellow-400 mr-1"></i>
                          <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <i className="ri-arrow-right-line text-gray-400 dark:text-gray-500"></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-full mr-3">
                <i className="ri-fire-line text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Xu hướng HOT</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Những tác phẩm đang được bàn luận nhiều nhất và có lượng đọc tăng mạnh trong tuần này.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mr-3">
                <i className="ri-star-line text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Chất lượng cao</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Được độc giả đánh giá cao về nội dung, cốt truyện và cách viết. Đảm bảo chất lượng đọc tốt nhất.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mr-3">
                <i className="ri-rocket-line text-xl"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">Mới & Thịnh hành</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Tác phẩm mới xuất bản và nhanh chóng thu hút sự chú ý của cộng đồng độc giả.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}