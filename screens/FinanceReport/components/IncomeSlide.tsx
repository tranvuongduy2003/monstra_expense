import {AppColors} from 'constants/AppColors';
import {icons} from 'constants/CategoryIcon';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IIncomeSlideProps {}

const IncomeSlide: React.FunctionComponent<IIncomeSlideProps> = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>This month</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.contentTitle}>You Earned 💰</Text>
        <Text style={styles.contentPrice}>$332</Text>
      </View>
      <View style={styles.biggestContainer}>
        <Text style={styles.biggestTitle}>
          your biggest{'\n'}Income is from
        </Text>
        <View style={styles.tag}>
          <View
            style={[
              styles.tagIcon,
              {backgroundColor: icons.get('shopping')?.bgColor},
            ]}>
            {icons.get('shopping')?.child}
          </View>
          <Text style={styles.tagTitle}>Shopping</Text>
        </View>
        <Text style={styles.biggestPrice}>$ 120</Text>
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
    backgroundColor: AppColors.primaryGreen,
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

export default IncomeSlide;
