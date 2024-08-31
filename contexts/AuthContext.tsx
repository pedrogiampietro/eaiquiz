import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
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
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // useEffect(() => {
  //   const loadStorageData = async () => {
  //     try {
  //       const storedUser = await AsyncStorage.getItem('user@eaiquiz');

  //       if (storedUser) {
  //         setUser(JSON.parse(storedUser) as User);
  //       } else {
  //         await logout();
  //       }
  //     } catch (error) {
  //       console.error('Error loading storage data:', error);
  //       await logout();
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadStorageData();
  // }, []);

  const login = async (email: string, password: string) => {
    try {
      const api = await apiClient();
      const { data } = await api.post('/auth/login', { email, password });

      setUser(data.user);
      setToken(data.token);

      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

      await AsyncStorage.setItem('token@eaiquiz', data.token);
      await AsyncStorage.setItem('user@eaiquiz', JSON.stringify(data.user));
    } catch (error) {
      ToastAndroid.show('Erro ao fazer login', ToastAndroid.SHORT);
      throw error;
    }
  };

  const logout = useCallback(async () => {
    try {
      // Remova todos os dados armazenados
      await AsyncStorage.removeItem('token@eaiquiz');
      await AsyncStorage.removeItem('refreshToken@eaiquiz');
      await AsyncStorage.removeItem('user@eaiquiz');

      // Limpe o estado do usuário e o token
      setUser(null);
      setToken(null);

      // Navegue para a tela de login
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }, [router]);

  const updateUser = async () => {
    // try {
    //   const api = await apiClient();
    //   const { data } = await api.get('/auth/user');
    //   setUser(data.user);
    //   await AsyncStorage.setItem('user@eaiquiz', JSON.stringify(data.user));
    // } catch (error) {
    //   console.error('Erro ao atualizar usuário:', error);
    // }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        login,
        logout,
        loading,
        updateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
