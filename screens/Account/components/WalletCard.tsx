import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {AppColors} from 'constants/AppColors';
import {useNavigation} from '@react-navigation/native';
import {Banks} from 'constants/Banks';
import {Wallets} from 'constants/Wallets';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import scale from 'constants/Responsive';
import AccountIcon from 'assets/svg/AccountIcon';

interface IWalletCardProps {
}


const WalletCard: React.FunctionComponent<
IWalletCardProps
> = props => {
  return (
    <TouchableOpacity onPress={() => {}}>
          <View style={styles.content}>
            <View style={styles.category}>
              <View style={styles.icons}>
                <AccountIcon></AccountIcon>
              </View>
              <Text style={styles.contentTitle}>Wallet</Text>
            </View>
            <Text style={styles.cash}>$400</Text>
          </View>
        </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    width: scale(303),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scale(14),
  },
  category: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    width: scale(50),
    height: scale(50),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: AppColors.lavender,
    padding: scale(10),
  },
  contentTitle: {
    fontSize: scale(18),
    marginLeft: scale(8),
    color: AppColors.textColor,
    fontFamily: 'Inter-SemiBold',
  },
  cash: {
    fontSize: scale(18),
    marginLeft: scale(8),
    color: AppColors.textColor,
    fontFamily: 'Inter-SemiBold',
  },
});

export default WalletCard;
