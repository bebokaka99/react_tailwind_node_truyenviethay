// src/components/Profile/ReadingStats.tsx
'use client';

export default function ReadingStats() {
    const stats = [
        {
            label: 'Đã đọc',
            value: '125',
            icon: 'ri-book-line',
            color: 'bg-blue-500 dark:bg-blue-600'
        },
        {
            label: 'Yêu thích',
            value: '48',
            icon: 'ri-heart-line',
            color: 'bg-red-500 dark:bg-red-600'
        },
        {
            label: 'Đánh giá',
            value: '89',
            icon: 'ri-star-line',
            color: 'bg-yellow-500 dark:bg-yellow-600'
        },
        {
            label: 'Bình luận',
            value: '234',
            icon: 'ri-chat-1-line',
            color: 'bg-green-500 dark:bg-green-600'
        }
    ];

    const readingTime = {
        thisMonth: '45h 30m',
        total: '892h 15m'
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Thống kê đọc</h2>
                <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className={`w-12 h-12 flex items-center justify-center ${stat.color} rounded-full mx-auto mb-2`}>
                                <i className={`${stat.icon} text-white text-xl`}></i>
                            </div>
                            <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Thời gian đọc</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Tháng này</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">{readingTime.thisMonth}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Tổng cộng</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-100">{readingTime.total}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Thành tích</h2>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-yellow-400 dark:bg-yellow-500 rounded-full">
                            <i className="ri-trophy-line text-white text-sm"></i>
                        </div>
                        <div>
                            <div className="font-semibold text-gray-800 dark:text-gray-100">Độc giả tích cực</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Đọc 100+ truyện</div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-500 dark:bg-blue-600 rounded-full">
                            <i className="ri-time-line text-white text-sm"></i>
                        </div>
                        <div>
                            <div className="font-semibold text-gray-800 dark:text-gray-100">Đọc liên tục 30 ngày</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Streak thành công</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}