// src/components/StorySection.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/vi';

// Cài đặt ngôn ngữ tiếng Việt cho moment
moment.locale('vi');

interface Story {
  id: number;
  title: string;
  slug: string; // Thêm thuộc tính slug vào đây
  author: string;
  chapters: number;
  views: string;
  rating: number | string | null;
  status: string;
  genre: string;
  type: 'novel' | 'comic';
  imageUrl: string;
  updated_at: string;
}

interface StorySectionProps {
  title: string;
  description: string;
  stories: Story[];
  linkTo: string;
}

const placeholderImage = 'https://via.placeholder.com/300x400.png?text=No+Image';

export default function StorySection({ title, description, stories, linkTo }: StorySectionProps) {
  const isFeaturedSection = title.includes('nổi bật');
  const isNewSection = title.includes('mới cập nhật');

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          </div>
          <Link to={linkTo} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold cursor-pointer flex items-center">
            Xem tất cả
            <i className="ri-arrow-right-line ml-1"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <div key={story.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
              <div className="relative">
                <img
                  src={
                    story.imageUrl
                      ? `http://localhost:3000/uploads_img/bia_truyen/${story.imageUrl}`
                      : placeholderImage
                  }
                  alt={story.title}
                  className="w-full h-64 object-cover object-top rounded-t-lg"
                />

                {/* Container cho các tag ở phía trên bên trái */}
                {(isFeaturedSection || isNewSection) && (
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {/* Tag "HOT" */}
                    {isFeaturedSection && (
                      <span className="bg-red-500 dark:bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-full blinking-animation">
                        HOT
                      </span>
                    )}

                    {/* Tag thời gian cập nhật */}
                    {isNewSection && story.updated_at && (
                      <span className="bg-red-500 dark:bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-full blinking-animation">
                        {moment(story.updated_at).fromNow()}
                      </span>
                    )}
                  </div>
                )}
                
                {/* Tag trạng thái ở phía trên bên phải */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    story.status && story.status.includes('hoàn thành')
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                  }`}>
                    {story.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2 line-clamp-1">{story.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Tác giả: {story.author}</p>
                
                <p className="text-gray-500 dark:text-gray-500 text-sm mb-3">
                  {story.chapters} chương • {story.views} lượt đọc
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`ri-star-${i < Math.floor(parseFloat(story.rating?.toString() || '0')) ? 'fill' : 'line'} text-sm`}></i>
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">
                      {story.rating ? parseFloat(story.rating.toString()).toFixed(1) : '0.0'}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300`}>
                    {story.genre}
                  </span>
                </div>

                {/* SỬA ĐƯỜNG DẪN TẠI ĐÂY */}
                <Link to={`/${story.type}/${story.slug}`} className="block mt-4">
                  <button className={`w-full text-white py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600`}>
                    Đọc ngay
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}