import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native';

interface IVerificationScreenProps {}

const VerificationScreen: React.FunctionComponent<
  IVerificationScreenProps
> = props => {
  return (
    <SafeAreaView>
      <Text>Verification Screen</Text>
    </SafeAreaView>
  );
};

export default VerificationScreen;
