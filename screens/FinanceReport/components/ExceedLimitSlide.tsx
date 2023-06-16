import {AppColors} from 'constants/AppColors';
import {icons} from 'constants/CategoryIcon';
import {IBudget} from 'interfaces/IBudget';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IExceedLimitSlideProps {
  data: IBudget[];
}

const ExceedLimitSlide: React.FunctionComponent<IExceedLimitSlideProps> = ({
  data,
}) => {
  const exceedLimitBudgets = data.filter(budget => {
    const currentBalance = budget.expenses
      .map(item => item.balance)
      .reduce((prev, cur) => prev + cur, 0);
    return budget.budget <= currentBalance;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.contentTitle}>
        {`${exceedLimitBudgets.length} of ${
          data.length
        } Budget is${'\n'}exceeds the limit`}
      </Text>
      <View style={styles.tagContainer}>
        {exceedLimitBudgets.map((item, index) => (
          <View key={index} style={styles.tag}>
            <View
              style={[
                styles.tagIcon,
                {backgroundColor: icons.get(item.category.value)?.bgColor},
              ]}>
              {icons.get(item.category.value)?.child}
            </View>
            <Text style={styles.tagTitle}>{item.category.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 23,
    paddingBottom: 50,
    justifyContent: 'center',
    gap: 27,
    backgroundColor: AppColors.primaryColor,
  },
  contentTitle: {
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 39,
    color: AppColors.white,
    textAlign: 'center',
  },
  tagContainer: {
    paddingHorizontal: 36,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 22,
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
  },
});

export default ExceedLimitSlide;
