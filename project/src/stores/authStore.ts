import { create } from 'zustand';
import { AuthState, LoginCredentials, User } from '../types/auth';
import { login as loginStorage, logout as logoutStorage, getCurrentUser } from '../lib/storage';

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<User | null>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,

  login: async (credentials) => {
    try {
      const user = loginStorage(credentials.email, credentials.password);
      if (user) {
        set({ user, isAuthenticated: true });
        return user;
      }
      return null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  },

  logout: () => {
    logoutStorage();
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: () => {
    const user = getCurrentUser();
    set({ user, isAuthenticated: !!user });
  }
}));