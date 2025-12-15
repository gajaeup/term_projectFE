import React, { createContext, useState, useEffect, useContext } from 'react';


export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부

    const DEFAULT_IMAGE = '/images/default_profile.png';

    // 앱 로드 시 localStorage에서 로그인 정보 불러오기
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsLoggedIn(true);
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                localStorage.removeItem('user');
                setUser(null); // 파싱 실패 시 사용자 정보 초기화
                setIsLoggedIn(false);
            }
        }
    }, []);

    // 로그인 처리 함수
    const login = (userData) => {
        const userWithAvatar = {
                ...userData,
                avatarUrl: userData.avatarUrl || DEFAULT_IMAGE, // 백엔드에서 받으면 사용, 없으면 임시 이미지
            };
        setUser(userWithAvatar);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userWithAvatar)); // localStorage에 저장
        console.log("AuthContext: User logged in:", userWithAvatar);
    };

    // 로그아웃 처리 함수
    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user'); // localStorage에서 제거
        // TODO: 백엔드 로그아웃 API 호출 (세션 무효화 등)
    };

    // Context Value
    const authContextValue = {
        user,
        isLoggedIn,
        login,
        logout,
        DEFAULT_IMAGE
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Context를 쉽게 사용하기 위한 Custom Hook (선택 사항)
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};