import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AppColors} from 'constants/AppColors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {OptionType} from 'components/CustomDropList';
import {useNavigation} from '@react-navigation/native';
import scale from 'constants/Responsive';
import BellIcon from 'assets/svg/BellIcon';
import CustomDropDown from 'components/CustomDropList';
import IncomeStatus from 'assets/svg/IncomeStatus';
import ExpenseStatus from 'assets/svg/ExpenseStatus';
import {ImagesAssets} from 'assets/images/ImagesAssets';
import DateCateButton from 'components/DateCateButton';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface IHomeScreenProps {}

const options: OptionType[] = [
  {
    title: 'January',
    value: 'jan',
  },
  {
    title: 'February',
    value: 'feb',
  },
  {
    title: 'March',
    value: 'mar',
  },
  {
    title: 'April',
    value: 'apr',
  },
  {
    title: 'May',
    value: 'may',
  },
  {
    title: 'June',
    value: 'jun',
  },
  {
    title: 'July',
    value: 'jul',
  },
  {
    title: 'August',
    value: 'aug',
  },
  {
    title: 'September',
    value: 'sep',
  },
  {
    title: 'October',
    value: 'oct',
  },
  {
    title: 'November',
    value: 'nov',
  },
  {
    title: 'December',
    value: 'dec',
  },
];
const HomeScreen: React.FunctionComponent<IHomeScreenProps> = props => {
  const navigation = useNavigation();
  //const [AccBalance, setAccBalance] = useState(Data.GetInstance().getAccBalance())
  const [totalExpense, setTotalExpense] = useState<any>(null);
  const [totalIncome, setTotalIncome] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState<any>(null);
  const fetchAccountsData = useRef<any>(null);

  useEffect(() => {
    fetchAccountsData.current = async () => {
      try {
        await firestore()
          .collection('accounts')
          .where('userId', '==', auth().currentUser?.uid)
          .get()
          .then(querySnapshot => {
            let results = new Map<string, Array<any>>();
            let totalPrice = 0;

            querySnapshot.forEach(documentSnapshot => {
              const data = documentSnapshot.data();
              let key = '';

              const items = {
                id: documentSnapshot.id,
                userId: auth().currentUser?.uid,
                //icon: icons.get(data.type_item.name)?.child,
                title: data.name,
                price: `${'$'}${data.balance}`,
              };
              totalPrice = data.balance + totalPrice;

              const filteredArray = results.get(key) || [];
              results.set(key, [...filteredArray, items]);
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
    fetchAccountsData.current = async () => {
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
    fetchAccountsData.current();
  });

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
        {/* Header */}
        <View style={styles.topContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.avatar}></View>
            <CustomDropDown options={options} zIndex={100} />
            <TouchableOpacity onPress={() => {}}>
              <BellIcon></BellIcon>
            </TouchableOpacity>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Account Balance</Text>
            <Text style={styles.number}>${totalPrice}</Text>
          </View>
          <View style={styles.moneyStatusContainer}>
            <View style={styles.incomeStatus}>
              <IncomeStatus style={styles.iconContainer}></IncomeStatus>
              <View style={styles.statusTitleContainer}>
                <Text style={styles.statusTitle}>Income</Text>
                <Text style={styles.moneyTitle}>${totalIncome}</Text>
              </View>
            </View>
            <View style={styles.expenseStatus}>
              <ExpenseStatus></ExpenseStatus>
              <View style={styles.statusTitleContainer}>
                <Text style={styles.statusTitle}>Expense</Text>
                <Text style={styles.moneyTitle}>${totalExpense}</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.statusSpend}>Spend Frequency</Text>
        <View style={styles.chartContainer}>
          <Image source={ImagesAssets.chart}></Image>
        </View>
        <View style={styles.buttonContainer}>
          <DateCateButton></DateCateButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    width: scale(375),
    height: scale(312),
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    backgroundColor: '#FFF6E5',
  },
  avatar: {
    width: scale(40),
    height: scale(40),
    borderRadius: 40,
    backgroundColor: AppColors.mistyRose,
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 12,
    zIndex: 100,
  },
  titleContainer: {
    zIndex: 70,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: scale(14),
    color: AppColors.secondaryTextColor,
  },
  number: {
    fontSize: scale(40),
    fontFamily: 'Inter-SemiBold',
    color: AppColors.textColor,
  },
  moneyStatusContainer: {
    width: scale(334),
    height: scale(80),
    marginTop: scale(27),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  incomeStatus: {
    width: scale(164),
    height: '100%',
    borderRadius: 28,
    backgroundColor: AppColors.primaryGreen,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  expenseStatus: {
    width: scale(164),
    height: '100%',
    borderRadius: 28,
    backgroundColor: AppColors.red,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: scale(5),
  },
  statusTitleContainer: {
    marginLeft: scale(5),
    height: scale(48),
    justifyContent: 'space-between',
  },
  statusTitle: {
    fontSize: scale(14),
    fontFamily: 'Inter-Medium',
    color: AppColors.white,
  },
  moneyTitle: {
    fontSize: scale(22),
    fontFamily: 'Inter-SemiBold',
    color: AppColors.white,
  },
  statusSpend: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: AppColors.black,
    marginLeft: scale(8),
    padding: scale(8),
  },
  chartContainer: {
    width: '100%',
    height: scale(186),
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: scale(9),
  },
});

export default HomeScreen;
