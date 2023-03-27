import React from 'react';
import {View, Text} from 'react-native';

interface IHomeScreenProps {}

const HomeScreen: React.FunctionComponent<IHomeScreenProps> = props => {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
