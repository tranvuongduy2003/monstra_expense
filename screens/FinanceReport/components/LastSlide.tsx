import {useNavigation} from '@react-navigation/native';
import AppButton from 'components/AppButton';
import {AppColors} from 'constants/AppColors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface ILastSlideProps {}

const LastSlide: React.FunctionComponent<ILastSlideProps> = props => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.quotes}>
          “Financial freedom is freedom from fear.”
        </Text>
        <Text style={styles.author}>-Robert Kiyosaki</Text>
      </View>
      <AppButton
        title="See the full detail"
        backgroundColor={AppColors.white}
        color={AppColors.primaryColor}
        onPress={() => navigation.navigate('FinancialReport' as never)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 23,
    paddingBottom: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: AppColors.primaryColor,
  },
  content: {
    marginTop: 138,
  },
  quotes: {
    fontWeight: '700',
    fontSize: 32,
    lineHeight: 39,
    color: AppColors.white,
    bottom: 14,
  },
  author: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 29,
    color: AppColors.white,
  },
});

export default LastSlide;
