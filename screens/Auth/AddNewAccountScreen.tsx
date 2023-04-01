import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, View, StyleSheet, Text} from 'react-native';
import {AppColors} from 'constants/AppColors';
import Input from 'components/Input';
import AppButton from 'components/AppButton';
import {useNavigation} from '@react-navigation/native';

interface IAddNewAccountScreenProps {}

const AddNewAccountScreen: React.FunctionComponent<
  IAddNewAccountScreenProps
> = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.primaryColor}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}>
        <View style={styles.balanceContainer}>
          <Text style={styles.title}>Balance</Text>
          <Text style={styles.amount}>$00.0</Text>
        </View>
        <View style={styles.setupContainer}>
          <View style={styles.inputContainer}>
            <Input placeholder="Name" />
            <Input placeholder="Account Type" />
          </View>
          <View>
            <AppButton
              title="Continue"
              backgroundColor={AppColors.primaryColor}
              onPress={() => navigation.navigate('Set' as never)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    paddingHorizontal: 16,
    gap: 13,
    marginBottom: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: AppColors.whiteText,
    opacity: 0.64,
  },
  amount: {
    fontWeight: '600',
    fontSize: 64,
    lineHeight: 77,
    color: AppColors.whiteText,
  },
  setupContainer: {
    backgroundColor: AppColors.screenColor,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 24,
    paddingBottom: 50,
    paddingHorizontal: 16,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 40,
  },
});

export default AddNewAccountScreen;
