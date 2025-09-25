import { AuthGuard } from '@/components/common/auth-guard.tsx';
import { AuthLayout } from '@/layout/AuthLayout.tsx';
import { DefaultLayout } from '@/layout/DefaultLayout.tsx';
import AuthContextProvider from '@/providers/auth-context-provider.tsx';
import { Navigate } from 'react-router';

/**
 * MainLayoutWrapper component with auth context and default layout
 */
export function MainLayoutWrapper() {
  return (
    <AuthContextProvider>
      {/*<AuthGuard>*/}
      <DefaultLayout />
      {/*</AuthGuard>*/}
    </AuthContextProvider>
  );
}

/**
 * AuthLayoutWrapper component with auth layout
 */
export function AuthLayoutWrapper() {
  return <AuthLayout />;
}

/**
 * RootRedirect component to redirect to the dashboard
 */
export function RootRedirect() {
  return <Navigate to="/dashboard" replace />;
}
