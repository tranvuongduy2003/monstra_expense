import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AppColors} from 'constants/AppColors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import Dropdown, {OptionType} from 'components/Dropdown';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  AdjustmentsHorizontalIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import Phase from './components/Phase';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  BanknotesIcon,
  ClipboardDocumentListIcon,
  ShoppingBagIcon,
  TruckIcon,
} from 'react-native-heroicons/solid';
import FilterBottomSheet from './components/FilterBottomSheet';
import {useNavigation} from '@react-navigation/native';

interface ITransactionScreenProps {}

const options: OptionType[] = [
  {
    title: 'Week',
    value: 'week',
  },
  {
    title: 'Month',
    value: 'month',
  },
  {
    title: 'Year',
    value: 'Year',
  },
];

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

const TransactionScreen: React.FunctionComponent<
  ITransactionScreenProps
> = props => {
  const navigation = useNavigation();

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const filterRef = useRef<BottomSheet>(null);

  const handleFilterSheetChanges = useCallback((index: number) => {
    filterRef.current?.snapToIndex(index);
    setShowFilter(true);
    navigation.setOptions({tabBarStyle: {display: 'none'}});
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        {showFilter && <View style={styles.overlay}></View>}
        {/* Header */}
        <View style={styles.headerContainer}>
          <Dropdown options={options} zIndex={50} />
          <TouchableOpacity
            onPress={() => handleFilterSheetChanges(0)}
            style={styles.filterContainer}>
            <AdjustmentsHorizontalIcon color={AppColors.primaryTextColor} />
          </TouchableOpacity>
        </View>
        {/* See financial report */}
        <TouchableOpacity style={styles.reportNavigator}>
          <Text style={styles.navigatorText}>See your financial report</Text>
          <ChevronRightIcon color={AppColors.primaryColor} />
        </TouchableOpacity>
        <ScrollView>
          <Phase timeTitle="Today" transactions={todayTransactions} />
          <Phase timeTitle="Yesterday" transactions={yesterdayTransactions} />
        </ScrollView>
      </ScrollView>
      {showFilter && (
        <FilterBottomSheet bottomSheetRef={filterRef} setShow={setShowFilter} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#000000',
    opacity: 0.6,
    position: 'absolute',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  filterContainer: {
    padding: 12,
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    borderRadius: 8,
  },
  reportNavigator: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: AppColors.primaryColor100,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'space-between',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  navigatorText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: AppColors.primaryColor,
  },
});

export default TransactionScreen;
