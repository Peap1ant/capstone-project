import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextType {
  user: string | null;
  login: (token: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<string | null>(null);

  // 앱 실행 시 저장된 토큰 불러와 로그인 상태 복구
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      const username = await AsyncStorage.getItem("username");

      if (token && username) {
        setUser(username);
      }
    };

    loadToken();
  }, []);

  const login = async (token: string, username: string) => {
    await AsyncStorage.setItem("accessToken", token);
    await AsyncStorage.setItem("username", username);
    setUser(username);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("username");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
