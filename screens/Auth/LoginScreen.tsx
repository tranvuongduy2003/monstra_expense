import {AppColors} from 'constants/AppColors';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Input from 'components/Input';
import AppButton from 'components/AppButton';
import Question from './components/question/Question';
import {useNavigation} from '@react-navigation/native';

interface ILoginScreenProps {}

const LoginScreen: React.FunctionComponent<ILoginScreenProps> = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{backgroundColor: AppColors.screenColor}}>
        <View style={styles.inputContainer}>
          <Input placeholder="Email" />
          <Input placeholder="Password" isPassword={true} />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton title="Login" backgroundColor={AppColors.primaryColor} />
        </View>
        <TouchableOpacity
          style={styles.forgetPasswordContainer}
          onPress={() => navigation.navigate('ForgotPassword' as never)}>
          <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <Question
          content="Don't have an account yet?"
          highlightedContent="Sign Up"
          onPressHighlight={() => navigation.navigate('SignUp' as never)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default LoginScreen;
