import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { ToastAndroid } from 'react-native';

const limit = 20;

export let baseURL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL.startsWith('https')
    ? `${process.env.REACT_APP_API_URL}`
    : process.env.REACT_APP_API_URL
  : 'http://192.168.1.7:5000';

export async function signOut() {
  await AsyncStorage.removeItem('user@eaiquiz');
  await AsyncStorage.removeItem('token@eaiquiz');
  await AsyncStorage.removeItem('refreshToken@eaiquiz');

  ToastAndroid.show('Ahhh, você já está indo? Isso será um até logo! 😁', ToastAndroid.SHORT);

  const router = useRouter();
  router.push('/login');
}

/**
 * Creates an instance of axios with predefined configuration.
 */
export async function apiClient() {
  const token = await AsyncStorage.getItem('token@eaiquiz');

  const api = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  });

  // Request interceptor to add limit header for GET requests
  api.interceptors.request.use(
    (request) => {
      if (request.method?.toLowerCase() === 'get') {
        request.headers.limit = request.headers.limit ?? String(limit);
      }
      return request;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor to handle errors and token expiration
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = await AsyncStorage.getItem('refreshToken@eaiquiz');

        if (refreshToken) {
          try {
            const { data } = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });

            // Save the new tokens
            await AsyncStorage.setItem('token@eaiquiz', data.token);
            await AsyncStorage.setItem('refreshToken@eaiquiz', data.refreshToken);

            // Update the header
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            originalRequest.headers['Authorization'] = `Bearer ${data.token}`;

            return api(originalRequest);
          } catch (refreshError) {
            await signOut();
            return Promise.reject(refreshError);
          }
        } else {
          await signOut();
        }
      } else if (error.response) {
        const errorMessage = error.response.data?.error || 'Erro desconhecido';
        ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
        console.error('Server response error:', error.response);
      } else if (error.request) {
        ToastAndroid.show('Nenhuma resposta recebida do servidor.', ToastAndroid.SHORT);
        console.error('No response received:', error.request);
        await signOut();
      } else {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
        console.error('Request configuration error:', error.message);
      }

      return Promise.reject(error);
    }
  );

  return api;
}
