import {AppColors} from 'constants/AppColors';
import React, {useContext, useState} from 'react';
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
import {AuthPayload} from 'types/auth.type';
import {AuthContext} from 'providers/AuthProvider';

interface ILoginScreenProps {}

const LoginScreen: React.FunctionComponent<ILoginScreenProps> = props => {
  const [loginPayload, setLoginPayload] = useState<AuthPayload>({
    email: '',
    password: '',
  });

  const {logIn} = useContext(AuthContext) as any;

  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      await logIn(loginPayload);
      // navigation.navigate('Home' as never);
      console.log('Login successfully!');
    } catch (error) {}
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{backgroundColor: AppColors.screenColor}}>
        <View style={styles.inputContainer}>
          <Input
            onChangeText={val =>
              setLoginPayload(prev => ({...prev, email: val}))
            }
            placeholder="Email"
          />
          <Input
            onChangeText={val =>
              setLoginPayload(prev => ({...prev, password: val}))
            }
            placeholder="Password"
            isPassword={true}
          />
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Login"
            backgroundColor={AppColors.primaryColor}
            onPress={handleLogin}
          />
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
