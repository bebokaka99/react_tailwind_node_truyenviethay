// Header.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
// import ThemeToggle from './ThemeToggle';
import { RiMenuLine, RiSearchLine, RiCloseLine, RiUserLine, RiHistoryLine, RiLogoutBoxLine } from 'react-icons/ri';
import { FaUserCircle, FaBookmark } from "react-icons/fa";
import logo from '/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, loading, logout } = useAuth();
  // Tạo state mới để lưu trữ URL hoặc chuỗi base64 của avatar
  const [avatarSrc, setAvatarSrc] = useState('/uploads_img/avatar/default-avatar.jpg');

  const handleSignOut = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  // Sử dụng useEffect để tải avatar khi thông tin người dùng có sẵn
  useEffect(() => {
    const loadAvatar = async () => {
      // Kiểm tra user và user.avatar có tồn tại không
      if (user && user.avatar) {
        const fullUrl = `http://localhost:3000${user.avatar}`;
        try {
          const response = await fetch(fullUrl);
          if (response.ok) {
            const blob = await response.blob();
            const reader = new FileReader();
            // Chuyển đổi blob thành chuỗi base64
            reader.onloadend = () => {
              setAvatarSrc(reader.result as string);
            };
            reader.readAsDataURL(blob);
          } else {
            // Fallback về ảnh mặc định nếu không fetch được
            setAvatarSrc('/uploads_img/avatar/default-avatar.jpg');
          }
        } catch (error) {
          console.error('Lỗi khi tải avatar:', error);
          setAvatarSrc('/uploads_img/avatar/default-avatar.jpg');
        }
      } else {
        setAvatarSrc('/uploads_img/avatar/default-avatar.jpg');
      }
    };

    if (user) {
      loadAvatar();
    }
  }, [user]);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm transition-colors">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="TruyenVietHay" className="h-8 w-auto" />
            </Link>

            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Trang chủ</Link>
              <Link to="/novels" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Tiểu thuyết</Link>
              <Link to="/comics" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Truyện tranh</Link>
              <Link to="/genres" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Thể loại</Link>
              <Link to="/rankings" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">Bảng xếp hạng</Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Tìm truyện..."
                className="w-64 px-4 py-2 pl-10 pr-4 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg w-5 h-5" />
            </div>

            {loading ? (
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <img
                    src={avatarSrc} // Sử dụng state avatarSrc đã được cập nhật
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
                      <p className="font-semibold truncate">{user.full_name}</p>
                      <p className="text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => setIsUserMenuOpen(false)}>
                      <RiUserLine className="mr-2 w-4 h-4" />
                      My Profile
                    </Link>
                    <Link to="/library" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => setIsUserMenuOpen(false)}>
                      <FaBookmark className="mr-2 w-4 h-4" />
                      My Library
                    </Link>
                    <Link to="/reading-history" className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer" onClick={() => setIsUserMenuOpen(false)}>
                      <RiHistoryLine className="mr-2 w-4 h-4" />
                      Reading History
                    </Link>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button onClick={handleSignOut} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                      <RiLogoutBoxLine className="mr-2 w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium cursor-pointer whitespace-nowrap">
                  Đăng nhập
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer whitespace-nowrap">
                  Đăng ký
                </Link>
              </div>
            )}

            <button
              className="md:hidden text-gray-500 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <RiCloseLine className="text-2xl" /> : <RiMenuLine className="text-2xl" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" onClick={() => setIsMenuOpen(false)}>Trang chủ</Link>
              <Link to="/novels" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" onClick={() => setIsMenuOpen(false)}>Tiểu thuyết</Link>
              <Link to="/comics" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" onClick={() => setIsMenuOpen(false)}>Truyện tranh</Link>
              <Link to="/genres" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" onClick={() => setIsMenuOpen(false)}>Thể loại</Link>
              <Link to="/rankings" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer" onClick={() => setIsMenuOpen(false)}>Bảng xếp hạng</Link>
            </nav>
            <div className="mt-4 flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
              <RiSearchLine className="text-gray-400 dark:text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Tìm truyện, tác giả..."
                className="bg-transparent text-sm text-gray-600 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 outline-none flex-1"
              />
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              {user ? (
                <div className="px-2 space-y-1">
                  <Link to="/profile" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                    <RiUserLine className="mr-3 w-5 h-5" />
                    My Profile
                  </Link>
                  <Link to="/library" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                    <FaBookmark className="mr-3 w-5 h-5" />
                    My Library
                  </Link>
                  <Link to="/reading-history" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                    <RiHistoryLine className="mr-3 w-5 h-5" />
                    Reading History
                  </Link>
                  <button onClick={handleSignOut} className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <RiLogoutBoxLine className="mr-3 w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="px-2 space-y-1">
                  <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                  <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 cursor-pointer whitespace-nowrap" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;