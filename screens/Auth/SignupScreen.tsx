import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Input from 'components/Input';
import {AppColors} from 'constants/AppColors';
import Checkbox from 'components/Checkbox';
import AppButton from 'components/AppButton';
import GoogleIcon from 'assets/svg/GoogleIcon';
import Question from './components/question/Question';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {AuthPayload} from 'types/auth.type';
import {AuthContext} from 'providers/AuthProvider';

interface ISignUpScreenProps {}

const SignUpScreen: React.FunctionComponent<ISignUpScreenProps> = props => {
  const navigation = useNavigation();
  const [signUpPayload, setSignUpPayload] = useState<AuthPayload>({
    email: '',
    password: '',
  });

  const {signUp} = useContext(AuthContext) as any;

  const handleSignUp = async () => {
    try {
      await signUp(signUpPayload);
      navigation.navigate('Verification' as never);
    } catch (error) {}
  };
  const handleSignUpWithGoogle = () => {
    navigation.navigate('Verification' as never);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{backgroundColor: AppColors.screenColor}}>
        <View style={styles.inputContainer}>
          <Input
            onChangeText={val =>
              setSignUpPayload(prev => ({...prev, name: val}))
            }
            placeholder="Name"
          />
          <Input
            onChangeText={val =>
              setSignUpPayload(prev => ({...prev, email: val}))
            }
            placeholder="Email"
          />
          <Input
            onChangeText={val =>
              setSignUpPayload(prev => ({...prev, password: val}))
            }
            placeholder="Password"
            isPassword={true}
          />
        </View>
        <View style={styles.privacyContainer}>
          <Checkbox />
          <Text style={styles.privaryText}>
            By signing up, you agree to the{' '}
            <Text style={{color: AppColors.primaryColor}}>
              Terms of Service and Privacy Policy
            </Text>
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Sign Up"
            backgroundColor={AppColors.primaryColor}
            onPress={handleSignUp}
          />
          <Text style={styles.breakText}>Or with</Text>
          <AppButton onPress={handleSignUpWithGoogle}>
            <View style={styles.googleButtonContent}>
              <GoogleIcon />
              <Text style={styles.googleButtonText}>Sign Up with Google</Text>
            </View>
          </AppButton>
        </View>
        <Question
          content="Already have an account?"
          highlightedContent="Login"
          onPressHighlight={() => navigation.navigate('Login' as never)}
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
  privacyContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    marginTop: 17,
    marginBottom: 27,
  },
  privaryText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
    color: AppColors.primaryTextColor,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  breakText: {
    color: AppColors.secondaryTextColor,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
  },
  googleButtonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  googleButtonText: {
    color: AppColors.primaryTextColor,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
  },
});

export default SignUpScreen;
