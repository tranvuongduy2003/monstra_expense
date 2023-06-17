import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import {AppColors} from 'constants/AppColors';
import {AuthContext} from 'providers/AuthProvider';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import {SafeAreaView} from 'react-native-safe-area-context';
import BudgetCard from './components/BudgetCard';

interface IBudgetScreenProps {}

const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const BudgetScreen: React.FunctionComponent<IBudgetScreenProps> = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const {user} = useContext(AuthContext) as any;
  const [budgets, setBudgets] = useState<any>();
  const [selectTime, setSelectTime] = useState<Date>(new Date());

  const handleFetchBudgetData = useRef<any>();

  useEffect(() => {
    handleFetchBudgetData.current = async () => {
      try {
        await firestore()
          .collection('budgets')
          .where('userId', '==', auth().currentUser?.uid)
          .get()
          .then(querySnapshot => {
            const results: any = [];
            querySnapshot.forEach(documentSnapshot => {
              const data = documentSnapshot.data();
              const itemDate = data.createdAt.toDate();

              if (
                selectTime.getMonth() === itemDate.getMonth() &&
                selectTime.getFullYear() === itemDate.getFullYear()
              ) {
                const item = {
                  ...data,
                  id: documentSnapshot.id,
                };
                results.push(item);
              }
            });
            setBudgets(results);
          });
      } catch (error) {
        console.log(error);
      }
    };
    handleFetchBudgetData.current();
  }, [isFocused, selectTime]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: AppColors.primaryColor}}>
      <View style={styles.header}>
        <TouchableOpacity
          disabled={
            selectTime.getMonth() <= user.createdAt.toDate().getMonth() &&
            selectTime.getFullYear() <= user.createdAt.toDate().getFullYear()
          }
          style={
            selectTime.getMonth() <= user.createdAt.toDate().getMonth() &&
            selectTime.getFullYear() <=
              user.createdAt.toDate().getFullYear() && {opacity: 0}
          }
          onPress={() => {
            const currentDate = new Date(selectTime);
            let currentMonth = currentDate.getMonth();
            let currentYear = currentDate.getFullYear();
            currentDate.setMonth(currentMonth - 1);
            if (currentMonth === 0) {
              currentDate.setFullYear(currentYear - 1);
            }
            setSelectTime(currentDate);
          }}>
          <ChevronLeftIcon color={AppColors.screenColor} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {selectTime.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </Text>
        <TouchableOpacity
          disabled={
            selectTime.getMonth() >= new Date().getMonth() &&
            selectTime.getFullYear() >= new Date().getFullYear()
          }
          style={
            selectTime.getMonth() >= new Date().getMonth() &&
            selectTime.getFullYear() >= new Date().getFullYear() && {
              opacity: 0,
            }
          }
          onPress={() => {
            const currentDate = new Date(selectTime);
            let currentMonth = currentDate.getMonth();
            let currentYear = currentDate.getFullYear();
            currentDate.setMonth(currentMonth + 1);
            if (currentMonth === 11) {
              currentDate.setFullYear(currentYear + 1);
            }
            setSelectTime(currentDate);
          }}>
          <ChevronRightIcon color={AppColors.screenColor} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: AppColors.whiteText,
          justifyContent: 'space-between',
          paddingBottom: 70,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}>
        {budgets && (
          <View style={styles.budgetCards}>
            {budgets.map(budget => (
              <BudgetCard key={budget.id} data={budget} />
            ))}
          </View>
        )}
        <View style={styles.buttonContainer}>
          <AppButton
            title="Create a budget"
            backgroundColor={AppColors.primaryColor}
            onPress={() => {
              navigation.navigate('CreateBudget' as never);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    paddingHorizontal: 16,
    marginTop: 40,
    marginBottom: 32,
  },
  headerTitle: {
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 29,
    color: AppColors.screenColor,
  },
  budgetCards: {
    gap: 16,
    padding: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});

export default BudgetScreen;
