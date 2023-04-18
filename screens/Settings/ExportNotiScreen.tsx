import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View, Text} from 'react-native';
import {AppColors} from 'constants/AppColors';

interface IExportNotiScreenProps {}
const ExporNotitScreen: React.FunctionComponent<IExportNotiScreenProps> = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}></View>
        <View style={styles.bottomContainer}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  topContainer: {
    flex: 446,
    backgroundColor: 'red',
  },
  bottomContainer: {
    flex: 332,
    backgroundColor: 'yellow',
  },
});

export default ExporNotitScreen;
