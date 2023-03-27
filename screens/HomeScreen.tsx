import React from 'react';
import {View, Text} from 'react-native';
import { StatusBar } from 'react-native/Libraries/Components/StatusBar/StatusBar';

interface IHomeScreenProps {}

const HomeScreen: React.FunctionComponent<IHomeScreenProps> = props => {
 
  return (
    <View className="flex items-center justify-center">
      <Text className="text-red-200 text-xl mx-">Open up App.js to start working on your app!</Text>
    </View>
  );
};

export default HomeScreen;
