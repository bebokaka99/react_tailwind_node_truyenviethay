// backend/controllers/two_factor.controller.js

const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const UserModel = require('../models/user.model');

// Hàm tạo khóa bí mật và mã QR
exports.generateTwoFactor = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = (await UserModel.findById(userId))[0];

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        const secret = speakeasy.generateSecret({
            name: `Project_Name (${user.email})`
        });

        // Cập nhật khóa bí mật vào DB nhưng chưa bật 2FA
        await UserModel.updateUserTwoFactorSecret(userId, secret.base32);

        const otpauthUrl = speakeasy.otpauthURL({
            secret: secret.ascii,
            label: `Project_Name (${user.email})`,
            issuer: 'Project_Name'
        });

        const qrCodeImageUrl = await QRCode.toDataURL(otpauthUrl);

        res.status(200).json({
            secret: secret.base32,
            qrCodeUrl: qrCodeImageUrl
        });

    } catch (error) {
        next(error);
    }
};

// Hàm xác minh và kích hoạt 2FA (Đã sửa đổi)
exports.verifyAndEnableTwoFactor = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { token } = req.body; // Lấy mã OTP từ request body

        const user = (await UserModel.findById(userId))[0];
        // Bỏ kiểm tra is_two_factor_enabled ở đây vì nó chưa được bật
        if (!user || !user.two_factor_secret) {
            return res.status(400).json({ message: "2FA chưa được thiết lập" });
        }

        // Xác minh mã OTP với secret đã lưu trong database
        const verified = speakeasy.totp.verify({
            secret: user.two_factor_secret,
            encoding: 'base32',
            token: token
        });

        if (verified) {
            // Nếu mã đúng, cập nhật trạng thái 2FA đã được bật
            await UserModel.updateUserTwoFactorStatus(userId, 1);
            res.status(200).json({ message: "Kích hoạt 2FA thành công" });
        } else {
            res.status(400).json({ message: "Mã xác thực không hợp lệ" });
        }
    } catch (error) {
        next(error);
    }
};

// Hàm tắt 2FA (Không cần thay đổi)
exports.disableTwoFactor = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { token } = req.body;

        const user = (await UserModel.findById(userId))[0];
        if (!user || !user.is_two_factor_enabled || !user.two_factor_secret) {
            return res.status(400).json({ message: "2FA chưa được kích hoạt" });
        }

        const verified = speakeasy.totp.verify({
            secret: user.two_factor_secret,
            encoding: 'base32',
            token: token
        });

        if (verified) {
            await UserModel.updateUserTwoFactorSecret(userId, null);
            await UserModel.updateUserTwoFactorStatus(userId, 0);
            res.status(200).json({ message: "Vô hiệu hóa 2FA thành công" });
        } else {
            res.status(400).json({ message: "Mã xác thực không hợp lệ" });
        }
    } catch (error) {
        next(error);
    }
};