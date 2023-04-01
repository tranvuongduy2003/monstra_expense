import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {AppColors} from 'constants/AppColors';
import AppButton from 'components/AppButton';
import {useNavigation} from '@react-navigation/native';

interface ISetupAccountScreenProps {}

const SetupAccountScreen: React.FunctionComponent<
  ISetupAccountScreenProps
> = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Let's setup your account!</Text>
          <Text style={styles.description}>
            Account can be your bank, credit card or{'\n'}your wallet.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Let's go"
            backgroundColor={AppColors.primaryColor}
            onPress={() => navigation.navigate('AddNewAccount' as never)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    paddingHorizontal: 16,
    gap: 37,
    marginTop: 111,
  },
  headingText: {
    color: AppColors.primaryTextColor,
    fontSize: 36,
    fontWeight: '500',
    lineHeight: 44,
  },
  description: {
    color: AppColors.primaryTextColor,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 18,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginBottom: 50,
  },
});

export default SetupAccountScreen;
