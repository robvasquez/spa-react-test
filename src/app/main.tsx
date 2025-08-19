import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryProvider } from '../providers/QueryProvider';
import { RouterProvider } from '../providers/RouterProvider';
import { AuthProvider } from '../providers/AuthProvider';
import { AppRoutes } from './routes';
import '../styles/index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <QueryProvider>
      <RouterProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </RouterProvider>
    </QueryProvider>
  </React.StrictMode>
);
