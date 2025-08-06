// backend/models/history.model.js (Đã sửa hoàn toàn)
const db = require("../config/db");

const historyModel = {
  getReadingHistoryByUserId: async (userId) => {
    try {
      const [rows] = await db.query(
        `SELECT 
           h.truyen_id, 
           t.ten_truyen, 
           t.anh_bia, 
           t.tac_gia,
           h.thoi_gian_doc,
           c.tieu_de AS tieu_de_chuong,
           c.so_chuong,
           (SELECT COUNT(chuong.id) FROM chuong WHERE chuong.truyen_id = h.truyen_id) AS tong_so_chuong
         FROM lich_su_doc_new h
         JOIN truyen_new t ON h.truyen_id = t.id
         JOIN chuong c ON h.chuong_id = c.id
         WHERE h.user_id = ?
         ORDER BY h.thoi_gian_doc DESC
         LIMIT 5`,
        [userId]
      );
      return rows;
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử đọc:", error);
      throw new Error(`Lỗi khi lấy lịch sử đọc: ${error.sqlMessage || error.message}`);
    }
  },
};

module.exports = historyModel;