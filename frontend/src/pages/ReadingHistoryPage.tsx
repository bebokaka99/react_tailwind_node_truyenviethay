// src/pages/ReadingHistoryPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { readingHistory } from '../mockDataReadingHistory';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function ReadingHistoryPage() {
  const getProgressColor = (lastRead: number, total: number) => {
    const progress = (lastRead / total) * 100;
    if (progress >= 100) return 'bg-green-500';
    if (progress > 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Lịch sử đọc</h1>
          <p className="text-gray-600 dark:text-gray-400">Tiếp tục đọc từ nơi bạn đã dừng lại</p>
        </div>

        {readingHistory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readingHistory.map((item, index) => (
              <Link 
                key={index} 
                to={`/${item.type === 'novel' ? 'novel' : 'comic'}/${item.id}`} 
                className="block group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 p-4 flex space-x-4">
                  <div className="w-24 h-32 flex-shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Tác giả: {item.author}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">
                      Đã đọc đến chương: <span className="font-semibold text-gray-800 dark:text-gray-100">{item.lastReadChapter}</span>
                    </p>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-2">
                      <div 
                        className={`h-1.5 rounded-full ${getProgressColor(item.lastReadChapter, item.totalChapters)}`} 
                        style={{ width: `${(item.lastReadChapter / item.totalChapters) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs italic">
                      Đọc gần nhất: {formatDistanceToNow(new Date(item.lastReadAt), { addSuffix: true, locale: vi })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-600 dark:text-gray-400">Bạn chưa đọc tác phẩm nào gần đây. Hãy bắt đầu đọc một cuốn sách mới!</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}