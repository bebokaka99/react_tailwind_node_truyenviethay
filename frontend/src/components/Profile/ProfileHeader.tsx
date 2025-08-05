// frontend/src/components/Profile/ProfileHeader.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { format } from 'date-fns';

export default function ProfileHeader() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [editInfo, setEditInfo] = useState({
        name: '',
        email: '',
        bio: ''
    });
    const [avatarSrc, setAvatarSrc] = useState('/uploads_img/avatar/default-avatar.jpg');


    // Khi user thay đổi, cập nhật state editInfo
    useEffect(() => {
        if (user) {
            setEditInfo({
                name: user.full_name || '',
                email: user.email || '',
                bio: user.bio || '' // 'bio' chưa có trong DB, sẽ là một chuỗi rỗng
            });

            const loadAvatar = async () => {
                if (user.avatar) {
                    const fullUrl = `http://localhost:3000${user.avatar}`;
                    try {
                        const response = await fetch(fullUrl);
                        if (response.ok) {
                            const blob = await response.blob();
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                setAvatarSrc(reader.result as string);
                            };
                            reader.readAsDataURL(blob);
                        } else {
                            setAvatarSrc('/uploads_img/avatar/default-avatar.jpg');
                        }
                    } catch (error) {
                        console.error('Lỗi khi tải avatar:', error);
                        setAvatarSrc('/uploads_img/avatar/default-avatar.jpg');
                    }
                } else {
                    setAvatarSrc('/uploads_img/avatar/default-avatar.jpg');
                }
            };

            loadAvatar();
        }
    }, [user]);


    // Hàm xử lý lưu thông tin chỉnh sửa (chưa có API backend)
    const handleSave = () => {
        // TODO: Gọi API để cập nhật thông tin người dùng
        console.log("Lưu thông tin:", editInfo);
        setIsEditing(false);
    };

    // Định dạng lại ngày tham gia
    const joinDate = user && user.created_at ? format(new Date(user.created_at), 'dd/MM/yyyy') : 'N/A';

    if (!user) {
        return (
            <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                Đang tải thông tin người dùng...
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 transition-colors">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                <div className="relative">
                    <img
                        src={avatarSrc}
                        alt="Profile Avatar"
                        className="w-32 h-32 rounded-full object-cover object-top border-4 border-blue-100 dark:border-blue-900/30"
                    />
                    <button className="absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors cursor-pointer">
                        <i className="ri-camera-line text-sm"></i>
                    </button>
                </div>

                <div className="flex-1">
                    {!isEditing ? (
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{user.full_name}</h1>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">{user.email}</p>
                            <p className="text-gray-500 dark:text-gray-500 text-sm mb-4">Tham gia từ {joinDate}</p>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{user.bio || 'Chưa có tiểu sử.'}</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={editInfo.name}
                                onChange={(e) => setEditInfo({ ...editInfo, name: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            <input
                                type="email"
                                value={editInfo.email}
                                onChange={(e) => setEditInfo({ ...editInfo, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            <textarea
                                value={editInfo.bio}
                                onChange={(e) => setEditInfo({ ...editInfo, bio: e.target.value })}
                                maxLength={500}
                                className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 h-24 resize-none"
                                placeholder="Giới thiệu về bản thân..."
                            />
                            <p className="text-sm text-gray-500 dark:text-gray-400">{editInfo.bio.length}/500 ký tự</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col space-y-3">
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors whitespace-nowrap cursor-pointer"
                        >
                            Chỉnh sửa
                        </button>
                    ) : (
                        <div className="flex space-x-3">
                            <button
                                onClick={handleSave}
                                className="bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer"
                            >
                                Lưu
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-500 dark:bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors whitespace-nowrap cursor-pointer"
                            >
                                Hủy
                            </button>
                        </div>
                    )}
                    <button className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors whitespace-nowrap cursor-pointer">
                        Cài đặt
                    </button>
                </div>
            </div>
        </div>
    );
}