import React from 'react';
import { Link, Tabs } from 'expo-router';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import CustomHeaderProfile from '../../components/CustomHeader';
import { CustomHeaderHome, HeaderButton } from '~/components/HeaderButton';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#6A5AE0',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ color }) => {
          let iconName = null as any;
          if (route.name === 'index') {
            iconName = 'home';
          } else if (route.name === 'profile') {
            iconName = 'user';
          } else if (route.name === 'highscores') {
            iconName = 'bar-chart-2';
          }
          return <Feather name={iconName} size={24} color={color} />;
        },
        headerStyle: { backgroundColor: '#6A5AE0' },
        headerTintColor: 'white',
      })}>
      <Tabs.Screen
        name="index"
        options={{
          header: () => <CustomHeaderHome />,
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
          headerRight: () => (
            <Link href="/duel-quiz" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          header: () => <CustomHeaderProfile />,
          title: 'Discover',
          tabBarIcon: ({ color }) => <Feather name="search" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="find-battle"
        options={{
          header: () => <CustomHeaderProfile />,
          title: 'Find Battle',
          tabBarIcon: ({ color }) => (
            <Link href="/find-battle" asChild>
              <TouchableOpacity style={styles.fabButton}>
                <FontAwesome name="plus" size={24} color="white" />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="highscores"
        options={{
          header: () => <CustomHeaderProfile />,
          title: 'Highscores',
          tabBarIcon: ({ color }) => <Feather name="bar-chart-2" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          header: () => <CustomHeaderProfile />,
          title: 'Profile',
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'white',
    borderTopWidth: 0,
    elevation: 10,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  fabButton: {
    backgroundColor: '#6A5AE0',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
