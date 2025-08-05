// src/components/RankingSection.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { novelRankings, comicRankings } from '../mockData';

type RankingType = 'popular' | 'rating' | 'latest';
type ActiveTab = 'novels' | 'comics';

interface RankingItem {
  id: number;
  title: string;
  author: string;
  views: string;
  rating: number;
  trend: 'up' | 'down' | 'stable' | 'new';
  chapters: number;
  genre: string;
}

export default function RankingSection() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('novels');
  const [rankingType, setRankingType] = useState<RankingType>('popular');

  const currentRankings = activeTab === 'novels' ? novelRankings : comicRankings;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return 'ri-arrow-up-line text-green-500';
      case 'down': return 'ri-arrow-down-line text-red-500';
      case 'new': return 'ri-sparkling-fill text-yellow-500';
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
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Bảng xếp hạng</h2>
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
            <div className="flex space-x-4 mb-6 flex-wrap">
              <button
                onClick={() => setRankingType('popular')}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap cursor-pointer transition-colors text-sm ${
                  rankingType === 'popular'
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Phổ biến nhất
              </button>
              <button
                onClick={() => setRankingType('rating')}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap cursor-pointer transition-colors text-sm ${
                  rankingType === 'rating'
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Đánh giá cao
              </button>
              <button
                onClick={() => setRankingType('latest')}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap cursor-pointer transition-colors text-sm ${
                  rankingType === 'latest'
                    ? 'bg-blue-600 dark:bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Mới nhất
              </button>
            </div>

            <div className="space-y-4">
              {currentRankings[rankingType as keyof typeof currentRankings].map((item, index) => (
                <Link key={item.id} to={`/${activeTab === 'novels' ? 'novel' : 'comic'}/${item.id}`}>
                  <div className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
                    <div className={`w-8 h-8 flex items-center justify-center font-bold text-xl ${getRankingColor(index)} mr-4`}>
                      {index < 3 ? (
                        <i className={`ri-medal-fill`}></i>
                      ) : (
                        index + 1
                      )}
                    </div>

                    <div className="w-16 h-20 flex-shrink-0 mr-4 hidden sm:block">
                      <img
                        src={`https://readdy.ai/api/search-image?query=${activeTab === 'novels' ? 'Vietnamese novel' : 'manga manhwa comic'} book cover design for ${item.title}, elegant typography, modern minimalist aesthetic, professional cover art, vibrant colors&width=64&height=80&seq=ranking-${activeTab}-${item.id}&orientation=portrait`}
                        alt={item.title}
                        className="w-full h-full object-cover object-top rounded"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mr-2 line-clamp-1">{item.title}</h3>
                        <i className={`${getTrendIcon(item.trend)} text-sm`}></i>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">Tác giả: {item.author}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{item.chapters} chương</span>
                        <span className="text-xl leading-none">•</span>
                        <span>{item.views} lượt {activeTab === 'novels' ? 'đọc' : 'xem'}</span>
                        <span className="text-xl leading-none">•</span>
                        <div className="flex items-center">
                          <i className="ri-star-fill text-yellow-400 mr-1"></i>
                          <span>{item.rating}</span>
                        </div>
                      </div>
                    </div>

                    <i className="ri-arrow-right-line text-gray-400 dark:text-gray-500 ml-4"></i>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}