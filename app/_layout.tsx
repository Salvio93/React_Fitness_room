import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>


      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />



      <Tabs.Screen
        name="statistic"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bar-chart' : 'bar-chart'} color={color} />
          ),
        }}
      />
    
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person'} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="monthly"
        options={{ href: null, }}
      />
       <Tabs.Screen
        name="weekly"
        options={{ href: null, }}
      />
      <Tabs.Screen
      name="dayly_visits"
      options={{ href: null, }}
    />
     <Tabs.Screen
      name="dayly_session"
      options={{ href: null, }}
    />
    <Tabs.Screen
      name="session_detail"
      options={{ href: null, }}
    />

    </Tabs>
  );
}
