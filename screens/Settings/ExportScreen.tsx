import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import ExportDataIcon from 'assets/svg/ExportDataIcon';
import Dropdown, {OptionType} from 'components/Dropdown';
import {useNavigation} from '@react-navigation/native';
import {ClickOutsideProvider} from 'providers/ClickOutSideProvider';

interface IExportScreenProps {
  title?: string;
  onPress?: () => void;
}

const dataOptions: OptionType[] = [
  {
    title: 'All',
    value: 'all',
  },
  {
    title: 'One',
    value: 'one',
  },
  {
    title: 'Two',
    value: 'two',
  },
];

const dateOptions: OptionType[] = [
  {
    title: 'Last 30 days',
    value: '30d',
  },
  {
    title: 'Last 7 days',
    value: '7d',
  },
  {
    title: 'Last 1 day',
    value: '1d',
  },
];

const formatOptions: OptionType[] = [
  {
    title: 'CSV',
    value: 'csv',
  },
  {
    title: 'Excel',
    value: 'excel',
  },
];

const ExportScreen: React.FunctionComponent<IExportScreenProps> = ({
  title,
  onPress = () => {},
}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.setupContainer}>
        <ClickOutsideProvider>
          <Text style={styles.text}>What data do your want to export?</Text>
          <Dropdown options={dataOptions} placeholder="All" zIndex={50} />
          <Text style={styles.text}>When date range?</Text>
          <Dropdown
            options={dateOptions}
            placeholder="Last 30 days"
            zIndex={40}
          />
          <Text style={styles.text}>What format do you want to export?</Text>
          <Dropdown options={formatOptions} placeholder="CSV" zIndex={30} />
        </ClickOutsideProvider>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ExportNoti' as never)}>
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
  setupContainer: {
    backgroundColor: AppColors.screenColor,
    paddingTop: scale(20),
    width: scale(343),
    zIndex: 60,
  },
  text: {
    fontSize: scale(16),
    marginTop: scale(24),
    marginBottom: scale(12),
    color: AppColors.textColor,
    fontWeight: '500',
  },
  bottomContainer: {
    flex: 355,
    flexDirection: 'column-reverse',
    marginBottom: scale(50),
    zIndex: 20,
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
