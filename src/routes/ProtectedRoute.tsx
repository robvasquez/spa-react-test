import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { status } = useAuth();

  if (status === 'idle') {
    // Still loading auth state
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div 
          className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"
          role="status"
          aria-label="Loading authentication status"
        ></div>
      </div>
    );
  }

  if (status !== 'authenticated') {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}
