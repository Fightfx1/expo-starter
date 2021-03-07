import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { navBarStyle } from '../../utils/help';

import AuthNavigator from '../auth';
import LandingScreen from './landing';

const LandingNavigator: React.FC<NavigatorProps> = ({
}) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={navBarStyle()}>
      <Stack.Screen
        name={'Landing'}
        component={LandingScreen}
        options={{
          title: 'Landing',
        }}
      />
      <Stack.Screen
        name={'Auth'}
        component={AuthNavigator}
        options={{
          stackPresentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
};

export default LandingNavigator;