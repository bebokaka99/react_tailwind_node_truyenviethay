// frontend/src/api/adminDashboard.api.ts
import axios from 'axios';

// Định nghĩa base URL của API backend
const API_URL = 'http://localhost:3000/api';

// Định nghĩa kiểu dữ liệu cho phản hồi từ API thống kê tổng quan
export interface AdminStatsResponse {
  totalStories: number;
  totalUsers: number;
  totalChapters: number;
  totalRevenue: number;
  newChaptersToday: number;
}

// Định nghĩa kiểu dữ liệu cho một truyện phổ biến
export interface TopStory {
  id_truyen: number;
  ten_truyen: string;
  tac_gia: string;
  luot_xem: number;
  trang_thai_viet: 'dang_tien_hanh' | 'hoan_thanh';
  rating: number;
}

// Hàm lấy dữ liệu thống kê tổng quan cho admin
export const getAdminStats = async (token: string): Promise<AdminStatsResponse> => {
  try {
    const response = await axios.get(`${API_URL}/admin/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu thống kê admin:', error);
    throw error;
  }
};

// Hàm lấy danh sách truyện phổ biến nhất
export const getTopStories = async (token: string, limit: number = 5): Promise<TopStory[]> => {
  try {
    const response = await axios.get(`${API_URL}/truyen/top-stories?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy truyện phổ biến nhất:', error);
    throw error;
  }
};