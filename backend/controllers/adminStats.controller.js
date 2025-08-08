// backend/controllers/adminStats.controller.js

const Story = require("../models/story.model");
const User = require("../models/user.model");
const Chapter = require("../models/chapter.model");
const Activity = require("../models/activity.model"); 
const db = require('../config/db');

exports.getAdminStats = async (req, res) => {
    try {
        const totalStories = await Story.countStories(); 
        const totalUsers = await User.getTotalUsersCount();
        const [totalChaptersResult] = await db.query(`SELECT COUNT(*) as total FROM chuong`);
        const [totalRevenueResult] = await db.query(`SELECT SUM(total_points) as total FROM user_points`); 
        const [newChaptersTodayResult] = await db.query(`SELECT COUNT(*) as total FROM chuong WHERE DATE(thoi_gian_dang) = CURDATE()`);

        const recentActivities = await Activity.getRecentActivities(5);
        
        const totalChapters = totalChaptersResult[0].total;
        const totalRevenue = totalRevenueResult[0].total || 0;
        const newChaptersToday = newChaptersTodayResult[0].total;

        return res.status(200).json({
            totalStories,
            totalUsers,
            totalChapters,
            totalRevenue,
            newChaptersToday,
            recentActivities 
        });

    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thống kê admin:", error);
        return res.status(500).json({ message: "Lỗi server nội bộ.", error: error.message });
    }
};