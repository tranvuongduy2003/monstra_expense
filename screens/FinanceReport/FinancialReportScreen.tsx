import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
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
import TransactionCard from 'screens/Transaction/components/TransactionCard';
import {OptionType} from 'types/option.type';
import CategorySelector from './components/CategorySelector';

interface IFinancialReportScreenProps {}

const options: OptionType[] = [
  {value: 'expense', title: 'Expense'},
  {value: 'income', title: 'Income'},
];

const FinancialReportScreen: React.FunctionComponent<
  IFinancialReportScreenProps
> = () => {
  const [select, setSelect] = useState<string>(options[0].value);
  const [category, setCatogory] = useState<OptionType | null>();
  const [transactions, setTransactions] = useState<any>([]);
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

            querySnapshot.forEach(documentSnapshot => {
              const data = documentSnapshot.data();
              const itemDate = data.createdAt.toDate();

              if (category && data.category.value !== category.value) {
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

            setTransactions(results);
          });
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchTransaction.current();
  }, [select, category, order]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.white}}>
      <View style={styles.menu}>
        {options.map((option, index) => (
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
              setCatogory(null);
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
          {select === options[0].value && (
            <CategorySelector
              options={expenseCategoryOptions}
              zIndex={10}
              select={category as OptionType}
              setSelect={setCatogory}
            />
          )}
          {select === options[1].value && (
            <CategorySelector
              options={incomeCategoryOptions}
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
            <BarsArrowUpIcon style={styles.orderIcon as any} />
          ) : (
            <BarsArrowDownIcon style={styles.orderIcon as any} />
          )}
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{backgroundColor: AppColors.white}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
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
  orderIcon: {
    color: AppColors.primaryTextColor,
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
});

export default FinancialReportScreen;
