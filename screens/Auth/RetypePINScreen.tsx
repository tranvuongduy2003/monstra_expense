import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {AppColors} from 'constants/AppColors';
import SecureCodeInput from './components/code/SecureCodeInput';
import KeyboardCell from './components/custom/KeyboardCell';
import CustomKeyboard from './components/custom/CustomKeyboard';
import {useNavigation, useRoute} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

interface IRetypePINScreenProps {}

const RetypePINScreen: React.FunctionComponent<
  IRetypePINScreenProps
> = props => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {pin} = route.params;

  const [retypePin, setRetypePin] = useState<string>('');
  const [title, setTitle] = useState<string>('Ok. Re type your PIN again.');

  const handleSubmitPin = async () => {
    try {
      if (retypePin !== pin) {
        setTitle('Wrong PIN, try again.');
        setRetypePin('');
      } else {
        await firestore()
          .collection('users')
          .doc(auth()?.currentUser?.uid)
          .update({
            pin: retypePin,
          });
        navigation.navigate('SetupAccount' as never);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
            <Text style={styles.headingText}>{title}</Text>
          </View>
          <View style={styles.codeContainer}>
            <SecureCodeInput pin={retypePin} />
          </View>
        </View>
        <View>
          <CustomKeyboard
            onSelectNumber={(number: number) =>
              retypePin.length < 4 &&
              setRetypePin(cur => cur + JSON.stringify(number))
            }
            onSubmit={handleSubmitPin}
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
