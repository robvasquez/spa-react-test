import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { worker } from '../lib/msw/browser';

export function RouterProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Start MSW in development
    if (import.meta.env.DEV) {
      worker.start({
        onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
      }).catch(console.error);
    }
  }, []);

  return <BrowserRouter basename={import.meta.env.DEV ? undefined : '/spa-react-test'}>{children}</BrowserRouter>;
}
