// src/components/settings/TwoFactorAuthModal.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface TwoFactorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrCodeUrl: string | null;
  onVerifyAndEnable: (token: string) => void;
  isLoading: boolean;
  error: string | null;
}

export default function TwoFactorAuthModal({
  isOpen,
  onClose,
  qrCodeUrl,
  onVerifyAndEnable,
  isLoading,
  error,
}: TwoFactorAuthModalProps) {
  const [token, setToken] = useState('');

  // Đóng modal khi nhấn ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleVerify = () => {
    if (token) {
      onVerifyAndEnable(token);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50">
      <div className="relative w-auto my-6 mx-auto max-w-lg">
        {/* Content */}
        <div className="relative flex flex-col w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 dark:border-gray-700 rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Kích Hoạt Xác Thực Hai Yếu Tố (2FA)
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-gray-900 dark:text-gray-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="text-gray-900 dark:text-gray-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/* Body */}
          <div className="relative p-6 flex-auto">
            <div className="space-y-4 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Quét mã QR dưới đây bằng ứng dụng xác thực như Google Authenticator.
              </p>
              {qrCodeUrl ? (
                <div className="flex justify-center">
                  <img src={qrCodeUrl} alt="Mã QR 2FA" className="w-48 h-48 border border-gray-300 dark:border-gray-600 p-2 rounded-lg" />
                </div>
              ) : (
                <div className="flex justify-center items-center w-48 h-48 mx-auto bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <i className="ri-loader-4-line ri-spin text-4xl text-blue-600"></i>
                </div>
              )}
              {error && (
                <div className="bg-red-100 dark:bg-red-900 p-3 rounded-md text-red-700 dark:text-red-300 text-sm">
                  <p>{error}</p>
                </div>
              )}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nhập mã xác thực từ ứng dụng của bạn
                </label>
                <input
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center text-xl font-mono tracking-widest rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  maxLength={6}
                />
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 dark:border-gray-700 rounded-b space-x-2">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              type="button"
              onClick={onClose}
              disabled={isLoading}
            >
              Hủy
            </button>
            <button
              className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200 ${isLoading || !token ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="button"
              onClick={handleVerify}
              disabled={isLoading || !token}
            >
              {isLoading && <i className="ri-loader-4-line ri-spin"></i>}
              Xác Nhận và Kích Hoạt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}