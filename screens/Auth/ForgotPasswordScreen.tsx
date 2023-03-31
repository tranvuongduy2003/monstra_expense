import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {AppColors} from 'constants/AppColors';
import Input from 'components/Input';
import AppButton from 'components/AppButton';
import {useNavigation} from '@react-navigation/native';

interface IForgotPasswordScreenProps {}

const ForgotPasswordScreen: React.FunctionComponent<
  IForgotPasswordScreenProps
> = props => {
  const navigation = useNavigation();

  const handleForgetPassword = () => {
    navigation.navigate('SentEmail' as never);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{backgroundColor: AppColors.screenColor}}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            Don't worry.{'\n'}Enter your email and we'll send you a link to
            reset your password.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input placeholder="Email" />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Continue"
            backgroundColor={AppColors.primaryColor}
            onPress={handleForgetPassword}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    paddingHorizontal: 16,
    marginTop: 85,
  },
  headingText: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 29,
    color: AppColors.primaryTextColor,
  },
  inputContainer: {
    marginTop: 46,
    paddingHorizontal: 16,
    gap: 24,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    gap: 12,
    marginTop: 40,
  },
});

export default ForgotPasswordScreen;
