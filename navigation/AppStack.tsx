import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HeaderBar from 'screens/layout/HeaderBar';
import ProfileScreen from 'screens/Profile/ProfileScreen';

import SettingsScreen from 'screens/Settings/SettingScreen';
import CurrencyScreen from 'screens/Settings/CurrencyScreen';
import LanguageScreen from 'screens/Settings/LanguageScreen';
import ThemeScreen from 'screens/Settings/ThemeScreen';
import SecurityScreen from 'screens/Settings/SecurityScreen';
import NotificationScreen from 'screens/Settings/Notification';
import ExpenseScreen from 'screens/Expense/ExpenseSreen';
import IncomeScreen from 'screens/Income/IncomeSreen';
import TransferScreen from 'screens/Transfer/TransferSreen';
import ExportScreen from 'screens/Settings/ExportScreen';
import ExporNotitScreen from 'screens/Settings/ExportNotiScreen';
import DetailTransactionScreen from 'screens/Expense/DetailTransactionScreen';
import CreateBudgetScreen from 'screens/Budget/CreateBudgetScreen';
import EditBudgetScreen from 'screens/Budget/EditBudgetScreen';
import DetailBudgetScreen from 'screens/Budget/DetailBudgetScreen';
import AccountScreen from 'screens/Account/AccountScreen';
import AccountDetailScreen from 'screens/Account/AccountDetailScreen';

import Tabs from './Tabs';

import {AppColors} from 'constants/AppColors';

import {TrashIcon} from 'react-native-heroicons/solid';

import {TouchableOpacity} from 'react-native';
import {AuthContext} from 'providers/AuthProvider';

interface IAppStackProps {}

const AppStack: React.FunctionComponent<IAppStackProps> = props => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailAccount"
        component={AccountDetailScreen}
        options={{headerShown: false}}
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
        options={{
          header: () => (
            <HeaderBar
              name="Detail Transaction"
              backgroundColor={AppColors.red}
              color={AppColors.screenColor}
              icon={
                <TouchableOpacity onPress={() => {}}>
                  <TrashIcon color={AppColors.screenColor} />
                </TouchableOpacity>
              }
            />
          ),
        }}
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
