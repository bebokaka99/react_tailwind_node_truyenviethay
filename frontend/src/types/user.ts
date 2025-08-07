// src/types/user.ts

export interface UserData {
  id: string;
  username: string;
  full_name: string;
  email: string;
  phone: string; 
  avatar: string | null; 
  bio?: string; 
  role: string;
  gender: string;
  created_at: string; 
  is_two_factor_enabled: boolean; 
}

export interface StatsData {
  total_points: number;
  current_level_id: number;
}

export interface ReadingItem {
  truyen_id: string;
  ten_truyen: string;
  anh_bia: string;
  thoi_gian_doc: string;
  tieu_de_chuong: number;
  so_chuong: number;
  tong_so_chuong: number;
  tac_gia: string;
  progress_percent?: number;
}

export interface FavoriteStory {
  id: string;
  ten_truyen: string;
  tac_gia: string;
  anh_bia: string;
  rating: number;
  tong_so_chuong: number;
  trang_thai: string;
  id_theloai: string;
}

export interface RewardItem {
  user_reward_id: string;
  reward_id: string;
  claimed_at: string;
  name: string;
}

export interface ProfileData {
  user: UserData;
  stats: StatsData;
  readingHistory: ReadingItem[];
  favoriteStories: FavoriteStory[];
  rewards: RewardItem[];
}