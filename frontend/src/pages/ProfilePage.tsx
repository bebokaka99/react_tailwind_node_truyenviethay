// src/pages/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileInfo from '../components/profile/ProfileInfo';
import StatsCard from '../components/profile/StatsCard';
import ReadingHistory from '../components/profile/ReadingHistory';
import FavoritesList from '../components/profile/FavoritesList';
import AchievementsList from '../components/profile/AchievementsList';
import { RiBookLine, RiHistoryLine, RiHeartFill, RiTrophyLine } from 'react-icons/ri';
import { updateProfile, getProfileData } from '../services/userService';
import {
  UserData,
  ProfileData,
  StatsData,
  ReadingItem,
  FavoriteStory,
  RewardItem,
} from '../types';

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // Hàm để gọi API lấy dữ liệu profile
  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Không tìm thấy token. Vui lòng đăng nhập.');
      }

      const result = await getProfileData(token);
      setProfileData(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Hàm xử lý việc cập nhật profile
  const handleUpdateProfile = async (
    updatedFields: Partial<UserData>,
    avatarFile: File | null
  ) => {
    if (!profileData) return;
    setUpdateLoading(true);
    setUpdateError(null);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Không tìm thấy token. Vui lòng đăng nhập.');
      }

      const formData = new FormData();
      if (updatedFields.full_name) formData.append('full_name', updatedFields.full_name);
      if (updatedFields.bio) formData.append('bio', updatedFields.bio);
      if (updatedFields.gender) formData.append('gender', updatedFields.gender);
      if (avatarFile) formData.append('avatar', avatarFile);

      const result = await updateProfile(formData, token);

      // Cập nhật state với dữ liệu mới từ backend
      setProfileData((prev) => ({
        ...prev!,
        user: {
          ...prev!.user,
          ...result.data,
        },
      }));
      setIsEditing(false); // Thoát khỏi chế độ chỉnh sửa
    } catch (err: any) {
      setUpdateError(err.message);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 text-white">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-gray-900 text-red-500 p-4">
        <h1 className="text-xl font-bold mb-4">Lỗi</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 text-gray-500">
        Không có dữ liệu để hiển thị.
      </div>
    );
  }

  const { user, stats, readingHistory, favoriteStories, rewards } = profileData;

  // Dữ liệu giả định cho các thẻ thống kê
  const userStats = [
    {
      title: 'Truyện Đã Đọc',
      value: '47',
      icon: RiBookLine,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    },
    {
      title: 'Chương Đã Đọc',
      value: '342',
      icon: RiHistoryLine,
      color: 'bg-gradient-to-r from-green-500 to-green-600',
    },
    {
      title: 'Thời Gian Đọc',
      value: '156h',
      icon: RiTrophyLine,
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
    },
    {
      title: 'Truyện Yêu Thích',
      value: `${favoriteStories.length}`,
      icon: RiHeartFill,
      color: 'bg-gradient-to-r from-pink-500 to-pink-600',
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-1">
              <div className="sticky top-8">
                <ProfileInfo
                  user={user}
                  isEditing={isEditing}
                  onStartEdit={() => setIsEditing(true)}
                  onCancelEdit={() => setIsEditing(false)}
                  onSave={handleUpdateProfile}
                  isLoading={updateLoading}
                  error={updateError}
                />
              </div>
            </div>

            <div className="xl:col-span-3 space-y-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {userStats.map((stat, index) => (
                  <StatsCard key={index} {...stat} />
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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