// backend/services/profile.service.js
const UserModel = require("../models/user.model");
const UserPointModel = require("../models/userPoint.model");
const UserRewardModel = require("../models/userReward.model");
const HistoryModel = require("../models/history.model");
const LikeModel = require("../models/like.model");

const ProfileService = {
  getCompleteUserProfile: async (userId) => {
    try {
      const user = await UserModel.findById(userId);
      if (!user || user.length === 0) {
        throw new Error("Không tìm thấy người dùng");
      }
      const userData = user[0];

      const userPoints = await UserPointModel.getPointsByUserId(userId);
      const userRewards = await UserRewardModel.getByUserId(userId);
      const readingHistory = await HistoryModel.getReadingHistoryByUserId(
        userId
      );
      const favoriteStories = await LikeModel.getLikedStoriesByUserId(userId);

      return {
        user: {
          id: userData.id,
          username: userData.username,
          full_name: userData.full_name,
          email: userData.email,
          avatar: userData.avatar,
          bio: userData.bio,
          role: userData.role,
          memberSince: userData.created_at,
          gender: userData.gender, // Đảm bảo trường gender được trả về
        },
        stats: {
          total_points: userPoints?.total_points || 0,
          current_level_id: userPoints?.current_level_id || 0,
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
  updateUserProfile: async (userId, updatedFields) => {
    try {
      const updatedRows = await UserModel.updateUser(userId, updatedFields);

      if (updatedRows === 0) {
        throw new Error(
          "Không tìm thấy người dùng hoặc không có gì để cập nhật"
        );
      }
      const user = await UserModel.findById(userId);
      return user[0];
    } catch (error) {
      console.error("Lỗi khi cập nhật hồ sơ người dùng trong service:", error);
      throw error;
    }
  },
};

module.exports = ProfileService;