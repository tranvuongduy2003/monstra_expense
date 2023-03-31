import React from 'react';
import {View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import {useNavigation} from '@react-navigation/native';
import Input from 'components/Input';
import AppButton from 'components/AppButton';

interface IResetPasswordScreenProps {}

const ResetPasswordScreen: React.FunctionComponent<
  IResetPasswordScreenProps
> = props => {
  const navigation = useNavigation();

  const handleResetPassword = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{backgroundColor: AppColors.screenColor}}>
        <View style={styles.inputContainer}>
          <Input placeholder="New Password" isPassword={true} />
          <Input placeholder="Retype new password" isPassword={true} />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Continue"
            backgroundColor={AppColors.primaryColor}
            onPress={handleResetPassword}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  inputContainer: {
    marginTop: 56,
    paddingHorizontal: 16,
    gap: 24,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 40,
  },
  forgetPasswordContainer: {
    marginTop: 33,
    marginBottom: 38,
  },
  forgetPasswordText: {
    textAlign: 'center',
    color: AppColors.primaryColor,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
  },
};

export default ResetPasswordScreen;
