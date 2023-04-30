import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import NotiHeaderBar from 'screens/Notification/NotiHeaderBar';
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
import SettingsScreen from 'screens/Settings/SettingScreen';
import CurrencyScreen from 'screens/Settings/CurrencyScreen';
import LanguageScreen from 'screens/Settings/LanguageScreen';
import ThemeScreen from 'screens/Settings/ThemeScreen';
import SecurityScreen from 'screens/Settings/SecurityScreen';
import NotificationScreen from 'screens/Settings/Notification';
import ExpenseScreen from 'screens/Expense/ExpenseSreen';
import ExportScreen from 'screens/Settings/ExportScreen';
import ExporNotitScreen from 'screens/Settings/ExportNotiScreen';
import DetailTransactionScreen from 'screens/Expense/DetailTransactionScreen';
import IncomeScreen from 'screens/Income/IncomeScreen';
import NotiScreen from 'screens/Notification/NotiScreen';
import NotiEmptyScreen from 'screens/Notification/NotiEmptyScreen';

import Tabs from './Tabs';

import {AppColors} from 'constants/AppColors';
import {TrashIcon} from 'react-native-heroicons/solid';

import {TouchableOpacity} from 'react-native';

export interface IAppNavigationProps {}

export function AppNavigation(props: IAppNavigationProps) {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DetailTransaction"
          component={DetailTransactionScreen}
          options={{
            header: () => (
              <HeaderBar
                name="Detail Transaction"
                backgroundColor={AppColors.red}
                color={AppColors.screenColor}
                icon={
                  <TouchableOpacity onPress={() => {}}>
                    <TrashIcon color={AppColors.screenColor} />
                  </TouchableOpacity>
                }
              />
            ),
          }}
        />
        <Stack.Screen
          name="ExportNoti"
          component={ExporNotitScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Export"
          component={ExportScreen}
        <Stack.Screen
            name="Notification"
            component={NotiScreen}
            options={{
              header: () => (
                <NotiHeaderBar
                  name="Notification"
                />
              ),
            }}
          />
      <Stack.Screen
          name="NotiEmpty"
          component={NotiEmptyScreen}
          options={{
            header: () => (
              <NotiHeaderBar
                name="Notification"
              />
            ),
          }}
        />
        <Stack.Screen
          name="IncomeNew"
          component={IncomeScreen}
          options={{
            header: () => (
              <HeaderBar
                name="Income"
                backgroundColor={AppColors.primaryGreen}
                color={AppColors.screenColor}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Expense"
          component={ExpenseScreen}
          options={{
            header: () => (
              <HeaderBar
                name="Expense"
                backgroundColor={AppColors.red}
                color={AppColors.screenColor}
              />
            ),
          }}
        />
        <Stack.Screen
          name="Export"
          component={ExportScreen}
          options={{
            header: () => <HeaderBar name="Export Data" />,
          }}
        />
        <Stack.Screen
          name="ExportNoti"
          component={ExporNotitScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            header: () => <HeaderBar name="Settings" />,
          }}
        />
        <Stack.Screen
          name="Set-Currency"
          component={CurrencyScreen}
          options={{
            header: () => <HeaderBar name="Currency" />,
          }}
        />
        <Stack.Screen
          name="Set-Language"
          component={LanguageScreen}
          options={{
            header: () => <HeaderBar name="Language" />,
          }}
        />
        <Stack.Screen
          name="Set-Theme"
          component={ThemeScreen}
          options={{
            header: () => <HeaderBar name="Theme" />,
          }}
        />
        <Stack.Screen
          name="Set-Security"
          component={SecurityScreen}
          options={{
            header: () => <HeaderBar name="Security" />,
          }}
        />
        <Stack.Screen
          name="Set-Notification"
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
