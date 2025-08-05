// src/pages/LibraryPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { savedNovels, savedComics } from '../mockDataLibrary';

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Thư viện của bạn</h1>
          <p className="text-gray-600 dark:text-gray-400">Tiếp tục đọc các tác phẩm bạn đã lưu và yêu thích</p>
        </div>

        {/* Phần Tiểu thuyết đã lưu */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Tiểu thuyết đã lưu</h2>
            <Link to="/novels" className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline">
              Khám phá thêm
            </Link>
          </div>
          {savedNovels.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {savedNovels.map((novel) => (
                <Link key={novel.id} to={`/novel/${novel.id}`} className="block group">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
                    <img 
                      src={novel.imageUrl} 
                      alt={novel.title} 
                      className="w-full h-auto rounded-t-lg object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-lg mb-1">{novel.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{novel.author}</p>
                      <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">{novel.progress}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <p className="text-gray-600 dark:text-gray-400">Bạn chưa lưu tiểu thuyết nào. Hãy khám phá và thêm vào thư viện của mình!</p>
            </div>
          )}
        </div>

        {/* Phần Truyện tranh đã lưu */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Truyện tranh đã lưu</h2>
            <Link to="/comics" className="text-purple-600 dark:text-purple-400 font-semibold text-sm hover:underline">
              Khám phá thêm
            </Link>
          </div>
          {savedComics.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {savedComics.map((comic) => (
                <Link key={comic.id} to={`/comic/${comic.id}`} className="block group">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
                    <img 
                      src={comic.imageUrl} 
                      alt={comic.title} 
                      className="w-full h-auto rounded-t-lg object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-lg mb-1">{comic.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{comic.author}</p>
                      <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">{comic.progress}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <p className="text-gray-600 dark:text-gray-400">Bạn chưa lưu truyện tranh nào. Hãy khám phá và thêm vào thư viện của mình!</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}