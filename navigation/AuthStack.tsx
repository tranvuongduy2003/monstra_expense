import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ForgotPasswordScreen from 'screens/Auth/ForgotPasswordScreen';
import SentEmailScreen from 'screens/Auth/SentEmailScreen';
import ResetPasswordScreen from 'screens/Auth/ResetPasswordScreen';
import SetupPINScreen from 'screens/Auth/SetupPINScreen';
import RetypePINScreen from 'screens/Auth/RetypePINScreen';
import SetupAccountScreen from 'screens/Auth/SetupAccountScreen';
import AddNewAccountScreen from 'screens/Auth/AddNewAccountScreen';
import SetScreen from 'screens/Auth/SetScreen';
import SplashScreen from 'screens/Auth/SplashScreen';
import SignUpScreen from 'screens/Auth/SignupScreen';
import VerificationScreen from 'screens/Auth/VerificationScreen';
import LoginScreen from 'screens/Auth/LoginScreen';

import HeaderBar from 'screens/layout/HeaderBar';

import {AppColors} from 'constants/AppColors';

import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

interface IAuthStackProps {}

const AuthStack: React.FunctionComponent<IAuthStackProps> = props => {
  const Stack = createNativeStackNavigator();

  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean>(true);

  let routeName: string = '';

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
      } else {
        setIsFirstLaunch(false);
      }
    });

    GoogleSignin.configure({
      webClientId:
        '519891393566-e1qnm5re5mphlfsrbosr05v3bdph1t6h.apps.googleusercontent.com',
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch == true) {
    routeName = 'Splash';
  } else {
    routeName = 'Login';
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
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
  );
};

export default AuthStack;
