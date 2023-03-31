import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

interface ILoginScreenProps {}

const LoginScreen: React.FunctionComponent<ILoginScreenProps> = props => {
  return (
    <SafeAreaView>
      <Text>Login</Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
