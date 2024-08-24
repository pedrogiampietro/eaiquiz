import React from 'react';
import { Link, Tabs } from 'expo-router';
import CustomHeaderProfile from '../../components/CustomHeader';
import { TabBarIcon } from '../../components/TabBarIcon';
import { CustomHeaderHome, HeaderButton } from '~/components/HeaderButton';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'white' },
        headerStyle: { backgroundColor: '#6A5AE0' },
        headerTintColor: 'white',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          header: () => <CustomHeaderHome />,
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          header: () => <CustomHeaderProfile />,
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="highscores"
        options={{
          header: () => <CustomHeaderProfile />,
          title: 'Highscores',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
