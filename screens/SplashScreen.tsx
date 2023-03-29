import React from 'react';
import {View, Text} from 'react-native';
import {AppColors} from '../constants/AppColors';

interface ISplashScreenProps {}

const SplashScreen: React.FunctionComponent<ISplashScreenProps> = props => {
  return (
    <View
      style={{
        backgroundColor: AppColors.primaryColor,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
      <Text
        style={{
          color: '#EEEEEE',
          fontSize: 56,
          fontWeight: '700',
        }}>
        monstra
      </Text>
    </View>
  );
};

export default SplashScreen;
