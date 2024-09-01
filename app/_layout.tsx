import React, { useEffect } from 'react';
import { useAuth } from '~/hooks/useAuth';
import { AuthProvider } from '../contexts/AuthContext';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout'; // Importando o layout principal
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
    // Se o usuário não estiver carregando e não estiver autenticado, redireciona para a tela de login
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user, router]);

  // Exibe um placeholder enquanto a autenticação está sendo carregada
  if (loading) {
    return null; // Ou um componente de loader
  }

  // Se o usuário não estiver autenticado, retorna o layout de autenticação
  if (!user) {
    return <AuthLayout />;
  }

  // Se o usuário estiver autenticado, retorna o layout principal
  return <MainLayout />;
}
