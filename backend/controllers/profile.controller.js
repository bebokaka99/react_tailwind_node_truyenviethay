// backend/controllers/profile.controller.js
const ProfileService = require("../services/profile.service");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Lấy userId từ JWT token đã được xác thực
    const profileData = await ProfileService.getCompleteUserProfile(userId);
    
    res.json({
      message: "Lấy thông tin hồ sơ người dùng thành công.",
      data: profileData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy thông tin hồ sơ",
      error: error.message,
    });
  }
};