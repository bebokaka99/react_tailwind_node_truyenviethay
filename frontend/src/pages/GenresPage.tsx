// src/pages/GenresPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { novelGenres, comicGenres } from '../mockDataGenres';

export default function GenresPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Thể loại</h1>
          <p className="text-gray-600 dark:text-gray-400">Khám phá các thể loại truyện phong phú để tìm những tác phẩm phù hợp với sở thích</p>
        </div>

        {/* Danh sách thể loại Tiểu thuyết */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Tiểu thuyết</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {novelGenres.map((genre) => (
              <Link key={genre.id} to={`/novels?genre=${genre.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 cursor-pointer group">
                  <div className={`${genre.color} rounded-t-lg p-6 text-white`}>
                    <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg mb-4">
                      <i className={`${genre.icon} text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{genre.name}</h3>
                    <p className="text-white/90 text-sm">{genre.description}</p>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{genre.count.toLocaleString()} tác phẩm</span>
                      <i className="ri-arrow-right-line text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Danh sách thể loại Truyện tranh */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Truyện tranh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {comicGenres.map((genre) => (
              <Link key={genre.id} to={`/comics?genre=${genre.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 cursor-pointer group">
                  <div className={`${genre.color} rounded-t-lg p-6 text-white`}>
                    <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg mb-4">
                      <i className={`${genre.icon} text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{genre.name}</h3>
                    <p className="text-white/90 text-sm">{genre.description}</p>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{genre.count.toLocaleString()} tác phẩm</span>
                      <i className="ri-arrow-right-line text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-colors">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Gợi ý cho bạn</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Không biết bắt đầu từ đâu? Hãy thử những thể loại phổ biến nhất hoặc khám phá những thể loại mới để mở rộng sở thích đọc truyện của bạn.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mx-auto mb-4">
                <i className="ri-fire-line text-2xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Thể loại HOT</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Khám phá những thể loại được yêu thích nhất hiện tại</p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mx-auto mb-4">
                <i className="ri-star-line text-2xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Đánh giá cao</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Những thể loại có tác phẩm được đánh giá tốt nhất</p>
            </div>
            
            <div className="text-center p-6 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full mx-auto mb-4">
                <i className="ri-compass-3-line text-2xl"></i>
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Khám phá mới</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Thử những thể loại mới để tìm sở thích đọc truyện</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}