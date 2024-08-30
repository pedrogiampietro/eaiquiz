import { useAuth } from '~/hooks/useAuth';
import { AuthProvider } from '../contexts/AuthContext';
import React, { useEffect } from 'react';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <ConditionalLayout />
    </AuthProvider>
  );
}

function ConditionalLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return null;
  }

  return user ? <MainLayout /> : <AuthLayout />;
}
