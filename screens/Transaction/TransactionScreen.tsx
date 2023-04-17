import React from 'react';
import {AppColors} from 'constants/AppColors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text} from 'react-native';

interface ITransactionScreenProps {}

const TransactionScreen: React.FunctionComponent<
  ITransactionScreenProps
> = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}>
        <Text>Transaction</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionScreen;
