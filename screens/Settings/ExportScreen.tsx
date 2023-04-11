import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View, Text} from 'react-native';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import CustomDropDown from 'components/CustomDropDown';
import {LanguageDATA} from './indexLanguage';
import AppButton from 'components/AppButton';

interface IExportScreenProps {}
const ExportScreen: React.FunctionComponent<IExportScreenProps> = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <CustomDropDown
            data={LanguageDATA}
            text="What data do your want to export?"></CustomDropDown>
        </View>
        <View style={styles.content}>
          <CustomDropDown
            data={LanguageDATA}
            text="When date range?"></CustomDropDown>
        </View>
        <View style={styles.content}>
          <CustomDropDown
            data={LanguageDATA}
            text="What format do you want to export?"></CustomDropDown>
        </View>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Back To Home"
            backgroundColor={AppColors.primaryColor}
            onPress={() => {}}></AppButton>
        </View>
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
    padding: scale(24),
  },
  bottomContainer: {
    flex: 355,
    flexDirection: 'column-reverse',
    marginBottom: scale(50),
  },
  buttonContainer: {
    width: scale(343),
    height: scale(56),
    alignContent: 'center',
    verticalAlign: 'center',
  },
});

export default ExportScreen;
