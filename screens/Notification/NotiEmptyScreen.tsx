import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';

interface INotiEmptyScreenProps {}

const NotiEmptyScreen: React.FunctionComponent<INotiEmptyScreenProps> = props => {
  return (
    <SafeAreaView style={styles.container}>
        <Text>There is no notification for now</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotiEmptyScreen;
