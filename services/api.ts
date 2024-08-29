import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ToastAndroid } from 'react-native';
import { useRouter } from 'expo-router';

const limit = 20;
export const baseURL = process.env.REACT_APP_API_URL || 'http://192.168.1.7:5000';

/**
 * Cria uma instância do axios com configuração predefinida.
 */
export async function apiClient() {
  const token = await AsyncStorage.getItem('token@eaiquiz');

  const api = axios.create({
    baseURL,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  api.interceptors.request.use(
    (request) => {
      if (request.method?.toLowerCase() === 'get') {
        request.headers.limit = request.headers.limit ?? String(limit);
      }
      // console.log('Requisição interceptada:', request);
      return request;
    },
    (error) => {
      // console.error('Erro na requisição:', error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      // console.log('Resposta recebida:', response);
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const router = useRouter();
        await signOut(router);
      } else if (error.response) {
        const errorMessage = error.response.data?.error || 'Erro desconhecido';
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        console.error('Erro de resposta do servidor:', error.response);
      } else if (error.request) {
        ToastAndroid.show('Nenhuma resposta recebida do servidor.', ToastAndroid.SHORT);
        console.error('Nenhuma resposta recebida:', error.request);
        const router = useRouter();
        await signOut(router);
      } else {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        console.error('Erro na configuração da requisição:', error.message);
      }

      return Promise.reject(error);
    }
  );

  return api;
}

/**
 * Função para sair do usuário
 */
export async function signOut(router: any) {
  await AsyncStorage.removeItem('user@eaiquiz');
  await AsyncStorage.removeItem('token@eaiquiz');
  ToastAndroid.show('Ahhh, você já está indo? Isso será um até logo! 😁', ToastAndroid.SHORT);
  if (router) {
    router.push('/login');
  }
}
