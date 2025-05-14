export type UserRole = 'admin' | 'inspector' | 'engineer';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}