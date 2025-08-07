import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { UserData } from '../types/user';

// Định nghĩa kiểu dữ liệu cho AuthContext
interface AuthContextType {
    user: UserData | null;
    loading: boolean;
    login: (token: string, userData: UserData) => void;
    logout: () => void;
    setLoading: (isLoading: boolean) => void;
}

// Tạo context với giá trị mặc định là null
const AuthContext = createContext<AuthContextType | null>(null);

// Định nghĩa props cho AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

// Component AuthProvider để bao bọc ứng dụng của bạn
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    // Hàm này sẽ được gọi khi bạn đăng nhập thành công
    const login = (token: string, userData: UserData) => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setUser(userData);
    };

    // Hàm này sẽ được gọi khi bạn đăng xuất
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentUser');
        setUser(null);
    };

    // Hàm này để lấy thông tin người dùng từ API, sử dụng khi tải lại trang
    const fetchUser = async (token: string) => {
        try {
            const response = await axios.get('http://localhost:3000/api/auth/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                const userData: UserData = response.data.user;
                setUser(userData);
            } else {
                logout();
            }
        } catch (error) {
            console.error('Lỗi khi lấy thông tin người dùng:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            fetchUser(token);
        } else {
            setLoading(false);
        }
    }, []);

    const value = { user, loading, login, logout, setLoading };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook để sử dụng AuthContext dễ dàng hơn
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};