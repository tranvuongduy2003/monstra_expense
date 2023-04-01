import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import {AppColors} from 'constants/AppColors';
import AppButton from 'components/AppButton';
import {useNavigation} from '@react-navigation/native';
import CodeInput from './components/code/CodeInput';

interface IVerificationScreenProps {}

const VerificationScreen: React.FunctionComponent<
  IVerificationScreenProps
> = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>
            Enter your{'\n'}Verification Code
          </Text>
        </View>
        <View style={styles.codeContainer}>
          <CodeInput />
        </View>
        <View style={styles.contentContainer}>
          <View>
            <Text style={styles.timer}>04:59</Text>
          </View>
          <Text style={styles.contentText}>
            We send verification code to your email{' '}
            <Text style={{color: AppColors.primaryColor}}>
              brajaoma*****@gmail.com
            </Text>
            . You can check your inbox.
          </Text>
          <Text
            style={[
              styles.contentText,
              {color: AppColors.primaryColor, textDecorationLine: 'underline'},
            ]}>
            I didn't received the code? Send again
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton title="Verify" backgroundColor={AppColors.primaryColor} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    paddingHorizontal: 16,
  },
  headingText: {
    fontWeight: '500',
    fontSize: 36,
    lineHeight: 44,
    color: AppColors.primaryTextColor,
  },
  codeContainer: {
    marginTop: 53,
  },
  contentContainer: {
    paddingHorizontal: 15,
    gap: 16,
    marginVertical: 47,
  },
  timer: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: AppColors.primaryColor,
  },
  contentText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: AppColors.primaryTextColor,
  },
  buttonContainer: {
    marginBottom: 50,
    paddingHorizontal: 20,
  },
});

export default VerificationScreen;
