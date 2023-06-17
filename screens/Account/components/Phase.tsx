import {AppColors} from 'constants/AppColors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Card from './Card';

interface IPhaseProps {
  wallets: any;
}

const Phase: React.FunctionComponent<IPhaseProps> = ({wallets = []}) => {
  return (
    <View style={styles.walletContainer}>
      {wallets.map((wallet: any) => (
        <Card
          key={wallet.id}
          icon={wallet.icon}
          title={wallet.title}
          price={wallet.price}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  walletContainer: {},
});

export default Phase;
