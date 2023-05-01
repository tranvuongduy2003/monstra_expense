import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {AppColors} from 'constants/AppColors';
import AppButton from 'components/AppButton';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'react-native-heroicons/outline';
import BudgetCard from './components/BudgetCard';
import {useNavigation} from '@react-navigation/native';

interface IBudgetScreenProps {}

const BudgetScreen: React.FunctionComponent<IBudgetScreenProps> = props => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.primaryColor}}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={styles.header}>
          <TouchableOpacity>
            <ChevronLeftIcon color={AppColors.screenColor} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>May</Text>
          <TouchableOpacity>
            <ChevronRightIcon color={AppColors.screenColor} />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={styles.budgetCards}>
            <BudgetCard />
          </View>
          <View style={styles.buttonContainer}>
            <AppButton
              title="Create a budget"
              backgroundColor={AppColors.primaryColor}
              onPress={() => {
                navigation.navigate('CreateBudget' as never);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  body: {
    flex: 1,
    backgroundColor: AppColors.whiteText,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    justifyContent: 'space-between',
    paddingBottom: 70,
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
