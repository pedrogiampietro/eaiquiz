import { Stack } from 'expo-router';
import { AuthProvider } from 'contexts/AuthContext';

export const unstable_settings = {
  initialRouteName: 'login',
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="duel-quiz" />
      </Stack>
    </AuthProvider>
  );
}
