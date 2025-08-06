// backend/services/profile.service.js
const UserModel = require("../models/user.model");
const UserPointModel = require("../models/userPoint.model");
const UserRewardModel = require("../models/userReward.model");
const HistoryModel = require("../models/history.model");
const LikeModel = require("../models/like.model");

const ProfileService = {
  getCompleteUserProfile: async (userId) => {
    try {
      // 1. Lấy thông tin cơ bản của người dùng
      const user = await UserModel.findById(userId);
      if (!user || user.length === 0) {
        throw new Error("Không tìm thấy người dùng");
      }
      const userData = user[0];

      // 2. Lấy điểm và cấp độ
      const userPoints = await UserPointModel.getPointsByUserId(userId);
      
      // 3. Lấy danh sách thành tích
      const userRewards = await UserRewardModel.getByUserId(userId);

      // 4. Lấy lịch sử đọc gần đây
      const readingHistory = await HistoryModel.getReadingHistoryByUserId(userId);

      // 5. Lấy danh sách truyện yêu thích
      const favoriteStories = await LikeModel.getLikedStoriesByUserId(userId);

      // 6. Tổng hợp tất cả dữ liệu thành một object duy nhất
      return {
        user: {
          id: userData.id,
          username: userData.username,
          full_name: userData.full_name,
          email: userData.email,
          avatar: userData.avatar,
          bio: userData.bio, // Giả định có trường bio trong DB
          role: userData.role,
          memberSince: userData.created_at,
          gender: userData.gender,
        },
        stats: {
          total_points: userPoints?.total_points || 0,
          current_level_id: userPoints?.current_level_id || 0,
          // Có thể thêm các stat khác từ các bảng khác
        },
        rewards: userRewards,
        readingHistory: readingHistory,
        favoriteStories: favoriteStories,
      };

    } catch (error) {
      console.error("Lỗi trong ProfileService:", error);
      throw error;
    }
  },
  // Có thể thêm các hàm khác như updateProfile...
};

module.exports = ProfileService;