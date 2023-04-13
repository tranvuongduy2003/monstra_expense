import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text} from 'react-native';
import {AppColors} from 'constants/AppColors';

interface IBudgetScreenProps {}

const BudgetScreen: React.FunctionComponent<IBudgetScreenProps> = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.screenColor}}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'flex-end',
        }}>
        <Text>Budget Screen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BudgetScreen;
