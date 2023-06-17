import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {AppColors} from 'constants/AppColors';
import {IBudget} from 'interfaces/IBudget';
import {ITransaction} from 'interfaces/Transaction';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Swiper from 'react-native-swiper';
import ExceedLimitSlide from './components/ExceedLimitSlide';
import ExpenseSlide from './components/ExpenseSlide';
import IncomeSlide from './components/IncomeSlide';
import LastSlide from './components/LastSlide';

interface IFinancialSplashScreenProps {}

const FinancialSplashScreen: React.FunctionComponent<
  IFinancialSplashScreenProps
> = () => {
  const [expense, setExpense] = useState<ITransaction[]>([]);
  const [income, setIncome] = useState<ITransaction[]>([]);
  const [budget, setBudget] = useState<IBudget[]>([]);

  const handleFetchData = useRef<any>();

  useEffect(() => {
    handleFetchData.current = () => {
      firestore()
        .collection('transactions')
        .where('userId', '==', auth().currentUser?.uid)
        .get()
        .then(querySnapshot => {
          const expenseResult: any = [];
          const incomeResult: any = [];

          querySnapshot.forEach(documentSnapshot => {
            const data = documentSnapshot.data();
            const itemDate = data.createdAt.toDate();
            const now = new Date();

            if (
              now.getMonth() === itemDate.getMonth() &&
              now.getFullYear() === itemDate.getFullYear()
            ) {
              if (data.type === 'expense') {
                expenseResult.push(data);
              } else if (data.type === 'income') {
                incomeResult.push(data);
              }
            }
          });

          setExpense(expenseResult);
          setIncome(incomeResult);
        });

      firestore()
        .collection('budgets')
        .where('userId', '==', auth().currentUser?.uid)
        .get()
        .then(querySnapshot => {
          const result: any = [];

          querySnapshot.forEach(documentSnapshot => {
            const data = documentSnapshot.data();
            const itemDate = data.createdAt.toDate();
            const now = new Date();

            if (
              now.getMonth() === itemDate.getMonth() &&
              now.getFullYear() === itemDate.getFullYear()
            ) {
              result.push(data);
            }
          });

          setBudget(result);
        });
    };
    handleFetchData.current();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Swiper
        renderPagination={index => (
          <View style={[styles.slideBar]}>
            {Array(4)
              .fill(0)
              .map((item, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.sliderBarItem,
                    index === idx && {opacity: 1},
                  ]}></View>
              ))}
          </View>
        )}>
        <ExpenseSlide data={expense} />
        <IncomeSlide data={income} />
        <ExceedLimitSlide data={budget} />
        <LastSlide />
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  slideBar: {
    height: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2.25,
    position: 'absolute',
    top: 19,
    left: 0,
    right: 0,
  },
  sliderBarItem: {
    borderRadius: 8,
    height: 4,
    flex: 1,
    backgroundColor: AppColors.white,
    opacity: 0.24,
  },
});

export default FinancialSplashScreen;
