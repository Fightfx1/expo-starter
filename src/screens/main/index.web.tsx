import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './main';
import SettingsScreen from './settings';

const MainNavigator: React.FC<NavigatorProps> = ({
}) => {
  const MainStack = createStackNavigator();
  const Main = () => (
    <MainStack.Navigator>
      <MainStack.Screen
        name={'MainScreen'}
        component={MainScreen}
        options={{
          title: 'Main',
        }}
      />
    </MainStack.Navigator>
  )

  const SettingsStack = createStackNavigator();
  const Settings = () => (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name={'SettingsScreen'}
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </SettingsStack.Navigator>
  )

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = (() => {
            switch (route.name) {
              case 'Main':
                return focused
                  ? 'file-tray-full'
                  : 'file-tray-full-outline';
              case 'Settings':
                return focused
                  ? 'cog'
                  : 'cog-outline';
            }
          })();

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={'Main'}
        component={Main}
        options={{ title: 'Main' }}
      />
      <Tab.Screen
        name={'Settings'}
        component={Settings}
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  )
};

export default MainNavigator;