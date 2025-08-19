import { Routes, Route, Navigate } from 'react-router-dom';
import { SignInPage } from '../features/auth/pages/SignInPage';
import { DashboardPage } from '../features/dashboard/pages/DashboardPage';
import { ProtectedRoute } from '../routes/ProtectedRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/sign-in" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/sign-in"
          className="btn-primary"
        >
          Go to Sign In
        </a>
      </div>
    </div>
  );
}
