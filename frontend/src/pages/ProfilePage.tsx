// src/pages/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileInfo from '../components/profile/ProfileInfo';
import StatsCard from '../components/profile/StatsCard';
import ReadingHistory from '../components/profile/ReadingHistory';
import FavoritesList from '../components/profile/FavoritesList';
import AchievementsList from '../components/profile/AchievementsList';
import { RiBookLine, RiHistoryLine, RiHeartFill, RiTrophyLine, RiStarLine } from 'react-icons/ri';

interface UserData {
  id: string;
  username: string;
  full_name: string;
  email: string;
  avatar: string;
  bio: string;
  role: string;
  memberSince: string;
  gender: string;
}

interface StatsData {
  total_points: number;
  current_level_id: number;
}

interface ReadingItem {
  truyen_id: string;
  ten_truyen: string;
  anh_bia: string;
  thoi_gian_doc: string;
  tieu_de_chuong: string;
  so_chuong: number;
  tong_so_chuong: number;
  tac_gia: string;
  progress_percent?: number;
}

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

interface RewardItem {
  user_reward_id: string;
  reward_id: string;
  claimed_at: string;
  name: string;
}

interface ProfileData {
  user: UserData;
  stats: StatsData;
  readingHistory: ReadingItem[];
  favoriteStories: FavoriteStory[];
  rewards: RewardItem[];
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error("Không tìm thấy token. Vui lòng đăng nhập.");
        }

        const response = await fetch('http://localhost:3000/api/user/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Lỗi khi lấy dữ liệu hồ sơ.");
        }

        const result = await response.json();
        setProfileData(result.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 text-white">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 text-red-500 p-4">
      <h1 className="text-xl font-bold mb-4">Lỗi</h1>
      <p>{error}</p>
    </div>;
  }

  if (!profileData) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 text-gray-500">Không có dữ liệu để hiển thị.</div>;
  }

  const { user, stats, readingHistory, favoriteStories, rewards } = profileData;

  const userStats = [
    {
      title: 'Truyện Đã Đọc',
      value: "47",
      icon: "RiBookLine",
      color: "bg-gradient-to-r from-blue-500 to-blue-600"
    },
    {
      title: 'Chương Đã Đọc',
      value: "342",
      icon: "RiHistoryLine",
      color: "bg-gradient-to-r from-green-500 to-green-600"
    },
    {
      title: 'Thời Gian Đọc',
      value: "156h",
      icon: "RiTrophyLine",
      color: "bg-gradient-to-r from-purple-500 to-purple-600"
    },
    {
      title: 'Truyện Yêu Thích',
      value: `${favoriteStories.length}`,
      icon: "RiHeartFill",
      color: "bg-gradient-to-r from-pink-500 to-pink-600"
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header Section */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Left Sidebar - Profile Info */}
            <div className="xl:col-span-1">
              <div className="sticky top-8">
                <ProfileInfo user={user} />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="xl:col-span-3 space-y-8">
              {/* Stats Overview */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {userStats.map((stat, index) => (
                  <StatsCard key={index} {...stat} />
                ))}
              </div>

              {/* Recent Activity & Favorites Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Reading History */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <RiHistoryLine className="text-blue-600" />
                        Lịch Sử Đọc Gần Đây
                      </h2>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm font-medium whitespace-nowrap cursor-pointer">
                        Xem Tất Cả
                      </button>
                    </div>
                  </div>
                  <ReadingHistory history={readingHistory} />
                </div>

                {/* Favorite Stories */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <RiHeartFill className="text-pink-600" />
                        Truyện Yêu Thích
                      </h2>
                      <button className="text-pink-600 dark:text-pink-400 hover:text-pink-800 dark:hover:text-pink-200 text-sm font-medium whitespace-nowrap cursor-pointer">
                        Xem Thêm
                      </button>
                    </div>
                  </div>
                  <FavoritesList favoriteStories={favoriteStories} />
                </div>
              </div>

              {/* Achievements Section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <RiTrophyLine className="text-yellow-600" />
                      Thành Tích Đạt Được
                    </h2>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">{rewards.length}</span> đã mở khóa
                    </div>
                  </div>
                </div>
                <AchievementsList achievements={rewards} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}