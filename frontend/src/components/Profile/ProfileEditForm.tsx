// src/components/profile/ProfileEditForm.tsx
import React, { useState, useEffect } from 'react';
import { UserData } from '../../types';

interface ProfileEditFormProps {
    user: UserData;
    onSave: (updatedUser: Partial<UserData>, avatarFile: File | null) => void;
    onCancel: () => void;
    isLoading: boolean;
    error: string | null;
}

export default function ProfileEditForm({ user, onSave, onCancel, isLoading, error }: ProfileEditFormProps) {
    const [formData, setFormData] = useState({
        full_name: user.full_name || '',
        bio: user.bio || '',
        gender: user.gender || '',
    });
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>(user.avatar ? `http://localhost:3000${user.avatar}` : 'https://readdy.ai/api/search-image?query=default%20user%20avatar&width=120&height=120&seq=vietnamese-reader-avatar&orientation=squarish');

    useEffect(() => {
        // Cập nhật URL xem trước khi file ảnh thay đổi
        if (avatarFile) {
            setAvatarPreviewUrl(URL.createObjectURL(avatarFile));
        } else {
            setAvatarPreviewUrl(user.avatar ? `http://localhost:3000${user.avatar}` : 'https://readdy.ai/api/search-image?query=default%20user%20avatar&width=120&height=120&seq=vietnamese-reader-avatar&orientation=squarish');
        }
    }, [avatarFile, user.avatar]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatarFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData, avatarFile);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Chỉnh sửa hồ sơ</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                        <img
                            src={avatarPreviewUrl}
                            alt="Ảnh đại diện"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
                        />
                        <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer border-2 border-white dark:border-gray-800 transition-colors hover:bg-blue-700">
                            <i className="ri-camera-line text-white"></i>
                        </label>
                        <input
                            id="avatar-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/jpeg, image/png, image/jpg"
                        />
                    </div>
                </div>

                {/* Full Name */}
                <div>
                    <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Họ và tên
                    </label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Gender */}
                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Giới tính
                    </label>
                    {/* Đã sửa lỗi: Cập nhật giá trị (value) thành tiếng Anh */}
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </select>
                </div>

                {/* Bio */}
                <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Giới thiệu bản thân
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {error && <div className="text-red-500 text-sm">{error}</div>}

                {/* Buttons */}
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                        Hủy
                    </button>
                </div>
            </form>
        </div>
    );
}