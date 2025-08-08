// src/components/admin-dashboard/AdminTopStories.tsx
import React from 'react';
import { TopStory } from '../../api/adminDashboard.api';

interface AdminTopStoriesProps {
    stories: TopStory[];
}

export default function AdminTopStories({ stories }: AdminTopStoriesProps) {
    const formatNumber = (num: number | undefined) => {
        if (num === undefined || num === null) return 'N/A';
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toLocaleString();
    };

    const statusColors = (status: string) => {
        switch (status) {
            case 'dang_tien_hanh': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
            case 'hoan_thanh': return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
            default: return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
        }
    };
    
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Truyện phổ biến nhất</h3>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium whitespace-nowrap">
                    Xem chi tiết
                </button>
            </div>
            <div className="space-y-4">
                {stories.length > 0 ? (
                    stories.map((story, index) => (
                        <div key={story.id_truyen} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <div className="w-12 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold text-lg">{index + 1}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">{story.ten_truyen}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Tác giả: {story.tac_gia}</p>
                                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center">
                                        <i className="ri-eye-line mr-1"></i>
                                        {formatNumber(story.luot_xem)} lượt xem
                                    </span>
                                    <span className="flex items-center">
                                        <i className="ri-star-fill text-yellow-400 mr-1"></i>
                                        {story.rating?.toFixed(1) || '0.0'}
                                    </span>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusColors(story.trang_thai_viet)}`}>
                                {story.trang_thai_viet === 'dang_tien_hanh' ? 'Đang ra' : 'Hoàn thành'}
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400">Không có truyện nào.</div>
                )}
            </div>
        </div>
    );
}