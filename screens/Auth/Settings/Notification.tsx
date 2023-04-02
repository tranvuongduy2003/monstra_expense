import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColors} from 'constants/AppColors';
import scale from 'constants/Responsive';
import CustomSwitch from 'components/CustomSwitch';

interface INotificationScreenProps {}
const NotificationScreen: React.FunctionComponent<
  INotificationScreenProps
> = ({}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.notiContainer}>
        <View style={styles.boxContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Expense Alert</Text>
            <Text style={styles.content}>
              Get notification about you're expense
            </Text>
          </View>
          <CustomSwitch></CustomSwitch>
        </View>
        <View style={styles.boxContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Budget</Text>
            <Text style={styles.content}>
              Get notification when you're budget exceeding the limit
            </Text>
          </View>
          <CustomSwitch></CustomSwitch>
        </View>
        <View style={styles.boxContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Tips & Articles</Text>
            <Text style={styles.content}>
              Small & useful pieces of pratical financial advice
            </Text>
          </View>
          <CustomSwitch></CustomSwitch>
        </View>
      </View>
      <View style={styles.blankSpace}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.white,
  },
  notiContainer: {
    flex: 225,
    backgroundColor: AppColors.white,
  },
  boxContainer: {
    width: scale(375),
    height: scale(75),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColors.white,
    paddingLeft: 16,
    paddingRight: 16,
  },
  titleContainer: {
    width: scale(205),
    height: scale(55),
    flexDirection: 'column',
    backgroundColor: AppColors.white,
  },
  title: {
    fontSize: scale(16),
    fontFamily: 'Inter-Medium',
    color: AppColors.titleColor,
  },
  content: {
    fontSize: scale(13),
    fontFamily: 'Inter-Light',
    color: AppColors.secondaryTextColor,
  },
  blankSpace: {
    flex: 479,
  },
});

export default NotificationScreen;
