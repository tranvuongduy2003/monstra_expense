import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'screens/Auth/SplashScreen';
import SignUpScreen from 'screens/Auth/SignupScreen';
import VerificationScreen from 'screens/Auth/VerificationScreen';
import LoginScreen from 'screens/Auth/LoginScreen';
import HeaderBar from 'screens/layout/HeaderBar';
import ProfileScreen from 'screens/Profile/ProfileScreen';
import ForgotPasswordScreen from 'screens/Auth/ForgotPasswordScreen';
import SentEmailScreen from 'screens/Auth/SentEmailScreen';
import ResetPasswordScreen from 'screens/Auth/ResetPasswordScreen';
import SetupPINScreen from 'screens/Auth/SetupPINScreen';
import RetypePINScreen from 'screens/Auth/RetypePINScreen';
import SetupAccountScreen from 'screens/Auth/SetupAccountScreen';
import AddNewAccountScreen from 'screens/Auth/AddNewAccountScreen';
import SetScreen from 'screens/Auth/SetScreen';
import SettingsScreen from 'screens/Auth/Settings/SettingScreen';
import CurrencyScreen from 'screens/Auth/Settings/CurrencyScreen';
import LanguageScreen from 'screens/Auth/Settings/LanguageScreen';
import ThemeScreen from 'screens/Auth/Settings/ThemeScreen';
import SecurityScreen from 'screens/Auth/Settings/SecurityScreen';
import NotificationScreen from 'screens/Auth/Settings/Notification';

import {AppColors} from 'constants/AppColors';

export interface IAppNavigationProps {}

export function AppNavigation(props: IAppNavigationProps) {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            header: () => <HeaderBar name="Settings" />,
          }}
        />
        <Stack.Screen
          name="Currency"
          component={CurrencyScreen}
          options={{
            header: () => <HeaderBar name="Currency" />,
          }}
        />
        <Stack.Screen
          name="Language"
          component={LanguageScreen}
          options={{
            header: () => <HeaderBar name="Language" />,
          }}
        />
        <Stack.Screen
          name="Theme"
          component={ThemeScreen}
          options={{
            header: () => <HeaderBar name="Theme" />,
          }}
        />
        <Stack.Screen
          name="Security"
          component={SecurityScreen}
          options={{
            header: () => <HeaderBar name="Security" />,
          }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            header: () => <HeaderBar name="Notification" />,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
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
          name="Verification"
          component={VerificationScreen}
          options={{
            header: () => <HeaderBar name="Verification" />,
          }}
        />
        <Stack.Screen
          name="RetypePIN"
          component={RetypePINScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SetupPIN"
          component={SetupPINScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SetupAccount"
          component={SetupAccountScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddNewAccount"
          component={AddNewAccountScreen}
          options={{
            header: () => (
              <HeaderBar
                name="Add New Account"
                backgroundColor={AppColors.primaryColor}
                color={AppColors.screenColor}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Set"
          component={SetScreen}
          options={{headerShown: false}}
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
