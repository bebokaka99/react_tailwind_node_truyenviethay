// src/components/novel/ChapterList.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getNovelChapters } from '../../mockData';

interface ChapterListProps {
  novelId: string;
}

export default function ChapterList({ novelId }: ChapterListProps) {
  const [sortOrder, setSortOrder] = useState('asc');
  const novelIdNum = parseInt(novelId, 10);
  
  const chapters = getNovelChapters(novelIdNum);

  const sortedChapters = [...chapters].sort((a, b) =>
    sortOrder === 'asc' ? a.id - b.id : b.id - a.id
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Danh sách chương</h2>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
        >
          <i className={`ri-sort-${sortOrder === 'asc' ? 'asc' : 'desc'}-line text-xl`}></i>
          <span>Sắp xếp</span>
        </button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar pr-2">
        {sortedChapters.map((chapter) => (
          <Link key={chapter.id} to={`/novel/${novelId}/read?chapter=${chapter.id}`} className="block">
            <div className={`flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer ${
              chapter.isRead ? 'opacity-70' : ''
            }`}>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-800 dark:text-gray-100">{chapter.title}</h3>
                  {chapter.isNew && (
                    <span className="bg-red-500 dark:bg-red-600 text-white text-xs px-2 py-1 rounded-full">MỚI</span>
                  )}
                  {chapter.isRead && (
                    <i className="ri-check-line text-green-500 dark:text-green-400"></i>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>{chapter.wordCount.toLocaleString()} từ</span>
                  <span>{chapter.publishDate}</span>
                </div>
              </div>
              <i className="ri-arrow-right-line text-gray-400 dark:text-gray-500"></i>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}