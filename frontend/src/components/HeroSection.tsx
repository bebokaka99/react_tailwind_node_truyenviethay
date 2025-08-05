import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section
      className="relative bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white py-20 overflow-hidden"
      style={{
        backgroundImage: 'url(/images/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="absolute inset-0 bg-blue-900/40 dark:bg-gray-900/60"></div>
      <div className="relative container mx-auto px-6">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Khám phá thế giới <span className="text-yellow-300 dark:text-yellow-400">Truyện</span> không giới hạn
          </h1>
          <p className="text-xl mb-8 text-blue-100 dark:text-gray-200">
            Hàng ngàn tiểu thuyết và truyện tranh miễn phí, cập nhật hàng ngày.
            Trải nghiệm đọc hiện đại cho độc giả Việt Nam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/novels" className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-center whitespace-nowrap cursor-pointer">
              Đọc tiểu thuyết
            </Link>
            <Link to="/comics" className="border-2 border-white dark:border-gray-300 text-white dark:text-gray-200 px-8 py-4 rounded-full font-semibold hover:bg-white dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-center whitespace-nowrap cursor-pointer">
              Xem truyện tranh
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;