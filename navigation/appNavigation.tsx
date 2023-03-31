import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'screens/Auth/SplashScreen';
import SignUpScreen from 'screens/Auth/SignupScreen';
import LoginScreen from 'screens/Auth/LoginScreen';
import HeaderBar from 'screens/layout/HeaderBar';
import ProfileScreen from 'screens/Profile/ProfileScreen';

export interface IAppNavigationProps {}

export function AppNavigation(props: IAppNavigationProps) {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            header: () => <HeaderBar name="Sign Up" />,
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            header: () => <HeaderBar name="Sign Up" />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
