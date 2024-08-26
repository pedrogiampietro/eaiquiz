import { useAuth } from '~/hooks/useAuth';
import { AuthProvider } from '../contexts/AuthContext';
import React from 'react';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ConditionalLayout />
    </AuthProvider>
  );
}

function ConditionalLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return user ? <MainLayout /> : <AuthLayout />;
}
