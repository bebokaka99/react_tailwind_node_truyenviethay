// backend/routes/profile.routes.js
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const profileController = require("../controllers/profile.controller");
const authController = require("../controllers/auth.controller");
const uploadAvatar = require("../middleware/upload_avatar");

// Route lấy toàn bộ thông tin hồ sơ của người dùng đang đăng nhập
router.get("/me", authenticateToken, profileController.getProfile);

// ** Đã sửa lỗi: Cập nhật controller chính xác cho việc cập nhật hồ sơ
// Chỉ cần một route PUT duy nhất là đủ
router.put(
  "/profile",
  authenticateToken,
  uploadAvatar.single("avatar"),
  profileController.updateProfile
);

// Route thay đổi mật khẩu
router.put(
  "/change-password",
  authenticateToken,
  authController.changePassword
);

module.exports = router;