import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'constants/AppColors';
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ExclamationCircleIcon} from 'react-native-heroicons/solid';

interface IBudgetCardProps {}

const BudgetCard: React.FunctionComponent<IBudgetCardProps> = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DetailBudget' as never)}
      style={styles.container}>
      <View style={styles.top}>
        <View style={styles.tag}>
          <View style={styles.dot} />
          <Text style={styles.tagTitle}>Shopping</Text>
        </View>
        <View>
          <ExclamationCircleIcon color={AppColors.red} />
        </View>
      </View>
      <View style={styles.main}>
        <Text style={styles.title}>Remaining $0</Text>
        <View style={styles.baseBar}>
          <View style={styles.progressBar} />
        </View>
        <Text style={styles.amount}>$1200 of $1000</Text>
      </View>
      <View>
        <Text style={styles.warningText}>You've exceed the limit!</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.screenColor,
    borderRadius: 16,
    padding: 16,
    gap: 8,
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
