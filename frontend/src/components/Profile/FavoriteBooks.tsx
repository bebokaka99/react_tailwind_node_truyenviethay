// src/components/Profile/FavoriteBooks.tsx

import { Link } from 'react-router-dom';

export default function FavoriteBooks() {
    const favoriteBooks = [
        {
            id: 1,
            title: "Kiếm Hiệp Giang Hồ",
            author: "Nguyễn Văn A",
            type: "novel",
            progress: 85,
            lastRead: "2 giờ trước"
        },
        {
            id: 2,
            title: "Hoàng Tử Bóng Tối",
            author: "Kim Min-jun",
            type: "comic",
            progress: 92,
            lastRead: "1 ngày trước"
        },
        {
            id: 3,
            title: "Ma Pháp Học Viện",
            author: "Trần Thị B",
            type: "novel",
            progress: 100,
            lastRead: "3 ngày trước"
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Truyện yêu thích</h2>
                <Link to="/favorites" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm cursor-pointer">
                    Xem tất cả
                </Link>
            </div>

            <div className="space-y-4">
                {favoriteBooks.map((book) => (
                    <div key={book.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <img
                            src={`https://readdy.ai/api/search-image?query=${book.type === 'novel' ? 'Vietnamese novel book cover' : 'manga manhwa comic cover'} for ${book.title}, elegant design, professional cover art, vibrant colors, clean simple background&width=60&height=80&seq=fav${book.id}&orientation=portrait`}
                            alt={book.title}
                            className="w-12 h-16 object-cover object-top rounded"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">{book.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{book.author}</p>
                            <p className="text-gray-500 dark:text-gray-500 text-xs">{book.lastRead}</p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{book.progress}%</div>
                            <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-1">
                                <div
                                    className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
                                    style={{ width: `${book.progress}%` }}
                                ></div>
                            </div>
                        </div>
                        <Link to={`/${book.type}/${book.id}`} className="cursor-pointer">
                            <button className="w-8 h-8 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <i className="ri-arrow-right-line"></i>
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}