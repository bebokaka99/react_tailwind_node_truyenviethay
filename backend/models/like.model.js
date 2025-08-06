// backend/models/like.model.js (Đã sửa)
const db = require("../config/db");

const LikeModel = {
  // ... Các hàm đã có
  hasLiked: async (userId, truyenId) => {
    const [rows] = await db.query(
      "SELECT 1 FROM thich WHERE user_id = ? AND truyen_id = ? LIMIT 1",
      [userId, truyenId]
    );
    return rows.length > 0;
  },

  getLuotThich: async (truyenId) => {
    const [rows] = await db.query(
      "SELECT luot_thich FROM truyen_new WHERE id = ?",
      [truyenId]
    );
    return rows[0]?.luot_thich || 0;
  },

  addLike: async (userId, truyenId) => {
    await db.query(
      "INSERT INTO thich (user_id, truyen_id, ngay_thich) VALUES (?, ?, NOW())",
      [userId, truyenId]
    );
    await db.query(
      "UPDATE truyen_new SET luot_thich = luot_thich + 1 WHERE id = ?",
      [truyenId]
    );
  },

  removeLike: async (userId, truyenId) => {
    await db.query("DELETE FROM thich WHERE user_id = ? AND truyen_id = ?", [
      userId,
      truyenId,
    ]);
    await db.query(
      "UPDATE truyen_new SET luot_thich = GREATEST(luot_thich - 1, 0) WHERE id = ?",
      [truyenId]
    );
  },

  // Hàm mới: Lấy danh sách truyện yêu thích của một người dùng
  getLikedStoriesByUserId: async (userId) => {
    try {
      const [rows] = await db.query(
        `
        SELECT
          t.id,
          t.ten_truyen,
          t.anh_bia,
          t.tac_gia,
          t.luot_xem,
          t.luot_thich,
          t.trang_thai,
          t.rating,
          th.ngay_thich
        FROM
          thich th
        JOIN
          truyen_new t ON th.truyen_id = t.id
        WHERE
          th.user_id = ?
        ORDER BY
          th.ngay_thich DESC
        `,
        [userId]
      );
      return rows;
    } catch (error) {
      throw new Error("Lỗi khi lấy danh sách truyện yêu thích: " + error.message);
    }
  },
};

module.exports = LikeModel;