// backend/routes/auth.routes.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const upload = require("../middleware/upload_img");
const { authenticateToken } = require("../middleware/auth");
const { authorizeRoles } = require("../middleware/auth"); // Thêm dòng này nếu cần sử dụng authorizeRoles

router.post("/dang-ky", authController.register);
router.post("/dang-nhap", authController.login);
router.post("/2fa/verify", authController.verifyTwoFactor); // Endpoint mới để xác minh 2FA

router.get("/me", authenticateToken, authController.getMe);
router.put("change-password", authenticateToken, authController.changePassword);
router.put(
    "/me",
    authenticateToken,
    upload.single("avatar"),
    authController.updateMe
);

module.exports = router;