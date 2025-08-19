import type { SignInRequest, SignInResponse, AuthUser } from '../types/auth.types';

const API_BASE = '/api';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: 'An unexpected error occurred',
    }));
    
    throw new ApiError(
      errorData.message || `HTTP ${response.status}`,
      response.status,
      errorData.code
    );
  }
  
  return response.json();
}

export const authApi = {
  signIn: async (credentials: SignInRequest): Promise<SignInResponse> => {
    const response = await fetch(`${API_BASE}/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    return handleResponse<SignInResponse>(response);
  },

  getMe: async (token: string): Promise<AuthUser> => {
    const response = await fetch(`${API_BASE}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse<AuthUser>(response);
  },
};
