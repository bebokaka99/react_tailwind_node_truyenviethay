// src/components/settings/ReadingPreferences.tsx
'use client';

import { useState } from 'react';

export default function ReadingPreferences() {
  const [preferences, setPreferences] = useState({
    fontSize: 16,
    lineHeight: 1.6,
    fontFamily: 'system-ui',
    theme: 'light',
    autoBookmark: true,
    readingMode: 'scroll',
    chapterTransition: 'fade',
    favoriteGenres: ['tienhiep', 'huyenhuyen', 'ngontinh'],
    matureContent: false,
    autoPlay: true,
    soundEffects: false
  });

  const handleSliderChange = (key: string, value: number) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleToggle = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSelectChange = (key: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const genreOptions = [
    { id: 'tienhiep', name: 'Tiên Hiệp' },
    { id: 'huyenhuyen', name: 'Huyền Huyễn' },
    { id: 'ngontinh', name: 'Ngôn Tình' },
    { id: 'kinhdi', name: 'Kinh Dị' },
    { id: 'hoihop', name: 'Hồi Hộp' },
    { id: 'lichsu', name: 'Lịch Sử' },
    { id: 'quansu', name: 'Quân Sự' },
    { id: 'dothi', name: 'Đô Thị' }
  ];

  const handleGenreToggle = (genreId: string) => {
    const newGenres = preferences.favoriteGenres.includes(genreId)
      ? preferences.favoriteGenres.filter(g => g !== genreId)
      : [...preferences.favoriteGenres, genreId];
    setPreferences(prev => ({ ...prev, favoriteGenres: newGenres }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <i className="ri-book-line text-green-600"></i>
          Tùy Chỉnh Đọc Truyện
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Cá nhân hóa trải nghiệm đọc truyện của bạn</p>
      </div>

      <div className="p-6 space-y-8">
        {/* Reading Display Settings */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <i className="ri-text text-blue-600"></i>
            Hiển Thị Văn Bản
          </h4>
          <div className="space-y-6">
            {/* Font Size */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Kích thước chữ</label>
                <span className="text-sm text-gray-600 dark:text-gray-400">{preferences.fontSize}px</span>
              </div>
              <input
                type="range"
                min="12"
                max="24"
                value={preferences.fontSize}
                onChange={(e) => handleSliderChange('fontSize', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Nhỏ</span>
                <span>Vừa</span>
                <span>Lớn</span>
              </div>
            </div>

            {/* Line Height */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Khoảng cách dòng</label>
                <span className="text-sm text-gray-600 dark:text-gray-400">{preferences.lineHeight}</span>
              </div>
              <input
                type="range"
                min="1.2"
                max="2.0"
                step="0.1"
                value={preferences.lineHeight}
                onChange={(e) => handleSliderChange('lineHeight', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg cursor-pointer accent-blue-600"
              />
            </div>

            {/* Font Family */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Font chữ</label>
              <select
                value={preferences.fontFamily}
                onChange={(e) => handleSelectChange('fontFamily', e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="system-ui">Mặc định hệ thống</option>
                <option value="serif">Serif (Times)</option>
                <option value="sans-serif">Sans-serif (Arial)</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>
          </div>
        </div>

        {/* Theme Settings */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <i className="ri-palette-line text-purple-600"></i>
            Giao Diện
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleSelectChange('theme', 'light')}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                preferences.theme === 'light'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              } cursor-pointer`}
            >
              <i className="ri-sun-line text-2xl text-yellow-500 mb-2 block"></i>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Sáng</span>
            </button>
            <button
              onClick={() => handleSelectChange('theme', 'dark')}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                preferences.theme === 'dark'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              } cursor-pointer`}
            >
              <i className="ri-moon-line text-2xl text-blue-600 mb-2 block"></i>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Tối</span>
            </button>
            <button
              onClick={() => handleSelectChange('theme', 'sepia')}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                preferences.theme === 'sepia'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              } cursor-pointer`}
            >
              <i className="ri-book-open-line text-2xl text-amber-600 mb-2 block"></i>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Sepia</span>
            </button>
          </div>
        </div>

        {/* Reading Behavior */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <i className="ri-settings-3-line text-indigo-600"></i>
            Hành Vi Đọc
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Tự động đánh dấu trang</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Lưu vị trí đọc khi thoát</p>
              </div>
              <button
                onClick={() => handleToggle('autoBookmark')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  preferences.autoBookmark ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    preferences.autoBookmark ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Hiển thị nội dung người lớn</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bao gồm truyện có nội dung 18+</p>
              </div>
              <button
                onClick={() => handleToggle('matureContent')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                  preferences.matureContent ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'
                } cursor-pointer`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    preferences.matureContent ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Favorite Genres */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <i className="ri-heart-line text-pink-600"></i>
            Thể Loại Yêu Thích
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Chọn thể loại để nhận gợi ý phù hợp</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {genreOptions.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreToggle(genre.id)}
                className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                  preferences.favoriteGenres.includes(genre.id)
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-950 text-pink-700 dark:text-pink-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
                } cursor-pointer whitespace-nowrap`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors duration-200">
            <i className="ri-save-line"></i>
            Lưu Tùy Chọn
          </button>
        </div>
      </div>
    </div>
  );
}