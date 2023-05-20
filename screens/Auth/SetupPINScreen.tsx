import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {AppColors} from 'constants/AppColors';
import SecureCodeInput from './components/code/SecureCodeInput';
import KeyboardCell from './components/custom/KeyboardCell';
import CustomKeyboard from './components/custom/CustomKeyboard';
import {useNavigation} from '@react-navigation/native';

interface ISetupPINScreenProps {}

const SetupPINScreen: React.FunctionComponent<ISetupPINScreenProps> = props => {
  const navigation: any = useNavigation();
  const [pin, setPin] = useState<string>('');

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
            <Text style={styles.headingText}>Let's setup your PIN</Text>
          </View>
          <View style={styles.codeContainer}>
            <SecureCodeInput pin={pin} />
          </View>
        </View>
        <View>
          <CustomKeyboard
            onSelectNumber={(number: number) =>
              pin.length < 4 && setPin(cur => cur + JSON.stringify(number))
            }
            onSubmit={() => navigation.navigate('RetypePIN', {pin: pin})}
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

export default SetupPINScreen;
