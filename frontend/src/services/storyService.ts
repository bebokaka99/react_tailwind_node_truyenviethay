// src/services/storyService.ts

const BACKEND_URL = "http://localhost:3000";

// Định nghĩa kiểu dữ liệu cho truyện
export interface Story { // Có từ khóa 'export' ở đây
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

// Định nghĩa kiểu dữ liệu cho chương
export interface Chapter { // Có từ khóa 'export' ở đây
  id: number;
  tieu_de: string;
  so_chuong: number;
  slug: string;
  thoi_gian_tao: string;
  // Thêm các trường khác nếu có
}

// Hàm fetch chung để xử lý lỗi một cách tập trung
const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Lỗi khi gọi API: ${response.statusText}`);
  }
  return response.json();
};

// Lấy chi tiết truyện bằng slug
export const getStoryBySlug = async (slug: string): Promise<Story> => {
  return fetchData<Story>(`${BACKEND_URL}/api/truyen/slug/${slug}`);
};

// Lấy danh sách chương của một truyện bằng novelId
export const getChaptersByNovelId = async (novelId: string | number): Promise<{ chapters: Chapter[] }> => {
  return fetchData<{ chapters: Chapter[] }>(`${BACKEND_URL}/api/chuong/truyen/${novelId}`);
};

// Lấy dữ liệu trang chủ
export const getHomePageData = async () => {
    return fetchData<any>(`${BACKEND_URL}/api/truyen/home`);
};