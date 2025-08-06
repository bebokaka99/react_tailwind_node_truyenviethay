// backend/controllers/profile.controller.js

const ProfileService = require("../services/profile.service");

// Hàm để lấy thông tin hồ sơ
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
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

// Hàm để cập nhật thông tin hồ sơ
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, bio, gender } = req.body;
    
    // Sửa lỗi: Cập nhật đường dẫn avatar để bao gồm thư mục 'avatar'
    const avatar = req.file ? `/uploads_img/avatar/${req.file.filename}` : undefined;

    const updatedUser = await ProfileService.updateUserProfile(
      userId,
      { full_name, bio, gender, avatar }
    );

    res.json({
      message: "Cập nhật hồ sơ thành công.",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi cập nhật hồ sơ",
      error: error.message,
    });
  }
};