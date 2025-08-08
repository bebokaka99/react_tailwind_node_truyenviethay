// backend/models/activity.model.js

const db = require('../config/db');

exports.getRecentActivities = async (limit = 10) => {
    try {
        const [rows] = await db.query(
            `SELECT
                ua.*,
                u.username,
                s.ten_truyen as story_title,
                c.tieu_de as chapter_title
            FROM user_activities ua
            JOIN users_new u ON ua.user_id = u.id
            LEFT JOIN truyen_new s ON ua.target_id = s.id AND ua.activity_type LIKE '%story%'
            LEFT JOIN chuong c ON ua.target_id = c.id AND ua.activity_type LIKE '%chapter%'
            ORDER BY ua.created_at DESC
            LIMIT ?`,
            [limit]
        );
        return rows;
    } catch (error) {
        throw new Error("Lỗi khi lấy các hoạt động gần đây: " + error.message);
    }
};

exports.logActivity = async (userId, activityType, description, targetId = null) => {
    try {
        await db.query(
            `INSERT INTO user_activities (user_id, activity_type, description, target_id)
            VALUES (?, ?, ?, ?)`,
            [userId, activityType, description, targetId]
        );
    } catch (error) {
        console.error("Lỗi khi ghi log hoạt động:", error);
    }
};