// backend/controllers/auth.controller.js
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const logger = require("../ultils/logger");

exports.register = asyncHandler(async (req, res) => {
    const {
        username,
        password,
        email,
        full_name,
        phone,
        role = "user",
        avatar,
    } = req.body;

    if (!username || !password || !email || !full_name || !phone) {
        res.status(400);
        throw new Error("Thiếu thông tin đăng ký");
    }

    const existingUsers = await User.findByUsername(username);
    if (existingUsers.length > 0) {
        res.status(400);
        throw new Error("Username đã tồn tại");
    }

    const emailExists = await User.findByEmail(email);
    if (emailExists.length > 0) {
        res.status(400);
        throw new Error("Email đã tồn tại");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        username,
        password: hashedPassword,
        email,
        full_name,
        phone,
        role,
        avatar: avatar || "/uploads_img/avatar/default-avatar.jpg",
    };

    await User.create(newUser);
    res.status(201).json({ message: "Đăng ký thành công" });
});

exports.login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const results = await User.findByUsername(username);
    if (results.length === 0) {
        res.status(401);
        throw new Error("Tài khoản hoặc mật khẩu không đúng.");
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        res.status(401);
        throw new Error("Tài khoản hoặc mật khẩu không đúng.");
    }

    if (user.status === "blocked") {
        const now = new Date();
        const banUntil = user.ban_until ? new Date(user.ban_until) : null;

        if (!banUntil || banUntil > now) {
            res.status(403);
            throw new Error(banUntil ? `Tài khoản bị khóa đến ${banUntil.toLocaleString()}` : `Tài khoản đã bị khóa vĩnh viễn`);
        } else {
            await User.updateStatus(user.id, "active", null);
            user.status = "active";
            user.ban_until = null;
        }
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    res.json({
        message: "Đăng nhập thành công",
        token,
        user: {
            id: user.id,
            username: user.username,
            role: user.role,
            full_name: user.full_name,
            avatar: user.avatar,
        },
    });
});

exports.getMe = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const results = await User.findById(userId);
    if (results.length === 0) {
        res.status(404);
        throw new Error("Không tìm thấy người dùng");
    }

    const user = results[0];
    res.json({
        message: "Thông tin người dùng",
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            full_name: user.full_name,
            phone: user.phone,
            avatar: user.avatar,
            role: user.role,
            gender: user.gender,
            created_at: user.created_at,
        },
    });
});

exports.updateMe = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { full_name, email, phone, gender, remove_avatar } = req.body;

    let avatarPathToDB = undefined;

    if (req.file) {
        avatarPathToDB = "/uploads_img/avatar/" + req.file.filename;
    } else if (remove_avatar === "true") {
        avatarPathToDB = null;
    }

    const updateData = {};

    if (full_name !== undefined) updateData.full_name = full_name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (gender !== undefined) updateData.gender = gender;
    if (avatarPathToDB !== undefined) updateData.avatar = avatarPathToDB;

    if (Object.keys(updateData).length === 0) {
        res.status(200).json({ message: "Không có thông tin nào được thay đổi để cập nhật." });
        return;
    }

    const affectedRows = await User.updateUser(userId, updateData);

    if (affectedRows === 0) {
        res.status(400);
        throw new Error("Cập nhật không thành công.");
    }

    const updatedUserResults = await User.findById(userId);
    const updatedUser = updatedUserResults[0];

    res.json({ message: "Cập nhật thông tin thành công!", user: updatedUser });
});

exports.changePassword = asyncHandler(async (req, res) => {
    // Lấy ID người dùng đã được xác thực từ req.user
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    // Kiểm tra tính hợp lệ của input
    if (!oldPassword || !newPassword) {
        res.status(400);
        throw new Error("Vui lòng nhập đầy đủ mật khẩu cũ và mật khẩu mới.");
    }
    const userResults = await User.findById(userId);
    if (userResults.length === 0) {
        res.status(404);
        throw new Error("Không tìm thấy người dùng.");
    }
    const user = userResults[0];
    // So sánh mật khẩu cũ với mật khẩu trong DB
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        res.status(400);
        throw new Error("Mật khẩu cũ không đúng.");
    }

    // Kiểm tra xem mật khẩu mới có giống mật khẩu cũ không
    const isNewPasswordSameAsOld = await bcrypt.compare(
        newPassword,
        user.password
    );
    if (isNewPasswordSameAsOld) {
        res.status(400);
        throw new Error("Mật khẩu mới không được giống mật khẩu cũ.");
    }

    // Mã hóa mật khẩu mới
    const hashed = await bcrypt.hash(newPassword, 10);

    // Cập nhật mật khẩu vào cơ sở dữ liệu
    const updatedAffectedRows = await User.updatePassword(user.id, hashed);

    if (updatedAffectedRows === 0) {
        res.status(400);
        throw new Error(
            "Không thể cập nhật mật khẩu. Có thể mật khẩu mới giống mật khẩu cũ."
        );
    }

    res.json({ message: "Đổi mật khẩu thành công!" });
});