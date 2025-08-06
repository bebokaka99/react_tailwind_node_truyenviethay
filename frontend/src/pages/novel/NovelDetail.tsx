// src/pages/novel/NovelDetail.tsx
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChapterList from '../../components/novel/ChapterList';
import ReviewSection from '../../components/novel/ReviewSection';

interface StoryData {
  id: number;
  ten_truyen: string;
  slug: string;
  tac_gia: string;
  mo_ta: string;
  trang_thai: string;
  anh_bia: string;
  luot_xem: number;
  thoi_gian_cap_nhat: string;
  // Thêm các trường khác nếu có
}

export default function NovelDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [novelData, setNovelData] = useState<StoryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('chapters');
  const [isFavorited, setIsFavorited] = useState(false);
  const backendUrl = "http://localhost:3000";

  useEffect(() => {
    if (!slug) {
      setError("Không tìm thấy slug truyện");
      setLoading(false);
      return;
    }

    const fetchNovelDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${backendUrl}/api/truyen/slug/${slug}`);
        if (!response.ok) {
          throw new Error('Không thể lấy dữ liệu truyện');
        }
        const data = await response.json();
        setNovelData(data);
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

    fetchNovelDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Đang tải...</p>
      </div>
    );
  }

  if (error || !novelData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-red-500 dark:text-red-400 mb-4">404 - Không tìm thấy truyện</h1>
          <p className="text-gray-600 dark:text-gray-400">{error || "Tiểu thuyết bạn đang tìm kiếm không tồn tại."}</p>
          <Link to="/" className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Quay lại trang chủ
          </Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  const coverImageUrl = novelData.anh_bia ? `${backendUrl}/uploads_img/bia_truyen/${novelData.anh_bia}` : 'fallback_image_url.jpg';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <div className="container mx-auto px-6 py-8">
        {/* Phần thông tin chi tiết truyện */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors">
          <div className="md:flex">
            <div className="md:w-80 md:flex-shrink-0">
              <img 
                src={coverImageUrl}
                alt={novelData.ten_truyen}
                className="w-full h-96 md:h-full object-cover object-top"
              />
            </div>
            
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{novelData.ten_truyen}</h1>
                <button 
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                    isFavorited 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 hover:text-red-500'
                  }`}
                >
                  <i className={`ri-heart-${isFavorited ? 'fill' : 'line'} text-xl`}></i>
                </button>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">Tác giả: {novelData.tac_gia}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                 <span className={`px-3 py-1 rounded-full text-sm ${
                  novelData.trang_thai === 'Đang cập nhật' 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                  : 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                  }`}>
                  {novelData.trang_thai}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">?</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Chương</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{novelData.luot_xem}</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Lượt đọc</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">?</div>
                  <div className="flex justify-center text-yellow-400 text-sm">
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{novelData.mo_ta}</p>
              
              <div className="flex space-x-4">
                <Link to={`/novel/${novelData.id}/read`} className="flex-1">
                  <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-semibold whitespace-nowrap cursor-pointer">
                    Bắt đầu đọc
                  </button>
                </Link>
              </div>
              
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
                Cập nhật lần cuối: {new Date(novelData.thoi_gian_cap_nhat).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button 
              onClick={() => setActiveTab('chapters')}
              className={`px-6 py-3 font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'chapters'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Danh sách chương
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === 'reviews'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Đánh giá & Bình luận
            </button>
          </div>
          {activeTab === 'chapters' && <ChapterList novelId={String(novelData.id)} />}
          {activeTab === 'reviews' && <ReviewSection novelId={String(novelData.id)} />}
        </div>
      </div>
      <Footer />
    </div>
  );
}