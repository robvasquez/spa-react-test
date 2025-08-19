import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { AuthState, AuthActions, AuthUser } from '../features/auth/types/auth.types';
import { authApi } from '../features/auth/api/auth.api';
import { authStorage } from '../features/auth/utils/auth.storage';

type AuthAction =
  | { type: 'SIGNED_IN'; payload: { user: AuthUser; token: string } }
  | { type: 'SIGNED_OUT' }
  | { type: 'RESTORED'; payload: { user: AuthUser; token: string } };

const initialState: AuthState = {
  status: 'idle',
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SIGNED_IN':
      return {
        status: 'authenticated',
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'SIGNED_OUT':
      return {
        status: 'unauthenticated',
      };
    case 'RESTORED':
      return {
        status: 'authenticated',
        user: action.payload.user,
        token: action.payload.token,
      };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthState & AuthActions | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  // Sign-in mutation
  const signInMutation = useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data) => {
      const { user, token } = data;
      authStorage.setUser(user);
      authStorage.setToken(token);
      dispatch({ type: 'SIGNED_IN', payload: { user, token } });
      navigate('/dashboard');
    },
  });

  // Get current user query (for token validation)
  const { refetch: refetchMe } = useQuery({
    queryKey: ['me'],
    queryFn: () => authApi.getMe(state.token!),
    enabled: !!state.token && state.status === 'authenticated',
    retry: false,
  });

  const signIn = useCallback(
    async (payload: { email: string; password: string }) => {
      await signInMutation.mutateAsync(payload);
    },
    [signInMutation]
  );

  const signOut = useCallback(() => {
    authStorage.clear();
    dispatch({ type: 'SIGNED_OUT' });
    navigate('/sign-in');
  }, [navigate]);

  // Handle token validation errors
  useEffect(() => {
    if (state.status === 'authenticated' && state.token) {
      refetchMe().catch(() => {
        // Token is invalid, sign out
        signOut();
      });
    }
  }, [state.status, state.token, refetchMe, signOut]);

  const restore = useCallback(() => {
    const token = authStorage.getToken();
    const user = authStorage.getUser();

    if (token && user) {
      dispatch({ type: 'RESTORED', payload: { user, token } });
    } else {
      dispatch({ type: 'SIGNED_OUT' });
    }
  }, []);

  // Restore auth state on mount
  useEffect(() => {
    restore();
  }, [restore]);

  // Validate token periodically
  useEffect(() => {
    if (state.status === 'authenticated' && state.token) {
      const interval = setInterval(() => {
        refetchMe();
      }, 5 * 60 * 1000); // Check every 5 minutes

      return () => clearInterval(interval);
    }
  }, [state.status, state.token, refetchMe]);

  const value: AuthState & AuthActions = {
    ...state,
    signIn,
    signOut,
    restore,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Export the hook separately to avoid react-refresh warning
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
