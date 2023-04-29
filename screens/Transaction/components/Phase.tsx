import {AppColors} from 'constants/AppColors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TransactionCard from './TransactionCard';

interface IPhaseProps {
  timeTitle: string;
  transactions: any;
}

const Phase: React.FunctionComponent<IPhaseProps> = ({
  timeTitle,
  transactions = [],
}) => {
  return (
    <View>
      <View style={styles.bars}>
        <Text style={styles.barsText}>{timeTitle}</Text>
      </View>
      <View style={styles.transactionContainer}>
        {transactions.map(transaction => (
          <TransactionCard
            key={transaction.id}
            icon={transaction.icon}
            title={transaction.title}
            desc={transaction.desc}
            price={transaction.price}
            time={transaction.time}
            iconBgColor={transaction.iconBgColor}
            negative={transaction.negative}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bars: {
    paddingHorizontal: 16,
    paddingVertical: 13,
  },
  barsText: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    color: AppColors.primaryTextColor,
  },
  transactionContainer: {},
});

export default Phase;
