// src/components/profile/FavoritesList.tsx
import React from 'react';
import { RiStarFill, RiMore2Line } from 'react-icons/ri';

interface FavoriteStory {
  id: string;
  ten_truyen: string;
  tac_gia: string;
  anh_bia: string;
  rating: number;
  tong_so_chuong: number;
  trang_thai: string;
  id_theloai: string;
}

interface FavoritesListProps {
  favoriteStories: FavoriteStory[];
}

export default function FavoritesList({ favoriteStories }: FavoritesListProps) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-4">
        {favoriteStories.length > 0 ? (
          favoriteStories.map((story) => (
            <div key={story.id} className="group cursor-pointer">
              <div className="flex items-center gap-4 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <div className="relative flex-shrink-0">
                  <img
                    src={story.anh_bia}
                    alt={story.ten_truyen}
                    className="w-12 h-16 object-cover rounded shadow-md group-hover:shadow-lg transition-shadow"
                  />
                  <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1">
                    <RiStarFill className="text-xs" />
                    {story.rating}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {story.ten_truyen}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">{story.tac_gia}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded-full">{story.id_theloai}</span>
                    <span>•</span>
                    <span>{story.tong_so_chuong} chương</span>
                    <span>•</span>
                    <span className={story.trang_thai === 'Hoàn thành' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}>
                      {story.trang_thai}
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <button className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 transition-colors cursor-pointer">
                    <RiMore2Line />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            Chưa có truyện nào trong danh sách yêu thích.
          </div>
        )}
      </div>
    </div>
  );
}