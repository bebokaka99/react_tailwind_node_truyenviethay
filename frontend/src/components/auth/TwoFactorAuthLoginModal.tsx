// src/components/auth/TwoFactorAuthLoginModal.tsx
'use client';

import React, { useState } from 'react';

interface TwoFactorAuthLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otpToken: string) => void;
  isLoading: boolean;
  error: string | null;
}

const TwoFactorAuthLoginModal: React.FC<TwoFactorAuthLoginModalProps> = ({
  isOpen,
  onClose,
  onVerify,
  isLoading,
  error,
}) => {
  const [otpToken, setOtpToken] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleVerify = () => {
    if (otpToken) {
      onVerify(otpToken);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50">
      <div className="relative w-auto my-6 mx-auto max-w-sm">
        <div className="relative flex flex-col w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg outline-none focus:outline-none">
          <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 dark:border-gray-700 rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Xác thực hai yếu tố
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
          <div className="relative p-6 flex-auto">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Vui lòng nhập mã xác thực từ ứng dụng của bạn để tiếp tục.
            </p>
            <input
              type="text"
              value={otpToken}
              onChange={(e) => setOtpToken(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-center text-xl font-mono tracking-widest rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              maxLength={6}
              required
            />
            {error && (
              <div className="mt-3 bg-red-100 dark:bg-red-900 p-3 rounded-md text-red-700 dark:text-red-300 text-sm">
                <p>{error}</p>
              </div>
            )}
          </div>
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
              className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200 ${isLoading || !otpToken ? 'opacity-50 cursor-not-allowed' : ''}`}
              type="button"
              onClick={handleVerify}
              disabled={isLoading || !otpToken}
            >
              {isLoading && <i className="ri-loader-4-line ri-spin"></i>}
              Xác Nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuthLoginModal;