// src/components/settings/AccountSettings.tsx
'use client';

import { useState, useEffect } from 'react';
import { useProfile } from '../../hooks/useProfile';
import { UserData } from '../../types/user';
import ChangePasswordModal from './ChangePasswordModal';

export default function AccountSettings() {
  const { 
    profile, 
    loading, 
    error, 
    isUpdating, 
    updateProfile,
    changePassword,
    passwordChangeError,
  } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<UserData>>({
    full_name: '',
    username: '',
    email: '',
    bio: '',
    gender: 'male',
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Cập nhật formData khi dữ liệu profile từ API có
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name,
        username: profile.username,
        email: profile.email,
        bio: profile.bio,
        gender: profile.gender,
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      gender: e.target.value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    const result = await updateProfile(formData, avatarFile);
    if (result.success) {
      setIsEditing(false);
      setAvatarFile(null);
    } else {
      alert(result.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setFormData({
        full_name: profile.full_name,
        username: profile.username,
        email: profile.email,
        bio: profile.bio,
        gender: profile.gender,
      });
    }
    setAvatarFile(null);
  };

  const getGenderText = (gender: string | undefined) => {
    switch (gender) {
      case 'male':
        return 'Nam';
      case 'female':
        return 'Nữ';
      default:
        return 'Khác';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <i className="ri-loader-4-line ri-spin text-4xl text-blue-600"></i>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 p-4 rounded-md text-red-700 dark:text-red-300">
        <p>Lỗi: {error}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded-md text-yellow-700 dark:text-yellow-300">
        <p>Không tìm thấy thông tin hồ sơ.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <i className="ri-user-line text-blue-600"></i>
            Thông Tin Tài Khoản
          </h3>
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setAvatarFile(null);
            }}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium flex items-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <i className={isEditing ? 'ri-close-line' : 'ri-edit-line'}></i>
            {isEditing ? 'Hủy' : 'Chỉnh Sửa'}
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={
                  avatarFile
                    ? URL.createObjectURL(avatarFile)
                    : profile.avatar
                    ? `http://localhost:3000${profile.avatar}`
                    : 'https://readdy.ai/api/search-image?query=default%20user%20avatar&width=80&height=80&seq=vietnamese-reader-avatar&orientation=squarish'
                }
                alt="Ảnh đại diện"
                className="w-20 h-20 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
              />
              {isEditing && (
                <>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200"
                  >
                    <i className="ri-camera-line text-sm"></i>
                    <input
                      id="avatar-upload"
                      type="file"
                      className="hidden"
                      onChange={handleAvatarChange}
                      accept="image/png, image/jpeg"
                    />
                  </label>
                </>
              )}
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                Ảnh đại diện
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Kích thước khuyến nghị: 400x400px
              </p>
              {isEditing && (
                <div className="flex gap-2 mt-2">
                  <label
                    htmlFor="avatar-upload-btn"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 text-sm font-medium whitespace-nowrap cursor-pointer transition-colors duration-200"
                  >
                    Tải ảnh lên
                    <input
                      id="avatar-upload-btn"
                      type="file"
                      className="hidden"
                      onChange={handleAvatarChange}
                      accept="image/png, image/jpeg"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tên hiển thị
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 py-2">
                  {profile.full_name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tên người dùng
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  disabled
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 py-2">
                  @{profile.username}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  disabled
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 py-2">
                  {profile.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Giới tính
              </label>
              {isEditing ? (
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleGenderChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              ) : (
                <p className="text-gray-900 dark:text-gray-100 py-2">
                  {getGenderText(profile.gender)}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Giới thiệu bản thân
              </label>
              {isEditing ? (
                <textarea
                  name="bio"
                  rows={4}
                  value={formData.bio || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors duration-200"
                  maxLength={500}
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100 py-2 leading-relaxed">
                  {profile.bio || 'Chưa có thông tin giới thiệu.'}
                </p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleSave}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors duration-200 ${
                  isUpdating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <i className="ri-loader-4-line ri-spin"></i>
                ) : (
                  <i className="ri-save-line"></i>
                )}
                {isUpdating ? 'Đang Lưu...' : 'Lưu Thay Đổi'}
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-medium py-2 px-6 rounded-lg flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors duration-200"
                disabled={isUpdating}
              >
                <i className="ri-close-line"></i>
                Hủy
              </button>
            </div>
          )}

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">
              Bảo Mật
            </h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Mật khẩu
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Đổi mật khẩu tại đây
                  </p>
                </div>
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium whitespace-nowrap cursor-pointer"
                >
                  Đổi mật khẩu
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    Xác thực hai yếu tố
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tăng cường bảo mật cho tài khoản
                  </p>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium whitespace-nowrap cursor-pointer">
                  Kích hoạt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onChangePassword={changePassword}
        error={passwordChangeError}
      />
    </div>
  );
}