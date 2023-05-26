import {useNavigation} from '@react-navigation/native';
import {AppColors} from 'constants/AppColors';
import React, {ReactElement} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ShoppingBagIcon} from 'react-native-heroicons/solid';

interface ITransactionCardProps {
  id: string;
  icon: ReactElement;
  title: string;
  price: number;
  desc: string;
  time: string;
  iconBgColor: string;
  type: string;
}

const TransactionCard: React.FunctionComponent<ITransactionCardProps> = ({
  id,
  icon,
  title,
  price,
  desc,
  time,
  iconBgColor,
  type,
}) => {
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('DetailTransaction', {transactionId: id})
      }>
      <View style={[styles.iconContainer, {backgroundColor: iconBgColor}]}>
        {icon}
      </View>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text
            style={[styles.titleContent, {color: AppColors.primaryTextColor}]}>
            {title}
          </Text>
          <Text
            style={[
              styles.titleContent,
              {
                color:
                  type === 'expense'
                    ? AppColors.red
                    : type === 'income'
                    ? AppColors.primaryGreen
                    : AppColors.primaryBlue,
              },
            ]}>
            {`${
              type === 'expense' ? '-' : type === 'income' ? '+' : ''
            }$${price}`}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.descContent}>{desc}</Text>
          <Text style={styles.descContent}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginHorizontal: 19,
    marginBottom: 8,
    borderRadius: 24,
    backgroundColor: AppColors.whiteText,
    gap: 8,
    flexDirection: 'row',
  },
  iconContainer: {
    padding: 15,
    borderRadius: 16,
  },
  cardContent: {
    justifyContent: 'space-between',
    flex: 1,
  },
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  titleContent: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
  },
  descContent: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
    color: AppColors.secondaryTextColor,
  },
});

export default TransactionCard;
