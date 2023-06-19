import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {DataPoint, LineChart} from 'components/LineChart';
import PieChart, {PieSection} from 'components/PieChart';
import {AppColors} from 'constants/AppColors';
import {
  expenseCategoryOptions,
  incomeCategoryOptions,
} from 'constants/Category';
import {icons} from 'constants/CategoryIcon';
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ArrowsRightLeftIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from 'react-native-heroicons/outline';
import {
  ChartPieIcon,
  PresentationChartLineIcon,
} from 'react-native-heroicons/solid';
import TransactionCard from 'screens/Transaction/components/TransactionCard';
import {OptionType} from 'types/option.type';
import CategorySelector from './components/CategorySelector';

interface IFinancialReportScreenProps {}

const categoryOptions: OptionType[] = [
  {value: 'expense', title: 'Expense'},
  {value: 'income', title: 'Income'},
];

const timeOptions: OptionType[] = [
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

const chartTypeOptions: OptionType[] = [
  {
    title: 'Line',
    value: 'line',
  },
  {
    title: 'Pie',
    value: 'pie',
  },
];

const FinancialReportScreen: React.FunctionComponent<
  IFinancialReportScreenProps
> = () => {
  const [select, setSelect] = useState<string>(categoryOptions[0].value);
  const [timeSelect, setTimeSelect] = useState<OptionType>(timeOptions[1]);
  const [chartType, setChartType] = useState<OptionType | null>(
    chartTypeOptions[0],
  );
  const [category, setCatogory] = useState<OptionType>({
    title: 'All',
    value: 'all',
  });
  const [transactions, setTransactions] = useState<any>([]);
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [pieChartData, setPieChartData] = useState<PieSection[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>();

  const handleFetchTransaction = useRef<any>();

  useEffect(() => {
    handleFetchTransaction.current = async () => {
      try {
        firestore()
          .collection('transactions')
          .where('userId', '==', auth().currentUser?.uid)
          .where('type', '==', select)
          .orderBy('balance', order)
          .get()
          .then(querySnapshot => {
            const results: any = [];
            const dataPoints: DataPoint[] = [];
            const pieData: any = [];
            const expenseValue = new Map<string, number>();
            if (select === categoryOptions[0].value) {
              expenseCategoryOptions.forEach(item => {
                expenseValue.set(item.value, 0);
              });
            } else {
              incomeCategoryOptions.forEach(item => {
                expenseValue.set(item.value, 0);
              });
            }

            querySnapshot.forEach(documentSnapshot => {
              const data = documentSnapshot.data();
              const itemDate: Date = data.createdAt.toDate();

              if (timeSelect.value === 'week') {
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

              const categoryBalance = expenseValue.get(data.category.value);
              expenseValue.set(
                data.category.value,
                categoryBalance + data.balance,
              );

              dataPoints.push({
                date: itemDate.toISOString(),
                value: data.balance,
              });

              if (
                category.value !== 'all' &&
                data.category.value !== category.value
              ) {
                return;
              }

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

            for (let [key, value] of expenseValue) {
              if (value !== 0) {
                pieData.push({
                  color: icons.get(key)?.color,
                  value: value,
                });
              }
            }

            const totalValue = pieData
              .map(item => item.value)
              .reduce((prev, cur) => prev + cur, 0);

            setPieChartData(
              pieData.map(item => ({
                color: item.color,
                percentage: (item.value / totalValue) * 100,
              })),
            );

            setChartData(
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
  }, [select, timeSelect, category, order]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <ScrollView
        style={{backgroundColor: AppColors.white}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={styles.selectChartBar}>
          <View style={styles.timeSelector}>
            <CategorySelector
              options={timeOptions}
              zIndex={10}
              select={timeSelect as OptionType}
              setSelect={setTimeSelect}
            />
          </View>
          <View style={styles.selectChartIconContainer}>
            <TouchableOpacity
              style={[
                styles.selectChartIcon,
                {borderBottomLeftRadius: 8, borderTopLeftRadius: 8},
                chartType?.value === chartTypeOptions[0].value && {
                  borderColor: AppColors.primaryColor,
                  backgroundColor: AppColors.primaryColor,
                },
              ]}
              onPress={() => setChartType(chartTypeOptions[0])}>
              <PresentationChartLineIcon
                size={24}
                color={
                  chartType?.value === chartTypeOptions[0].value
                    ? AppColors.white
                    : AppColors.primaryColor
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.selectChartIcon,
                {borderBottomRightRadius: 8, borderTopRightRadius: 8},
                chartType?.value === chartTypeOptions[1].value && {
                  borderColor: AppColors.primaryColor,
                  backgroundColor: AppColors.primaryColor,
                },
              ]}
              onPress={() => setChartType(chartTypeOptions[1])}>
              <ChartPieIcon
                size={24}
                color={
                  chartType?.value === chartTypeOptions[1].value
                    ? AppColors.white
                    : AppColors.primaryColor
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{height: 220, justifyContent: 'center', alignItems: 'center'}}>
          {chartType?.value === chartTypeOptions[0].value &&
          chartData &&
          chartData.length > 0 ? (
            <LineChart data={chartData} />
          ) : chartType?.value === chartTypeOptions[1].value &&
            pieChartData &&
            pieChartData.length > 0 ? (
            <PieChart data={pieChartData} />
          ) : (
            <Text>No Data</Text>
          )}
        </View>
        <View style={styles.menu}>
          {categoryOptions.map((option, index) => (
            <TouchableOpacity
              style={[
                styles.menuItem,
                select === option.value && {
                  backgroundColor: AppColors.primaryColor,
                },
              ]}
              key={index}
              onPress={() => {
                setSelect(option.value);
                setCatogory({title: 'All', value: 'all'});
              }}>
              <Text
                style={[
                  styles.menuItemText,
                  select === option.value && {color: AppColors.whiteText},
                ]}>
                {option.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.filter}>
          <View style={{width: '50%'}}>
            {select === categoryOptions[0].value && (
              <CategorySelector
                options={[
                  ...expenseCategoryOptions,
                  {title: 'All', value: 'all'},
                ]}
                zIndex={10}
                select={category as OptionType}
                setSelect={setCatogory}
              />
            )}
            {select === categoryOptions[1].value && (
              <CategorySelector
                options={[
                  ...incomeCategoryOptions,
                  {title: 'All', value: 'all'},
                ]}
                zIndex={10}
                select={category as OptionType}
                setSelect={setCatogory}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() =>
              order === 'asc' ? setOrder('desc') : setOrder('asc')
            }>
            {order === 'asc' ? (
              <BarsArrowUpIcon color={AppColors.primaryTextColor} />
            ) : (
              <BarsArrowDownIcon color={AppColors.primaryTextColor} />
            )}
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
  menu: {
    marginHorizontal: 16,
    height: 48,
    backgroundColor: AppColors.borderColor,
    borderRadius: 48,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  menuItem: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48,
  },
  menuItemText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: AppColors.primaryTextColor,
  },
  filter: {
    height: 64,
    paddingHorizontal: 16,
    paddingVertical: 12,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    borderColor: AppColors.borderColor,
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectChartBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 50,
  },
  timeSelector: {
    height: 40,
  },
  selectChartIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectChartIcon: {
    color: AppColors.primaryColor,
    fontSize: 24,
    padding: 12,
    borderColor: AppColors.borderColor,
    borderWidth: 1,
  },
});

export default FinancialReportScreen;
