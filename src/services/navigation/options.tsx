import React from 'react';
import {Platform} from 'react-native';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Colors} from 'react-native-ui-lib';

import {getHeaderBlurEffect} from '../../utils/designSystem';
import {Icon} from '../../components/icon';

export const screenDefaultOptions = (): NativeStackNavigationOptions => ({
  headerShadowVisible: false,
  headerTintColor: Colors.primary,

  // this setup makes large title work on iOS
  ...Platform.select({
    ios: {
      headerLargeTitle: false,
      headerTransparent: false,
      headerBlurEffect: getHeaderBlurEffect(), // this sets up blurred nav bar
      // if you'd like to have a solid color for a nav bar, then you should
      // set up `headerStyle: {backgroundColor: Colors.bg2Color}`
    },
  }),
});

export const tabBarDefaultOptions = (routeName: string, comunity : boolean): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarActiveTintColor: Colors.primary,
  tabBarInactiveTintColor: Colors.grey40,
  tabBarStyle: {backgroundColor: Colors.bgColor, borderTopWidth: 0, elevation: 0},
  tabBarIcon: ({focused, color, size}) => (
    <Icon name={getIconName(routeName, focused)} size={size} color={color} comunity={comunity} />
  ),
});

const getIconName = (routeName: string, focused: boolean): string => {
  if (routeName === 'MainNavigator') {
    return focused ? 'newspaper' : 'newspaper-outline';
  }
  if (routeName === 'ExampleNavigator') {
    return focused ? 'construct' : 'construct';
  }
  if (routeName === 'SettingsNavigator') {
    return focused ? 'cog' : 'cog-outline';
  }
  if (routeName === 'DailyTip') {
    return focused ? 'poker-chip' : 'poker-chip';
  }
  if (routeName == "Premium"){
    return focused ? "crown" : "crown"
  }

  if (routeName == "Profile"){
    return "person-circle-outline"
  }
  return 'list';
};
