import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View, Text} from 'react-native';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import CustomDropDown from 'components/CustomDropDown';
import {LanguageDATA} from './indexLanguage';

interface IExportScreenProps {}
const ExportScreen: React.FunctionComponent<IExportScreenProps> = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CustomDropDown data={LanguageDATA}></CustomDropDown>
      </View>
      <View style={styles.content}>
        <CustomDropDown data={LanguageDATA}></CustomDropDown>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.white,
  },
  content: {
    width: scale(343),
    height: 'auto',
    marginTop: scale(40),
    marginBottom: scale(24),
    backgroundColor: AppColors.lavender,
  },
});

export default ExportScreen;
