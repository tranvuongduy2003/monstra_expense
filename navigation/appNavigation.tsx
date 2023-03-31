import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'screens/Auth/SplashScreen';
import SignUpScreen from 'screens/Auth/SignupScreen';
import VerificationScreen from 'screens/Auth/VerificationScreen';
import LoginScreen from 'screens/Auth/LoginScreen';
import HeaderBar from 'screens/layout/HeaderBar';
import ForgotPasswordScreen from 'screens/Auth/ForgotPasswordScreen';
import SentEmailScreen from 'screens/Auth/SentEmailScreen';
import ResetPasswordScreen from 'screens/Auth/ResetPasswordScreen';

export interface IAppNavigationProps {}

export function AppNavigation(props: IAppNavigationProps) {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Verification"
          component={VerificationScreen}
          options={{
            header: () => <HeaderBar name="Verification" />,
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
            header: () => <HeaderBar name="Login" />,
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{
            header: () => <HeaderBar name="Forgot Password" />,
          }}
        />
        <Stack.Screen
          name="SentEmail"
          component={SentEmailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPasswordScreen}
          options={{
            header: () => <HeaderBar name="Reset Password" />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
