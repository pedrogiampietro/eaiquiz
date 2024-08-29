import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from 'services/api';
import { AuthContextType, User } from 'types/auth';
import { ToastAndroid } from 'react-native';
import { useRouter } from 'expo-router';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const token = await AsyncStorage.getItem('token@eaiquiz');
        const refreshToken = await AsyncStorage.getItem('refreshToken@eaiquiz');
        const user = await AsyncStorage.getItem('user@eaiquiz');

        if (token && refreshToken && user) {
          setUser(JSON.parse(user) as User);
          const api = await apiClient();
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          await AsyncStorage.removeItem('user@eaiquiz');
          await AsyncStorage.removeItem('token@eaiquiz');
          await AsyncStorage.removeItem('refreshToken@eaiquiz');
          router.push('/login');
        }
      } catch (error) {
        console.error('Error loading storage data:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const api = await apiClient();
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data.user);

      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      await AsyncStorage.setItem('token@eaiquiz', data.token);
      await AsyncStorage.setItem('refreshToken@eaiquiz', data.refreshToken);
      await AsyncStorage.setItem('user@eaiquiz', JSON.stringify(data.user));
    } catch (error) {
      ToastAndroid.show('Erro ao fazer login', ToastAndroid.SHORT);
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('token@eaiquiz');
    await AsyncStorage.removeItem('refreshToken@eaiquiz');
    await AsyncStorage.removeItem('user@eaiquiz');
    router.push('/login');
  };

  const refreshTokenIfNeeded = async () => {
    if (token && refreshToken) {
      try {
        const api = await apiClient();
        const { data } = await api.post('/auth/refresh', { refreshToken });
        setToken(data.token);
        setRefreshToken(data.refreshToken);

        // Check before setting in AsyncStorage
        if (data.token) {
          await AsyncStorage.setItem('token@eaiquiz', data.token);
        } else {
          await AsyncStorage.removeItem('token@eaiquiz');
        }

        if (data.refreshToken) {
          await AsyncStorage.setItem('refreshToken@eaiquiz', data.refreshToken);
        } else {
          await AsyncStorage.removeItem('refreshToken@eaiquiz');
        }
      } catch (error) {
        console.error('Erro ao atualizar o token:', error);
        logout();
      }
    }
  };

  // Função para atualizar o usuário após ganhar experiência
  const updateUser = async () => {
    try {
      const api = await apiClient();
      const { data } = await api.get('/auth/user');
      setUser(data.user);

      await AsyncStorage.setItem('user@eaiquiz', JSON.stringify(data.user));
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        refreshToken,
        login,
        logout,
        loading,
        refreshTokenIfNeeded,
        updateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
