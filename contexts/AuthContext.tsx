import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../services/api';
import { AuthContextType, User } from '../types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Verifica o token no AsyncStorage para manter o usuário logado
    const loadStorageData = async () => {
      try {
        const token = await AsyncStorage.getItem('token@eaiquiz');
        const user = await AsyncStorage.getItem('user@eaiquiz');

        if (token && user) {
          setToken(token);
          setUser(JSON.parse(user) as User);
        }
      } catch (error) {
        console.log('Erro ao carregar os dados do storage', error);
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
      setToken(data.token);

      await AsyncStorage.setItem('token@eaiquiz', data.token);
      await AsyncStorage.setItem('user@eaiquiz', JSON.stringify(data.user));
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('token@eaiquiz');
    await AsyncStorage.removeItem('user@eaiquiz');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
