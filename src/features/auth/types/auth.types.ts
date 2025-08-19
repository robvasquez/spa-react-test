export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  status: 'idle' | 'authenticated' | 'unauthenticated';
  user?: AuthUser;
  token?: string;
}

export interface AuthActions {
  signIn: (payload: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
  restore: () => void;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  user: AuthUser;
  token: string;
}

export interface ApiError {
  message: string;
  code?: string;
}

// Repository interface for future extensibility
export interface AuthRepository {
  signIn: (credentials: SignInRequest) => Promise<SignInResponse>;
  getMe: (token: string) => Promise<AuthUser>;
}
