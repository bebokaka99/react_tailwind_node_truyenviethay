// backend/routes/adminStats.routes.js
const express = require("express");
const router = express.Router();
const adminStatsController = require("../controllers/adminStats.controller");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");

// Route lấy dữ liệu thống kê tổng hợp cho trang dashboard admin
router.get(
    "/stats",
    authenticateToken,
    authorizeRoles("admin"),
    adminStatsController.getAdminStats
);

module.exports = router;