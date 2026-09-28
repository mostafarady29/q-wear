'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthResponse } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: {
    name: string;
    email: string;
    pass: string;
    city?: string;
    country?: string;
    vipCode?: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('q_auth_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to parse cached auth user', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });

      const data: AuthResponse = await res.json();
      if (data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('q_auth_user', JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem('q_auth_token', data.token);
        }
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Authentication failed' };
      }
    } catch (err) {
      return { success: false, message: 'Network or server communication error' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    pass: string;
    city?: string;
    country?: string;
    vipCode?: string;
  }) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData: AuthResponse = await res.json();
      if (resData.success && resData.user) {
        setUser(resData.user);
        localStorage.setItem('q_auth_user', JSON.stringify(resData.user));
        if (resData.token) {
          localStorage.setItem('q_auth_token', resData.token);
        }
        return { success: true };
      } else {
        return { success: false, message: resData.message || 'Registration failed' };
      }
    } catch (err) {
      return { success: false, message: 'Server communication error' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('q_auth_user');
    localStorage.removeItem('q_auth_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
