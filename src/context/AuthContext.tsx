import React, { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../lib/api";
import { useRouter } from "next/router";

type User = {
  _id?: string;
  fullName?: string;
  username?: string;
  email?: string;
  role?: string;
  profilePicture?: string;
};

type ApiResponse<T> = {
  message: string;
  data: T;
};

// Tipe khusus untuk register payload (sesuaikan field kalau backend beda)
type RegisterPayload = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (t) {
      setToken(t);
      setAuthToken(t);
      fetchProfile().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProfile = async (): Promise<void> => {
    try {
      // memberitahu TS bahwa response.data akan bertipe ApiResponse<User>
      const res = await api.get<ApiResponse<User>>("/auth/me");
      setUser(res.data.data ?? null);
    } catch (err: unknown) {
      console.error("fetchProfile error", err);
      setUser(null);
      setToken(null);
      setAuthToken(null);
      if (typeof window !== "undefined") localStorage.removeItem("token");
    }
  };

  const login = async (identifier: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // sesuai screenshot: /auth/login mengembalikan token di data (string)
      const res = await api.post<ApiResponse<string>>("/auth/login", { identifier, password });
      const t = res.data.data;
      setToken(t);
      if (typeof window !== "undefined") localStorage.setItem("token", t);
      setAuthToken(t);
      await fetchProfile();
      router.push("/dashboard");
    } catch (err: unknown) {
      // tangani error sesuai kebutuhan (tampilkan toast, dsb.)
      console.error("login error", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: RegisterPayload): Promise<void> => {
    setLoading(true);
    try {
      // jika backend mengembalikan user di data, kita bisa menggunakan ApiResponse<User>
      await api.post<ApiResponse<User>>("/auth/register", payload);
      // setelah register, redirect ke login — atau auto-login jika mau
      router.push("/auth/login");
    } catch (err: unknown) {
      console.error("register error", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthToken(null);
    if (typeof window !== "undefined") localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    refreshProfile: fetchProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};