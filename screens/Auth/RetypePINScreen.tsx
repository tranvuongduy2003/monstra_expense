import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {AppColors} from 'constants/AppColors';
import SecureCodeInput from './components/code/SecureCodeInput';
import KeyboardCell from './components/custom/KeyboardCell';
import CustomKeyboard from './components/custom/CustomKeyboard';
import {useNavigation} from '@react-navigation/native';

interface IRetypePINScreenProps {}

const RetypePINScreen: React.FunctionComponent<
  IRetypePINScreenProps
> = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.primaryColor}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <View style={styles.headingContainer}>
            <Text style={styles.headingText}>Ok. Re type your PIN again.</Text>
          </View>
          <View style={styles.codeContainer}>
            <SecureCodeInput />
          </View>
        </View>
        <View>
          <CustomKeyboard
            onSubmit={() => navigation.navigate('SetupAccount' as never)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    marginVertical: 90,
  },
  headingText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: AppColors.screenColor,
  },
  codeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RetypePINScreen;
