import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Input from 'components/Input';
import {AppColors} from 'constants/AppColors';
import Checkbox from 'components/Checkbox';

interface ISignUpScreenProps {}

const SignUpScreen: React.FunctionComponent<ISignUpScreenProps> = props => {
  return (
    <ScrollView style={{backgroundColor: AppColors.screenColor}}>
      <View style={styles.inputContainer}>
        <Input placeholder="Name" />
        <Input placeholder="Email" />
        <Input placeholder="Password" isPassword={true} />
      </View>
      <View>
        <Checkbox />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 56,
    paddingHorizontal: 16,
    gap: 24,
  },
});

export default SignUpScreen;
