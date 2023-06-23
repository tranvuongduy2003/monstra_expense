import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import AddNewAccountScreen from 'screens/Auth/AddNewAccountScreen';
import ForgotPasswordScreen from 'screens/Auth/ForgotPasswordScreen';
import LoginScreen from 'screens/Auth/LoginScreen';
import ResetPasswordScreen from 'screens/Auth/ResetPasswordScreen';
import SentEmailScreen from 'screens/Auth/SentEmailScreen';
import SetScreen from 'screens/Auth/SetScreen';
import SetupAccountScreen from 'screens/Auth/SetupAccountScreen';
import SignUpScreen from 'screens/Auth/SignupScreen';
import SplashScreen from 'screens/Auth/SplashScreen';
import HeaderBar from 'screens/layout/HeaderBar';

import {AppColors} from 'constants/AppColors';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

interface IAuthStackProps {}

const AuthStack: React.FunctionComponent<IAuthStackProps> = props => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '519891393566-e1qnm5re5mphlfsrbosr05v3bdph1t6h.apps.googleusercontent.com',
    });
  }, []);

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
        name="SetupAccount"
        component={SetupAccountScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Set"
        component={SetScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
