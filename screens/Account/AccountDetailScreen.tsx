import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import AccountIcon from 'assets/svg/AccountIcon';
import {
  BanknotesIcon,
  ClipboardDocumentListIcon,
  ShoppingBagIcon,
  TruckIcon,
} from 'react-native-heroicons/solid';
import Phase from 'screens/Transaction/components/Phase';

interface IAccountDetailScreenProps {}

// DUMMY DATA
const todayTransactions = [
  {
    id: 1,
    icon: <ShoppingBagIcon color={AppColors.yellow} fontSize={30} />,
    title: 'Shopping',
    desc: 'Buy some grocery',
    price: '-120$',
    time: '10:00 AM',
    iconBgColor: AppColors.yellow100,
    negative: true,
  },
  {
    id: 2,
    icon: (
      <ClipboardDocumentListIcon color={AppColors.primaryColor} fontSize={30} />
    ),
    title: 'Subscription',
    desc: 'Disney+ Annual Subscription',
    price: '-80$',
    time: '03:30 PM',
    iconBgColor: AppColors.primaryColor100,
    negative: true,
  },
  {
    id: 3,
    icon: <ShoppingBagIcon color={AppColors.red} fontSize={30} />,
    title: 'Food',
    desc: 'Buy a ramen',
    price: '-32$',
    time: '07:30 PM',
    iconBgColor: AppColors.red100,
    negative: true,
  },
];

const yesterdayTransactions = [
  {
    id: 1,
    icon: <BanknotesIcon color={AppColors.primaryGreen} fontSize={30} />,
    title: 'Salary',
    desc: 'Salary for July',
    price: '+5000$',
    time: '04:30 PM',
    iconBgColor: AppColors.primaryGreen100,
    negative: false,
  },
  {
    id: 2,
    icon: <TruckIcon color={AppColors.primaryBlue} fontSize={30} />,
    title: 'Transportation',
    desc: 'Charging Tesla',
    price: '-18$',
    time: '08:30 PM',
    iconBgColor: AppColors.primaryBlue100,
    negative: true,
  },
];

const AccountDetailScreen: React.FunctionComponent<
  IAccountDetailScreenProps
> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View>
          <View style={styles.walletContainer}>
            <View style={styles.icons}>
              <AccountIcon></AccountIcon>
            </View>
            <Text style={styles.contentTitle}>Paypal</Text>
          </View>
        </View>
        <ScrollView>
          <Phase timeTitle="Today" transactions={todayTransactions} />
          <Phase timeTitle="Yesterday" transactions={yesterdayTransactions} />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  walletContainer: {
    marginTop: scale(31),
    alignItems: 'center',
    marginBottom: scale(103),
  },
  icons: {
    width: scale(50),
    height: scale(50),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: AppColors.lavender,
  },
  contentTitle: {
    fontSize: scale(24),
    marginTop: scale(8),
    color: AppColors.textColor,
    fontFamily: 'Inter-SemiBold',
  },
});

export default AccountDetailScreen;
