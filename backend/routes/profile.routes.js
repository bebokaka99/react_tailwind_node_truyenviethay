// backend/routes/profile.routes.js
const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const profileController = require("../controllers/profile.controller");
const authController = require("../controllers/auth.controller");
const uploadAvatar = require("../middleware/upload_avatar");

// Route lấy toàn bộ thông tin hồ sơ của người dùng đang đăng nhập
router.get("/me", authenticateToken, profileController.getProfile);

// Route cập nhật thông tin hồ sơ (sử dụng controller cũ)
router.put(
  "/me",
  authenticateToken,
  uploadAvatar.single("avatar"),
  authController.updateMe
);
router.post(
  "/me",
  authenticateToken,
  uploadAvatar.single("avatar"),
  authController.updateMe
);

// Route thay đổi mật khẩu (sử dụng controller cũ)
router.put(
  "/change-password",
  authenticateToken,
  authController.changePassword
);

module.exports = router;