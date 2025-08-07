// backend/routes/two_factor.routes.js
const express = require('express');
const router = express.Router();
const twoFactorController = require('../controllers/two_factor.controller');
const { authenticateToken } = require('../middleware/auth'); // Thay đổi ở đây

// Route để tạo khóa bí mật và mã QR
router.post('/generate', authenticateToken, twoFactorController.generateTwoFactor);

// Route để xác minh mã OTP và kích hoạt 2FA
router.post('/verify-enable', authenticateToken, twoFactorController.verifyAndEnableTwoFactor);

// Route để tắt 2FA
router.post('/disable', authenticateToken, twoFactorController.disableTwoFactor);

module.exports = router;