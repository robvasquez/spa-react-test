import type { AuthUser } from '../types/auth.types';

const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  AUTH_USER: 'auth_user',
} as const;

export const authStorage = {
  getToken: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch {
      return null;
    }
  },

  setToken: (token: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch {
      // Silently fail if localStorage is not available
    }
  },

  getUser: (): AuthUser | null => {
    try {
      const userStr = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  setUser: (user: AuthUser): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    } catch {
      // Silently fail if localStorage is not available
    }
  },

  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    } catch {
      // Silently fail if localStorage is not available
    }
  },
};
