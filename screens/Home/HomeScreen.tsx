import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Text} from 'react-native';
import {AppColors} from 'constants/AppColors';

interface IHomeScreenProps {}

const HomeScreen: React.FunctionComponent<IHomeScreenProps> = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        style={{backgroundColor: AppColors.secondaryTextColor}}
        contentContainerStyle={{flexGrow: 1}}>
        <Text>Home Screen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
