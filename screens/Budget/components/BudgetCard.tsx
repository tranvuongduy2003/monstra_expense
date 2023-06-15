import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'constants/AppColors';
import {icons} from 'constants/CategoryIcon';
import {IBudget} from 'interfaces/IBudget';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ExclamationCircleIcon} from 'react-native-heroicons/solid';

interface IBudgetCardProps {
  data: IBudget;
}

const BudgetCard: React.FunctionComponent<IBudgetCardProps> = ({data}) => {
  const navigation: any = useNavigation();

  const currentBalance = data.expenses
    .map(item => item.balance)
    .reduce((prev, cur) => prev + cur, 0);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DetailBudget', {
          data: data,
        })
      }
      style={styles.container}>
      <View style={styles.top}>
        <View style={styles.tag}>
          <View
            style={[
              styles.dot,
              {backgroundColor: icons.get(data.category.value)?.color},
            ]}
          />
          <Text style={styles.tagTitle}>{data.category.title}</Text>
        </View>
        {data.budget <= currentBalance && (
          <View>
            <ExclamationCircleIcon color={AppColors.red} />
          </View>
        )}
      </View>
      <View style={styles.main}>
        <Text style={styles.title}>{`Remaining $${
          currentBalance <= data.budget ? data.budget - currentBalance : 0
        }`}</Text>
        <View style={styles.baseBar}>
          <View
            style={[
              styles.progressBar,
              {
                backgroundColor: icons.get(data.category.value)?.color,
                width: `${
                  currentBalance <= data.budget
                    ? (currentBalance / data.budget) * 100
                    : 100
                }%`,
              },
            ]}
          />
        </View>
        <Text
          style={styles.amount}>{`$${currentBalance} of $${data.budget}`}</Text>
      </View>

      {data.budget <= currentBalance && (
        <View>
          <Text style={styles.warningText}>You've exceed the limit!</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.screenColor,
    borderRadius: 16,
    padding: 16,
    gap: 8,
    elevation: 2,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    padding: 8,
    paddingRight: 16,
    gap: 7,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: AppColors.borderColor,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 14,
    backgroundColor: AppColors.yellow,
  },
  tagTitle: {
    color: AppColors.primaryTextColor,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
  },
  main: {
    gap: 8,
  },
  title: {
    color: AppColors.primaryTextColor,
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 29,
  },
  baseBar: {
    height: 12,
    flex: 1,
    width: '100%',
    backgroundColor: AppColors.borderColor,
    borderRadius: 12,
    position: 'relative',
  },
  progressBar: {
    width: '50%',
    height: 12,
    backgroundColor: AppColors.yellow,
    borderRadius: 12,
  },
  amount: {
    color: AppColors.secondaryTextColor,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
  },
  warningText: {
    color: AppColors.red,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
  },
});

export default BudgetCard;
