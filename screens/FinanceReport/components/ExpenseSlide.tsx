import {AppColors} from 'constants/AppColors';
import {expenseCategoryOptions} from 'constants/Category';
import {icons} from 'constants/CategoryIcon';
import {ITransaction} from 'interfaces/Transaction';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IExpenseSlideProps {
  data: ITransaction[];
}

const ExpenseSlide: React.FunctionComponent<IExpenseSlideProps> = ({data}) => {
  const expenseValue = {};
  expenseCategoryOptions.forEach(item => {
    expenseValue[item.value] = 0;
  });

  data.forEach(item => {
    expenseValue[item.category.value] += item.balance;
  });

  let max = 0;
  let item: any = {};
  for (const property in expenseValue) {
    if (expenseValue[property] >= max) {
      max = expenseValue[property];
      item = {[property]: expenseValue[property]};
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>This month</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>You Spend 💸</Text>
        <Text style={styles.contentPrice}>{`$${data
          ?.map(item => item.balance)
          ?.reduce((prev, cur) => prev + cur, 0)}`}</Text>
      </View>
      <View style={styles.biggestContainer}>
        <Text style={styles.biggestTitle}>
          and your biggest{'\n'}spending is from
        </Text>
        <View style={styles.tag}>
          <View
            style={[
              styles.tagIcon,
              {backgroundColor: icons.get(Object.keys(item)[0])?.bgColor},
            ]}>
            {icons.get(Object.keys(item)[0])?.child}
          </View>
          <Text style={styles.tagTitle}>{`${Object.keys(item)[0]}`}</Text>
        </View>
        <Text style={styles.biggestPrice}>{`$ ${
          item[Object.keys(item)[0]]
        }`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 63,
    paddingBottom: 50,
    justifyContent: 'space-between',
    backgroundColor: AppColors.red,
  },
  timeText: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 29,
    color: AppColors.white,
    opacity: 0.72,
    textAlign: 'center',
  },
  contentContainer: {
    gap: 24,
  },
  contentTitle: {
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 39,
    color: AppColors.white,
    textAlign: 'center',
  },
  contentPrice: {
    fontWeight: '700',
    fontSize: 64,
    lineHeight: 80,
    color: AppColors.white,
    textAlign: 'center',
  },
  tag: {
    padding: 16,
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: AppColors.borderColor,
    backgroundColor: AppColors.whiteText,
  },
  tagIcon: {
    padding: 7,
    borderRadius: 8,
    backgroundColor: AppColors.yellow100,
  },
  tagTitle: {
    color: AppColors.primaryTextColor,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    textTransform: 'capitalize',
  },
  biggestContainer: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: AppColors.white,
    borderRadius: 24,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  biggestTitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 29,
    color: AppColors.primaryTextColor,
    marginBottom: 14,
    textAlign: 'center',
  },
  biggestPrice: {
    marginTop: 8,
    fontSize: 36,
    fontWeight: '500',
    lineHeight: 44,
    color: AppColors.primaryTextColor,
    textAlign: 'center',
  },
});

export default ExpenseSlide;
