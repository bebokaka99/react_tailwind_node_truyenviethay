// src/components/StorySection.tsx

import React from 'react';
import { Link } from 'react-router-dom';

interface Story {
  id: number;
  title: string;
  author: string;
  chapters: number;
  views: string;
  rating: number;
  status: string;
  genre: string;
  type: 'novel' | 'comic';
}

interface StorySectionProps {
  title: string;
  description: string;
  stories: Story[];
  linkTo: string;
}

export default function StorySection({ title, description, stories, linkTo }: StorySectionProps) {
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
                  src={`https://readdy.ai/api/search-image?query=${story.type === 'novel' ? 'Vietnamese novel book cover' : 'manga manhwa comic cover'} for ${story.title} genre ${story.genre}, elegant typography, professional cover art, vibrant colors, clean simple background&width=300&height=400&seq=story${story.id}&orientation=portrait`}
                  alt={story.title}
                  className="w-full h-64 object-cover object-top rounded-t-lg"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    story.status === 'Đang cập nhật'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                  }`}>
                    {story.status}
                  </span>
                </div>
                {story.type === 'comic' && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-red-500 dark:bg-red-600 text-white px-2 py-1 text-xs font-semibold rounded-full">
                      HOT
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2 line-clamp-1">{story.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Tác giả: {story.author}</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mb-3">{story.chapters} chương • {story.views} lượt {story.type === 'novel' ? 'đọc' : 'xem'}</p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`ri-star-${i < Math.floor(story.rating) ? 'fill' : 'line'} text-sm`}></i>
                      ))}
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm ml-1">{story.rating}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    story.type === 'novel'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                  }`}>
                    {story.genre}
                  </span>
                </div>

                <Link to={`/${story.type}/${story.id}`} className="block mt-4">
                  <button className={`w-full text-white py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    story.type === 'novel'
                      ? 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
                      : 'bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600'
                  }`}>
                    {story.type === 'novel' ? 'Đọc ngay' : 'Xem ngay'}
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