// src/services/userService.ts

const BACKEND_URL = "http://localhost:3000";

// Hàm fetch chung để xử lý lỗi một cách tập trung
const fetchData = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Lỗi khi gọi API: ${response.statusText}`);
  }
  return response.json();
};

// Lấy dữ liệu hồ sơ người dùng
export const getProfileData = async (token: string) => {
  return fetchData<any>(`${BACKEND_URL}/api/user/me`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Cập nhật hồ sơ người dùng
export const updateProfile = async (
  formData: FormData,
  token: string
) => {
  const response = await fetch(`${BACKEND_URL}/api/user/profile`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData, // Gửi dữ liệu dưới dạng FormData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Lỗi khi cập nhật hồ sơ.");
  }

  return response.json();
};