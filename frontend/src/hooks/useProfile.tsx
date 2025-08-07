// src/hooks/useProfile.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { UserData } from '../types/user';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:3000/api';

export const useProfile = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);

  const fetchProfile = async (token: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE_URL}/user/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setProfile(response.data.data.user);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        logout();
        setError('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      } else {
        setError('Lỗi khi tải thông tin hồ sơ. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updatedData: Partial<UserData>, avatarFile: File | null) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('Bạn cần đăng nhập để cập nhật hồ sơ.');
      return { success: false, message: 'Chưa đăng nhập' };
    }

    try {
      setIsUpdating(true);
      setError(null);

      const formData = new FormData();
      if (updatedData.full_name !== undefined) formData.append('full_name', updatedData.full_name);
      if (updatedData.bio !== undefined) formData.append('bio', updatedData.bio);
      if (updatedData.gender !== undefined) formData.append('gender', updatedData.gender);
      if (avatarFile) formData.append('avatar', avatarFile);

      const response = await axios.put(`${API_BASE_URL}/user/profile`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfile(response.data.data);
      return { success: true, message: response.data.message };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Lỗi khi cập nhật hồ sơ.';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsUpdating(false);
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setPasswordChangeError('Bạn cần đăng nhập để đổi mật khẩu.');
      return { success: false, message: 'Chưa đăng nhập' };
    }

    try {
      const response = await axios.put(`${API_BASE_URL}/user/change-password`,
      {
        oldPassword,
        newPassword
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setPasswordChangeError(null);
      alert("Đổi mật khẩu thành công! Bạn sẽ được đăng xuất và chuyển hướng sau 3 giây.");
      setTimeout(() => {
        logout();
        navigate('/login'); 
      }, 3000);

      return { success: true, message: response.data.message };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Lỗi khi đổi mật khẩu. Vui lòng thử lại.';
      setPasswordChangeError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };
  
  const removeAvatar = () => {
  };

  useEffect(() => {
    if (!authLoading && user) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        fetchProfile(token);
      } else {
        setLoading(false);
      }
    } else if (!authLoading && !user) {
      setLoading(false);
    }
  }, [user, authLoading]);

  return {
    profile,
    loading,
    error,
    isUpdating,
    updateProfile,
    removeAvatar,
    changePassword,
    passwordChangeError
  };
};