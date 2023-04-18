import React, {ReactElement} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import CustomDropDown from 'components/CustomDropDown';
import {LanguageDATA} from './data/indexLanguage';
import ExportDataIcon from 'assets/svg/ExportDataIcon';

interface IExportScreenProps {
  title?: string;
  onPress?: () => void;
  children?: ReactElement;
}
const ExportScreen: React.FunctionComponent<IExportScreenProps> = ({
  title,
  onPress = () => {},
  children,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content1}>
        <CustomDropDown
          data={LanguageDATA}
          text="What data do your want to export?"></CustomDropDown>
      </View>
      <View style={styles.content2}>
        <CustomDropDown
          data={LanguageDATA}
          text="When date range?"></CustomDropDown>
      </View>
      <View style={styles.content3}>
        <CustomDropDown
          data={LanguageDATA}
          text="What format do you want to export?"></CustomDropDown>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <View style={styles.titleContainer}>
            <ExportDataIcon></ExportDataIcon>
            <Text style={styles.title}>Export</Text>
          </View>
        </TouchableOpacity>
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
  content1: {
    width: scale(343),
    height: 'auto',
    marginTop: scale(40),
    marginBottom: scale(24),
    backgroundColor: AppColors.white,
    padding: scale(24),
    zIndex: 999,
  },
  content2: {
    width: scale(343),
    height: 'auto',
    marginTop: scale(40),
    marginBottom: scale(24),
    backgroundColor: AppColors.white,
    padding: scale(24),
    zIndex: 990,
  },
  content3: {
    width: scale(343),
    height: 'auto',
    marginTop: scale(40),
    marginBottom: scale(24),
    backgroundColor: AppColors.white,
    padding: scale(24),
    zIndex: 980,
  },
  bottomContainer: {
    flex: 355,
    flexDirection: 'column-reverse',
    marginBottom: scale(50),
  },
  button: {
    width: scale(343),
    height: scale(56),
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: AppColors.primaryColor,
  },
  titleContainer: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: scale(16),
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: AppColors.white,
    marginLeft: scale(10),
  },
});

export default ExportScreen;
