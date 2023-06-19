import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AccountDetailScreen from 'screens/Account/AccountDetailScreen';
import AccountScreen from 'screens/Account/AccountScreen';
import AddNewWalletScreen from 'screens/Account/AddNewWalletScreen';
import EditWalletScreen from 'screens/Account/EditWalletScreen';
import CreateBudgetScreen from 'screens/Budget/CreateBudgetScreen';
import DetailBudgetScreen from 'screens/Budget/DetailBudgetScreen';
import EditBudgetScreen from 'screens/Budget/EditBudgetScreen';
import EditExpenseScreen from 'screens/Expense/EditExpenseSreen';
import ExpenseScreen from 'screens/Expense/ExpenseSreen';
import FinancialReportScreen from 'screens/FinanceReport/FinancialReportScreen';
import FinancialSplashScreen from 'screens/FinanceReport/FinancialSplashScreen';
import EditIncomeScreen from 'screens/Income/EditIncomeSreen';
import IncomeScreen from 'screens/Income/IncomeSreen';
import EditProfileScreen from 'screens/Profile/EditProfileScreen';
import ProfileScreen from 'screens/Profile/ProfileScreen';
import CurrencyScreen from 'screens/Settings/CurrencyScreen';
import ExporNotitScreen from 'screens/Settings/ExportNotiScreen';
import ExportScreen from 'screens/Settings/ExportScreen';
import LanguageScreen from 'screens/Settings/LanguageScreen';
import NotificationScreen from 'screens/Settings/Notification';
import SecurityScreen from 'screens/Settings/SecurityScreen';
import SettingsScreen from 'screens/Settings/SettingScreen';
import ThemeScreen from 'screens/Settings/ThemeScreen';
import DetailTransactionScreen from 'screens/Transaction/DetailTransactionScreen';
import EditTransferScreen from 'screens/Transfer/EditTransferSreen';
import TransferScreen from 'screens/Transfer/TransferSreen';
import HeaderBar from 'screens/layout/HeaderBar';

import Tabs from './Tabs';

import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'constants/AppColors';

interface IAppStackProps {}

const AppStack: React.FunctionComponent<IAppStackProps> = props => {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{header: () => <HeaderBar name="Edit Profile"></HeaderBar>}}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{header: () => <HeaderBar name="Account"></HeaderBar>}}
      />
      <Stack.Screen
        name="AddNewWallet"
        component={AddNewWalletScreen}
        options={{
          header: () => (
            <HeaderBar
              name="Add New Wallet"
              backgroundColor={AppColors.primaryColor}
              color={AppColors.screenColor}
            />
          ),
        }}
      />
      <Stack.Screen
        name="EditWallet"
        component={EditWalletScreen}
        options={{
          header: () => (
            <HeaderBar
              name="Edit Wallet"
              backgroundColor={AppColors.primaryColor}
              color={AppColors.screenColor}
            />
          ),
        }}
      />
      <Stack.Screen
        name="DetailAccount"
        component={AccountDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailBudget"
        component={DetailBudgetScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditBudget"
        component={EditBudgetScreen}
        options={{
          header: () => (
            <HeaderBar
              name="Edit Budget"
              backgroundColor={AppColors.primaryColor}
              color={AppColors.screenColor}
            />
          ),
        }}
      />
      <Stack.Screen
        name="CreateBudget"
        component={CreateBudgetScreen}
        options={{
          header: () => (
            <HeaderBar
              name="Create Budget"
              backgroundColor={AppColors.primaryColor}
              color={AppColors.screenColor}
            />
          ),
        }}
      />
      <Stack.Screen
        name="DetailTransaction"
        component={DetailTransactionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ExportNoti"
        component={ExporNotitScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Export"
        component={ExportScreen}
        options={{
          header: () => <HeaderBar name="Export Data" />,
        }}
      />
      <Stack.Screen
        name="FinancialReport"
        component={FinancialReportScreen}
        options={{
          header: () => (
            <HeaderBar
              name="Financial Report"
              backgroundColor={AppColors.white}
              onBack={() => navigation.navigate('Transaction' as never)}
            />
          ),
        }}
      />
      <Stack.Screen
        name="FinancialSplash"
        component={FinancialSplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Expense"
        component={ExpenseScreen}
        options={{
          header: () => (
            <HeaderBar
              name="Expense"
              backgroundColor={AppColors.red}
              color={AppColors.screenColor}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Income"
        component={IncomeScreen}
        options={{
          header: () => (
            <HeaderBar
              name="Income"
              backgroundColor={AppColors.primaryGreen}
              color={AppColors.screenColor}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Transfer"
        component={TransferScreen}
        options={{
          header: () => (
            <HeaderBar
              name="Transfer"
              backgroundColor={AppColors.primaryBlue}
              color={AppColors.screenColor}
            />
          ),
        }}
      />
      <Stack.Screen
        name="EditExpense"
        component={EditExpenseScreen}
        options={{
          header: () => (
            <HeaderBar
              name="Expense"
              backgroundColor={AppColors.red}
              color={AppColors.screenColor}
            />
          ),
        }}
      />
      <Stack.Screen
        name="EditIncome"
        component={EditIncomeScreen}
        options={{
          header: () => (
            <HeaderBar
              name="Income"
              backgroundColor={AppColors.primaryGreen}
              color={AppColors.screenColor}
            />
          ),
        }}
      />
      <Stack.Screen
        name="EditTransfer"
        component={EditTransferScreen}
        options={{
          header: () => (
            <HeaderBar
              name="Transfer"
              backgroundColor={AppColors.primaryBlue}
              color={AppColors.screenColor}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          header: () => <HeaderBar name="Settings" />,
        }}
      />
      <Stack.Screen
        name="Currency"
        component={CurrencyScreen}
        options={{
          header: () => <HeaderBar name="Currency" />,
        }}
      />
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{
          header: () => <HeaderBar name="Language" />,
        }}
      />
      <Stack.Screen
        name="Theme"
        component={ThemeScreen}
        options={{
          header: () => <HeaderBar name="Theme" />,
        }}
      />
      <Stack.Screen
        name="Security"
        component={SecurityScreen}
        options={{
          header: () => <HeaderBar name="Security" />,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          header: () => <HeaderBar name="Notification" />,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
