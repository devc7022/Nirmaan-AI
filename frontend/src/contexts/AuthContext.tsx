'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { User, TokenResponse } from '@/features/auth/types';
import { authService } from '@/features/auth/services/auth-service';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (tokenData: TokenResponse, rememberMe: boolean) => void;
  logout: () => void;
  refreshSession: () => Promise<string | null>;
  hasRole: (roles: ('ADMIN' | 'SUPERVISOR' | 'CONTRACTOR')[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getStoredItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(key) || sessionStorage.getItem(key);
};

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    if (!exp) return false;
    // Add a 10 second buffer
    return Date.now() >= (exp - 10) * 1000;
  } catch (e) {
    return true;
  }
};

const decodeUserFromToken = (token: string): User | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const email = payload.sub;
    const id = payload.userId;
    const roles = payload.roles || [];
    const role = roles[0] || 'ADMIN'; // Default fallback

    // Generate displayName from email (e.g. aarav@example.com -> Aarav)
    const namePart = email.split('@')[0];
    const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    return {
      id,
      email,
      name,
      role: role as 'ADMIN' | 'SUPERVISOR' | 'CONTRACTOR',
    };
  } catch (e) {
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

  const restoreSession = async () => {
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    const storedAccessToken = getStoredItem('accessToken');
    const storedRefreshToken = getStoredItem('refreshToken');
    const storedUserStr = getStoredItem('user');

    if (!storedAccessToken || !storedRefreshToken) {
      setIsLoading(false);
      return;
    }

    // Set initial tokens and user profile in state
    setAccessToken(storedAccessToken);
    setRefreshToken(storedRefreshToken);
    if (storedUserStr) {
      try {
        setUser(JSON.parse(storedUserStr));
      } catch (e) {
        console.error('Failed to parse stored user json', e);
      }
    }

    // If access token is valid, restore session instantly
    if (!isTokenExpired(storedAccessToken)) {
      setIsLoading(false);
      return;
    }

    // Access token is expired, attempt silent token refresh
    console.warn('Session access token expired, attempting token refresh...');
    try {
      const refreshResponse = await authService.refresh(storedRefreshToken);
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse;
      
      const storage = localStorage.getItem('refreshToken') ? localStorage : sessionStorage;
      storage.setItem('accessToken', newAccessToken);
      if (newRefreshToken) {
        storage.setItem('refreshToken', newRefreshToken);
      }

      const decodedUser = decodeUserFromToken(newAccessToken);
      if (decodedUser) {
        storage.setItem('user', JSON.stringify(decodedUser));
        setUser(decodedUser);
      }
      
      setAccessToken(newAccessToken);
      if (newRefreshToken) {
        setRefreshToken(newRefreshToken);
      }
    } catch (refreshError) {
      console.error('Session refresh failed. Clearing tokens.', refreshError);
      handleClearSession();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (tokenData: TokenResponse, rememberMe: boolean) => {
    const storage = rememberMe ? localStorage : sessionStorage;

    const decodedUser = decodeUserFromToken(tokenData.accessToken);
    if (!decodedUser) {
      throw new Error('Invalid token structure');
    }
    
    storage.setItem('accessToken', tokenData.accessToken);
    storage.setItem('refreshToken', tokenData.refreshToken);
    storage.setItem('user', JSON.stringify(decodedUser));

    setAccessToken(tokenData.accessToken);
    setRefreshToken(tokenData.refreshToken);
    setUser(decodedUser);
    
    router.push('/dashboard');
  };

  const handleClearSession = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('user');
    }
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    queryClient.clear();
  };

  const logout = () => {
    handleClearSession();
    router.push('/login');
  };

  const refreshSession = async (): Promise<string | null> => {
    const currentRefreshToken = getStoredItem('refreshToken');
    if (!currentRefreshToken) {
      handleClearSession();
      return null;
    }

    try {
      const response = await authService.refresh(currentRefreshToken);
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response;
      
      const storage = localStorage.getItem('refreshToken') ? localStorage : sessionStorage;
      storage.setItem('accessToken', newAccessToken);
      if (newRefreshToken) {
        storage.setItem('refreshToken', newRefreshToken);
      }

      const decodedUser = decodeUserFromToken(newAccessToken);
      if (decodedUser) {
        storage.setItem('user', JSON.stringify(decodedUser));
        setUser(decodedUser);
      }

      setAccessToken(newAccessToken);
      if (newRefreshToken) {
        setRefreshToken(newRefreshToken);
      }
      return newAccessToken;
    } catch (e) {
      console.error('Session refresh method failed', e);
      handleClearSession();
      router.push('/login');
      return null;
    }
  };

  const hasRole = (roles: ('ADMIN' | 'SUPERVISOR' | 'CONTRACTOR')[]) => {
    return user ? roles.includes(user.role) : false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        refreshSession,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
