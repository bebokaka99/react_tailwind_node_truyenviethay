// src/components/novel/ChapterList.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Chapter {
  id: number;
  tieu_de: string;
  so_chuong: number;
  slug: string;
  thoi_gian_tao: string;
  // Thêm các trường khác nếu có
}

interface ChapterListProps {
  novelId: string;
}

export default function ChapterList({ novelId }: ChapterListProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const backendUrl = "http://localhost:3000";

  useEffect(() => {
    const novelIdNum = parseInt(novelId, 10);
    if (isNaN(novelIdNum)) {
      setError("ID truyện không hợp lệ");
      setLoading(false);
      return;
    }

    const fetchChapters = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${backendUrl}/api/chuong/truyen/${novelIdNum}`);
        if (!response.ok) {
          throw new Error('Không thể lấy danh sách chương');
        }
        const data = await response.json();
        setChapters(data.chapters);
      } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("Lỗi không xác định");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, [novelId]);

  const sortedChapters = [...chapters].sort((a, b) =>
    sortOrder === 'asc' ? a.so_chuong - b.so_chuong : b.so_chuong - a.so_chuong
  );

  if (loading) {
    return <div className="text-center p-6 text-gray-500 dark:text-gray-400">Đang tải danh sách chương...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500 dark:text-red-400">Lỗi: {error}</div>;
  }

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
          <Link key={chapter.id} to={`/novel/${novelId}/read?chapter=${chapter.so_chuong}`} className="block">
            <div className={`flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer`}>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-800 dark:text-gray-100">Chương {chapter.so_chuong}: {chapter.tieu_de}</h3>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>Ngày đăng: {new Date(chapter.thoi_gian_tao).toLocaleDateString()}</span>
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