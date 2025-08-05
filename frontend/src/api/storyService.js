// src/api/storyService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/truyen';

export const getHomePageData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/home`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu trang chủ:", error);
    throw error;
  }
};