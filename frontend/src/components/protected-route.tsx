'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loading } from './ui/loading';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('ADMIN' | 'SUPERVISOR' | 'CONTRACTOR')[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (allowedRoles && !hasRole(allowedRoles)) {
        router.push('/unauthorized');
      }
    }
  }, [isLoading, isAuthenticated, hasRole, allowedRoles, router]);

  if (isLoading) {
    return <Loading fullScreen />;
  }

  if (!isAuthenticated || (allowedRoles && !hasRole(allowedRoles))) {
    return null;
  }

  return <>{children}</>;
};
