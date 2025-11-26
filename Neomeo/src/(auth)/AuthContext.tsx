// src/(auth)/AuthContext.tsx

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import { getToken, setToken } from '@/src/(api)/token';

// 컨텍스트 타입 정의
type AuthContextType = {
  isAuthenticated: boolean;           // 로그인 여부
  isAuthReady: boolean;              // 토큰 로딩이 끝났는지 여부 (스플래시 제어용)
  login: () => Promise<void> | void; // 로그인 시 호출
  logout: () => Promise<void>;       // 로그아웃 시 호출
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용해야 합니다.');
  }
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // ⭐ 앱 시작 / 새로고침 시 한 번 실행: 저장된 토큰으로 로그인 상태 복구
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken('accessToken');
        console.log('[AuthContext] 저장된 accessToken:', token);

        if (token) {
          // 토큰이 있으면 로그인된 상태로 간주
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (e) {
        console.log('[AuthContext] 토큰 로딩 에러:', e);
        setIsAuthenticated(false);
    } finally {
        // ✅ 토큰 체크가 끝났다는 플래그
        setIsAuthReady(true);
      }
    };

    initAuth();
  }, []);

  // 로그인 시 호출 (실제 토큰 저장은 login.tsx에서 이미 하고 있음)
  const login = async () => {
    setIsAuthenticated(true);
  };

  // 로그아웃 시: 토큰 제거 + 상태 초기화
  const logout = async () => {
    try {
      await setToken('accessToken', '');
      await setToken('refreshToken', '');
    } catch (e) {
      console.log('[AuthContext] 로그아웃 토큰 삭제 에러:', e);
    }
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    isAuthReady,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
