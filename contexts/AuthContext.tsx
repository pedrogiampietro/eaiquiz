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
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const loadStorageData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user@eaiquiz');

        if (isMounted) {
          if (storedUser) {
            setUser(JSON.parse(storedUser) as User);
          } else {
            setLoading(false); // Set loading to false before navigating
            await logout();
          }
        }
      } catch (error) {
        console.error('Error loading storage data:', error);
        if (isMounted) {
          setLoading(false); // Ensure loading is false before navigating
          await logout();
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadStorageData();

    return () => {
      isMounted = false;
    };
  }, []);

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

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('token@eaiquiz');
    await AsyncStorage.removeItem('refreshToken@eaiquiz');
    await AsyncStorage.removeItem('user@eaiquiz');

    const redirectTimer = setTimeout(() => {
      router.push('/login');
    }, 1000);

    return () => clearTimeout(redirectTimer);
  };

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
        login,
        logout,
        loading,
        updateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
