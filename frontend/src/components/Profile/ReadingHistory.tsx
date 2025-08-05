// src/components/Profile/ReadingHistory.tsx

import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ReadingHistory() {
    const [activeTab, setActiveTab] = useState('recent');

    const recentHistory = [
        {
            id: 1,
            title: "Kiếm Hiệp Giang Hồ",
            chapter: "Chương 245: Đại chiến cuối cùng",
            type: "novel",
            readTime: "30 phút trước"
        },
        {
            id: 2,
            title: "Hoàng Tử Bóng Tối",
            chapter: "Chương 85: Thức tỉnh sức mạnh",
            type: "comic",
            readTime: "2 giờ trước"
        },
        {
            id: 3,
            title: "Đô Thị Tu Tiên",
            chapter: "Chương 320: Phá vỡ giới hạn",
            type: "novel",
            readTime: "1 ngày trước"
        },
        {
            id: 4,
            title: "Nữ Hoàng Băng Giá",
            chapter: "Chương 120: Hồi kết",
            type: "comic",
            readTime: "2 ngày trước"
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Lịch sử đọc</h2>
                <div className="flex bg-gray-100 dark:bg-gray-700 rounded-full p-1">
                    <button
                        onClick={() => setActiveTab('recent')}
                        className={`px-4 py-2 text-sm rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                            activeTab === 'recent'
                                ? 'bg-blue-600 dark:bg-blue-500 text-white'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                    >
                        Gần đây
                    </button>
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`px-4 py-2 text-sm rounded-full whitespace-nowrap cursor-pointer transition-colors ${
                            activeTab === 'all'
                                ? 'bg-blue-600 dark:bg-blue-500 text-white'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                        }`}
                    >
                        Tất cả
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {recentHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{item.chapter}</p>
                            <p className="text-gray-500 dark:text-gray-500 text-xs">{item.readTime}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                item.type === 'novel'
                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                            }`}>
                                {item.type === 'novel' ? 'Tiểu thuyết' : 'Truyện tranh'}
                            </span>
                            <Link to={`/${item.type}/${item.id}/read`} className="cursor-pointer">
                                <button className="w-8 h-8 flex items-center justify-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
                                    <i className="ri-play-line"></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}