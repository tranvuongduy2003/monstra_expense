import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {AppColors} from 'constants/AppColors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import Dropdown from 'components/Dropdown';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  AdjustmentsHorizontalIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import Phase from './components/Phase';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  ArrowsRightLeftIcon,
  BanknotesIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon,
  ShoppingBagIcon,
  TruckIcon,
} from 'react-native-heroicons/solid';
import FilterBottomSheet from './components/FilterBottomSheet';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {OptionType} from 'types/option.type';
import {
  expenseCategoryOptions,
  incomeCategoryOptions,
} from 'constants/Category';

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
    value: 'year',
  },
];

type IconType = {
  bgColor: string;
  child: ReactElement;
};

const icons = new Map<string, IconType>();
icons.set('salary', {
  bgColor: AppColors.primaryGreen100,
  child: <BanknotesIcon color={AppColors.primaryGreen} fontSize={30} />,
});
icons.set('passive-income', {
  bgColor: AppColors.black100,
  child: <ShoppingBagIcon color={AppColors.black} fontSize={30} />,
});
icons.set('shopping', {
  bgColor: AppColors.yellow100,
  child: <ShoppingBagIcon color={AppColors.yellow} fontSize={30} />,
});
icons.set('subscription', {
  bgColor: AppColors.primaryColor100,
  child: (
    <ClipboardDocumentListIcon color={AppColors.primaryColor} fontSize={30} />
  ),
});
icons.set('food', {
  bgColor: AppColors.red100,
  child: <BuildingStorefrontIcon color={AppColors.red} fontSize={30} />,
});
icons.set('transportation', {
  bgColor: AppColors.primaryBlue100,
  child: <TruckIcon color={AppColors.primaryBlue} fontSize={30} />,
});

const TransactionScreen: React.FunctionComponent<
  ITransactionScreenProps
> = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [filterBy, setFilterBy] = useState<OptionType | null>();
  const [orderBy, setOrderBy] = useState<OptionType | null>();
  const [categories, setCategories] = useState<any>(
    [...incomeCategoryOptions, ...expenseCategoryOptions].map(option => ({
      checked: false,
      ...option,
    })),
  );

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Map<string, Array<any>>>();
  const [filterTime, setFilterTime] = useState<any>(options[1]);
  const [filterType, setFilterType] = useState<any>([
    'expense',
    'income',
    'transfer',
  ]);
  const [sortBy, setSortBy] = useState<any>({
    field: 'createdAt',
    order: 'desc',
  });
  const [filterCategories, setFilterCategories] = useState<any>([
    ...incomeCategoryOptions,
    ...expenseCategoryOptions,
  ]);

  const filterRef = useRef<BottomSheet>(null);
  const fetchTransactionsData = useRef<any>(null);

  const handleFilterSheetChanges = useCallback((index: number) => {
    filterRef.current?.snapToIndex(index);
    setShowFilter(true);
    navigation.setOptions({tabBarStyle: {display: 'none'}});
  }, []);

  useEffect(() => {
    fetchTransactionsData.current = async () => {
      try {
        await firestore()
          .collection('transactions')
          .where('userId', '==', auth().currentUser?.uid)
          .where('type', 'in', filterType)
          // .where('category', 'in', filterCategories)
          .orderBy(sortBy.field, sortBy.order)
          .get()
          .then(querySnapshot => {
            let results = new Map<string, Array<any>>();
            let dateOptions: any;

            switch (filterTime.value) {
              case 'week':
                dateOptions = {weekday: 'long'};
                break;
              case 'month':
                dateOptions = {month: 'long', day: 'numeric'};
                break;
              case 'year':
                dateOptions = {year: 'numeric', month: 'long'};
                break;

              default:
                break;
            }

            querySnapshot.forEach(documentSnapshot => {
              const data = documentSnapshot.data();
              const itemDate = data.createdAt.toDate();
              let key = '';

              if (filterTime.value === 'week') {
                const firstDayOfWeek = new Date();
                const weekDayDigit = firstDayOfWeek.getDay();
                firstDayOfWeek.setDate(
                  firstDayOfWeek.getDate() -
                    ((((weekDayDigit - 1) % 7) + 7) % 7),
                );
                if (itemDate < firstDayOfWeek) {
                  return;
                } else {
                  const weekday = [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                  ];
                  key = weekday[itemDate.getDay()];
                }
              } else if (filterTime.value === 'month') {
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                if (itemDate < firstDay) {
                  return;
                } else {
                  key = itemDate.toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                  });
                }
              } else if (filterTime.value === 'year') {
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), 1, 1);
                if (itemDate < firstDay) {
                  return;
                } else {
                  key = itemDate.toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  });
                }
              }

              if (
                data.type !== 'transfer' &&
                !filterCategories
                  .map(item => item.value)
                  .includes(data.category?.value || '')
              ) {
                return;
              }

              const items = {
                id: documentSnapshot.id,
                userId: auth().currentUser?.uid,
                icon:
                  data.type !== 'transfer' ? (
                    icons.get(data.category?.value || '')?.child
                  ) : (
                    <ArrowsRightLeftIcon
                      color={AppColors.primaryBlue}
                      fontSize={30}
                    />
                  ),
                title:
                  data.type !== 'transfer' ? data.category.title : 'Transfer',
                desc: data.title,
                price: data.balance,
                time: itemDate.toLocaleTimeString('vi-VI', {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
                iconBgColor:
                  data.type !== 'transfer'
                    ? icons.get(data.category?.value || '')?.bgColor
                    : AppColors.primaryBlue100,
                type: data.type,
              };

              const filteredArray = results.get(key) || [];
              results.set(key, [...filteredArray, items]);
            });
            setTransactions(results);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTransactionsData.current();
    return fetchTransactionsData.current;
  }, [filterType, filterCategories, sortBy, filterTime, isFocused]);

  const handleApplyFilter = (
    filter: string,
    sort: string,
    selectedCategories: any,
  ) => {
    let filterOption: any = [];
    switch (filter) {
      case 'income':
        filterOption = ['income'];
        break;
      case 'expense':
        filterOption = ['expense'];
        break;
      case 'transfer':
        filterOption = ['transfer'];
        break;

      default:
        filterOption = ['expense', 'income', 'transfer'];
        break;
    }
    setFilterType(filterOption);

    let sortOption: any = {};
    switch (sort) {
      case 'highest':
        sortOption = {field: 'balance', order: 'desc'};
        break;
      case 'lowest':
        sortOption = {field: 'balance', order: 'asc'};
        break;
      case 'newest':
        sortOption = {field: 'createdAt', order: 'asc'};
        break;
      case 'oldest':
        sortOption = {field: 'createdAt', order: 'desc'};
        break;

      default:
        sortOption = {field: 'createdAt', order: 'asc'};
        break;
    }
    setSortBy(sortOption);

    if (selectedCategories && selectedCategories.length > 0) {
      setFilterCategories([...selectedCategories]);
    } else {
      setFilterCategories([
        ...incomeCategoryOptions,
        ...expenseCategoryOptions,
      ]);
    }
  };

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
          <Dropdown
            options={options}
            zIndex={50}
            select={filterTime}
            setSelect={setFilterTime}
          />
          <View style={{flex: 1}}></View>
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
          {Array.from(transactions?.keys() || []).map(key => (
            <Phase
              key={key}
              timeTitle={key as string}
              transactions={transactions?.get(key as string)}
            />
          ))}
        </ScrollView>
      </ScrollView>
      {showFilter && (
        <FilterBottomSheet
          bottomSheetRef={filterRef}
          setShow={setShowFilter}
          handleApply={handleApplyFilter}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          categories={categories}
          setCategories={setCategories}
        />
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
    zIndex: 100,
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
