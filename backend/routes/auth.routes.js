// backend/routes/auth.routes.js
const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyTwoFactor,
  verifyLoginTwoFactor,
  getMe,
  updateMe,
  changePassword,
} = require("../controllers/auth.controller");
const upload = require("../middleware/upload_img");
const { authenticateToken } = require("../middleware/auth");
const { authorizeRoles } = require("../middleware/auth");

router.post("/dang-ky", register);
router.post("/dang-nhap", login);
// Route để kích hoạt 2FA
router.post("/2fa/verify", authenticateToken, verifyTwoFactor);
// Route để xác thực 2FA khi đăng nhập
router.post("/2fa/verify-login", verifyLoginTwoFactor);

router.get("/me", authenticateToken, getMe);
router.put("change-password", authenticateToken, changePassword);
router.put(
  "/me",
  authenticateToken,
  upload.single("avatar"),
  updateMe
);

module.exports = router;