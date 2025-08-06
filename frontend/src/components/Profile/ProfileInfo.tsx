// src/components/profile/ProfileInfo.tsx
'use client';

import React from 'react';
import ProfileEditForm from './ProfileEditForm'; 

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

interface ProfileInfoProps {
  user: UserData;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSave: (updatedUser: Partial<UserData>, avatarFile: File | null) => void;
  isLoading: boolean;
  error: string | null;
}

export default function ProfileInfo({ user, isEditing, onStartEdit, onCancelEdit, onSave, isLoading, error }: ProfileInfoProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('vi-VN', options);
  };

  const avatarUrl = user.avatar 
    ? `http://localhost:3000${user.avatar}` 
    : "https://readdy.ai/api/search-image?query=default%20user%20avatar&width=120&height=120&seq=vietnamese-reader-avatar&orientation=squarish";

  if (isEditing) {
    return (
      <ProfileEditForm 
        user={user} 
        onSave={onSave} 
        onCancel={onCancelEdit} 
        isLoading={isLoading} 
        error={error} 
      />
    );
  }

  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'male': return 'Nam';
      case 'female': return 'Nữ';
      default: return 'Khác';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Profile Header with gradient background */}
      <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-6 text-white relative">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative text-center">
          <div className="relative inline-block mb-4">
            <img
              src={avatarUrl}
              alt="Ảnh đại diện"
              className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-white/20 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-3 border-white flex items-center justify-center">
              <i className="ri-book-line text-white text-sm"></i>
            </div>
          </div>
          <h2 className="text-xl font-bold">{user.full_name || 'Người dùng mới'}</h2>
          <p className="text-white/80 text-sm">@{user.username}</p>
          <div className="mt-2 inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
            <i className="ri-vip-crown-line text-yellow-300"></i>
            <span className="text-sm font-medium">{user.role}</span>
          </div>
        </div>
      </div>
      
      {/* Profile Details */}
      <div className="p-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <i className="ri-mail-line"></i>
                Email
              </label>
              <p className="text-gray-900 dark:text-white text-sm">{user.email}</p>
            </div>
            
            {/* Hiển thị thông tin giới tính */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <i className="ri-user-line"></i>
                Giới tính
              </label>
              <p className="text-gray-900 dark:text-white text-sm">{getGenderText(user.gender)}</p>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <i className="ri-calendar-line"></i>
                Thành viên từ
              </label>
              <p className="text-gray-900 dark:text-white text-sm">{formatDate(user.memberSince)}</p>
            </div>
            
            {user.bio && (
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <i className="ri-edit-line"></i>
                  Giới thiệu
                </label>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mt-1">{user.bio}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={onStartEdit}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-md"
          >
            <i className="ri-edit-line"></i>
            Chỉnh Sửa Hồ Sơ
          </button>
          
          <button className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer">
            <i className="ri-settings-line"></i>
            Cài Đặt
          </button>
        </div>
      </div>
    </div>
  );
}