import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import BellIcon from 'assets/svg/BellIcon';
import ExpenseStatus from 'assets/svg/ExpenseStatus';
import IncomeStatus from 'assets/svg/IncomeStatus';
import {DataPoint, LineChart} from 'components/LineChart';
import {AppColors} from 'constants/AppColors';
import {icons} from 'constants/CategoryIcon';
import scale from 'constants/Responsive';
import {AuthContext} from 'providers/AuthProvider';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowsRightLeftIcon} from 'react-native-heroicons/solid';
import {SafeAreaView} from 'react-native-safe-area-context';
import TransactionCard from 'screens/Transaction/components/TransactionCard';
import {OptionType} from 'types/option.type';

const timeOptions: OptionType[] = [
  {
    title: 'Today',
    value: 'today',
  },
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

interface IHomeScreenProps {}

const HomeScreen: React.FunctionComponent<IHomeScreenProps> = props => {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext) as any;

  //const [AccBalance, setAccBalance] = useState(Data.GetInstance().getAccBalance())
  const [totalExpense, setTotalExpense] = useState<any>(null);
  const [totalIncome, setTotalIncome] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState<any>(null);
  const [lineChartData, setLineChartData] = useState<DataPoint[]>([]);
  const [transactions, setTransactions] = useState<any>([]);
  const [timeSelect, setTimeSelect] = useState<OptionType>(timeOptions[0]);

  const fetchAccountsData = useRef<any>(null);
  const fetchAccountTransactionsData = useRef<any>(null);
  const handleFetchTransaction = useRef<any>();

  useEffect(() => {
    fetchAccountsData.current = async () => {
      try {
        await firestore()
          .collection('accounts')
          .where('userId', '==', auth().currentUser?.uid)
          .get()
          .then(querySnapshot => {
            let totalPrice = 0;

            querySnapshot.forEach(documentSnapshot => {
              const data = documentSnapshot.data();
              totalPrice = data.balance + totalPrice;
            });
            //Data.GetInstance().setAccBalance(totalPrice.toString())
            //setWallets(results);
            setTotalPrice(totalPrice);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccountsData.current();
  });

  useEffect(() => {
    fetchAccountTransactionsData.current = async () => {
      try {
        await firestore()
          .collection('transactions')
          .where('userId', '==', auth().currentUser?.uid)
          .get()
          .then(querySnapshot => {
            let totalExpense = 0;
            let totalIncome = 0;

            querySnapshot.forEach(documentSnapshot => {
              const data = documentSnapshot.data();

              if (data.type === 'expense')
                totalIncome = data.balance + totalIncome;
              else if (data.type === 'income')
                totalExpense = data.balance + totalExpense;
            });
            //Data.GetInstance().setAccBalance(totalPrice.toString())
            //setWallets(results);
            setTotalIncome(totalIncome);
            setTotalExpense(totalExpense);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccountTransactionsData.current();
  });

  useEffect(() => {
    handleFetchTransaction.current = async () => {
      try {
        firestore()
          .collection('transactions')
          .where('userId', '==', auth().currentUser?.uid)
          .get()
          .then(querySnapshot => {
            const results: any = [];
            const dataPoints: DataPoint[] = [];

            querySnapshot.forEach(documentSnapshot => {
              const data = documentSnapshot.data();
              const itemDate: Date = data.createdAt.toDate();

              if (timeSelect.value === 'today') {
                const today = new Date();
                if (
                  itemDate.getDate() !== today.getDate() ||
                  itemDate.getMonth() !== today.getMonth() ||
                  itemDate.getFullYear() !== today.getFullYear()
                ) {
                  return;
                }
              } else if (timeSelect.value === 'week') {
                const firstDayOfWeek = new Date();
                const weekDayDigit = firstDayOfWeek.getDay();
                firstDayOfWeek.setDate(
                  firstDayOfWeek.getDate() -
                    ((((weekDayDigit - 1) % 7) + 7) % 7),
                );
                if (itemDate < firstDayOfWeek) {
                  return;
                }
              } else if (timeSelect.value === 'month') {
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                if (itemDate < firstDay) {
                  return;
                }
              } else if (timeSelect.value === 'year') {
                var date = new Date();
                var firstDay = new Date(date.getFullYear(), 1, 1);
                if (itemDate < firstDay) {
                  return;
                }
              }

              data.type === 'expense' &&
                dataPoints.push({
                  date: itemDate.toISOString(),
                  value: data.balance,
                });

              const item = {
                id: documentSnapshot.id,
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
              results.push(item);
            });

            setLineChartData(
              dataPoints.sort((a, b) => {
                const prevDate = new Date(a.date);
                const nextDate = new Date(b.date);
                return prevDate.getTime() - nextDate.getTime();
              }),
            );
            setTransactions(results);
          });
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchTransaction.current();
  }, [timeSelect]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 70,
        }}>
        {/* Header */}
        <View style={styles.topContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.avatar}>
              {user.avatar && (
                <Image
                  source={{
                    uri: user.avatar,
                  }}
                  style={{width: '96%', height: '96%', borderRadius: 100}}
                />
              )}
            </View>
            <TouchableOpacity onPress={() => {}}>
              <BellIcon></BellIcon>
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Account Balance</Text>
            <Text style={styles.number}>${totalPrice}</Text>
          </View>
          <View style={styles.moneyStatusContainer}>
            <View
              style={[
                styles.moneyStatus,
                {backgroundColor: AppColors.primaryGreen},
              ]}>
              <IncomeStatus />
              <View style={styles.statusTitleContainer}>
                <Text style={styles.statusTitle}>Income</Text>
                <Text style={styles.moneyTitle}>${totalIncome}</Text>
              </View>
            </View>
            <View
              style={[styles.moneyStatus, {backgroundColor: AppColors.red}]}>
              <ExpenseStatus />
              <View style={styles.statusTitleContainer}>
                <Text style={styles.statusTitle}>Expense</Text>
                <Text style={styles.moneyTitle}>${totalExpense}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.spendTitle}>
          <Text style={styles.spendTitleText}>Spend Frequency</Text>
        </View>
        <View style={styles.chartContainer}>
          {lineChartData && lineChartData.length > 0 ? (
            <LineChart data={lineChartData} />
          ) : (
            <Text>No Data</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          {timeOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.buttonChild,
                item.value === timeSelect.value && {
                  backgroundColor: AppColors.yellow100,
                },
              ]}
              onPress={() => setTimeSelect(item)}>
              <Text
                style={[
                  styles.buttonChildText,
                  item.value === timeSelect.value && {
                    color: AppColors.yellow,
                  },
                ]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.transactionTitle}>
          <Text style={styles.transactionTitleText}>Recent Transaction</Text>
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => navigation.navigate('Transaction' as never)}>
            <Text style={styles.seeAllButtonText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View>
          {transactions &&
            transactions.map((transaction: any) => (
              <TransactionCard
                key={transaction.id}
                id={transaction.id}
                icon={transaction.icon}
                title={transaction.title}
                desc={transaction.desc}
                price={transaction.price}
                time={transaction.time}
                iconBgColor={transaction.iconBgColor}
                type={transaction.type}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    paddingBottom: 23,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    backgroundColor: '#FFF6E5',
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#AD00FF',
    overflow: 'hidden',
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 12,
  },
  titleContainer: {
    alignItems: 'center',
    gap: 9,
  },
  title: {
    fontSize: scale(14),
    lineHeight: 17,
    fontWeight: '500',
    color: AppColors.secondaryTextColor,
  },
  number: {
    fontSize: scale(40),
    lineHeight: 48,
    fontWeight: '600',
    color: AppColors.primaryTextColor,
  },
  moneyStatusContainer: {
    marginTop: scale(27),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  moneyStatus: {
    flex: 1,
    borderRadius: 28,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  statusTitleContainer: {
    justifyContent: 'space-between',
  },
  statusTitle: {
    fontSize: scale(14),
    fontWeight: '500',
    lineHeight: 17,
    color: AppColors.whiteText,
  },
  moneyTitle: {
    fontSize: scale(22),
    fontWeight: '600',
    lineHeight: 27,
    color: AppColors.whiteText,
  },
  spendTitle: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  spendTitleText: {
    color: AppColors.primaryTextColor,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
  },
  chartContainer: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  buttonChild: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 40,
  },
  buttonChildText: {
    textAlign: 'center',
    color: AppColors.secondaryTextColor,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },
  transactionTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  transactionTitleText: {
    color: AppColors.primaryTextColor,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
  },
  seeAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: AppColors.primaryColor100,
    borderRadius: 50,
  },
  seeAllButtonText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: AppColors.primaryColor,
  },
});

export default HomeScreen;
