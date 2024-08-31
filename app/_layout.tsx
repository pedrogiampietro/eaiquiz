import { useAuth } from '~/hooks/useAuth';
import { AuthProvider } from '../contexts/AuthContext';
import React, { useEffect } from 'react';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';

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
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return <ActivityIndicator color="#FFF" />;
  }

  return user ? <MainLayout /> : <AuthLayout />;
}
