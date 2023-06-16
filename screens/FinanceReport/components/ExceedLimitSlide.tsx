import {AppColors} from 'constants/AppColors';
import {icons} from 'constants/CategoryIcon';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IExceedLimitSlideProps {}

const ExceedLimitSlide: React.FunctionComponent<
  IExceedLimitSlideProps
> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.contentTitle}>
        2 of 12 Budget is{'\n'}exceeds the limit
      </Text>
      <View style={styles.tagContainer}>
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
        <View style={styles.tag}>
          <View
            style={[
              styles.tagIcon,
              {backgroundColor: icons.get('food')?.bgColor},
            ]}>
            {icons.get('food')?.child}
          </View>
          <Text style={styles.tagTitle}>Food</Text>
        </View>
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
