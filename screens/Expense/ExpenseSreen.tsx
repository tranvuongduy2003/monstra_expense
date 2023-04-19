import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {useNavigation} from '@react-navigation/native';
import Input from 'components/Input';
import AppButton from 'components/AppButton';
import Attachment from 'components/Attachment';
import Toggle from 'components/Toggle';
import Dropdown from 'components/Dropdown';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';

interface IExpenseScreenProps {}

const categoryOptions = [
  {
    title: 'Subscription',
    value: 'subscription',
  },
  {
    title: 'Shopping',
    value: 'shopping',
  },
  {
    title: 'Food',
    value: 'food',
  },
];

const walletOptions = [
  {
    title: 'Momo',
    value: 'momo',
  },
  {
    title: 'Banking',
    value: 'banking',
  },
  {
    title: 'Cash',
    value: 'cash',
  },
];

const ExpenseScreen: React.FunctionComponent<IExpenseScreenProps> = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.red}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}>
        <ClickOutsideProvider>
          <View style={styles.balanceContainer}>
            <Text style={styles.title}>Balance</Text>
            <Text style={styles.amount}>$00.0</Text>
          </View>
          <View style={styles.setupContainer}>
            <View style={styles.inputContainer}>
              <Dropdown
                options={categoryOptions}
                placeholder="Category"
                zIndex={50}
              />
              <Input placeholder="Description" />
              <Dropdown
                options={walletOptions}
                placeholder="Wallet"
                zIndex={40}
              />
              <Attachment />
              <View style={styles.toggleContainer}>
                <View style={styles.toggleTextContainer}>
                  <Text style={styles.toggleTitle}>Repeat</Text>
                  <Text style={styles.toggleDesc}>Repeat transaction</Text>
                </View>
                <View>
                  <Toggle />
                </View>
              </View>
            </View>
            <View>
              <AppButton
                title="Continue"
                backgroundColor={AppColors.primaryColor}
                onPress={() => navigation.navigate('Set' as never)}
              />
            </View>
          </View>
        </ClickOutsideProvider>
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
  toggleTextContainer: {
    gap: 4,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleTitle: {
    color: AppColors.primaryTextColor,
    lineHeight: 19,
    fontSize: 16,
    fontWeight: '500',
  },
  toggleDesc: {
    color: AppColors.secondaryTextColor,
    lineHeight: 16,
    fontSize: 13,
    fontWeight: '500',
  },
});

export default ExpenseScreen;
